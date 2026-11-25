import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";

/** Simple per-instance sliding window rate limit (5 requests per 10 minutes per IP) */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequests.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS) {
    ipRequests.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many enquiries submitted. Please wait a few minutes and try again.",
        },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please check the highlighted fields and try again.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Silently accept bot submissions caught by the honeypot without sending email
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true, mode: "filtered" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "hello@pixelarc.example";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Pixel Arc <onboarding@resend.dev>";

    if (!apiKey || apiKey.includes("xxxx")) {
      return NextResponse.json({
        ok: true,
        mode: "preview",
        message:
          "Validated in preview mode (configure RESEND_API_KEY in .env.local to dispatch emails).",
      });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `[Pixel Arc Enquiry] ${data.company} — ${data.service}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Discipline: ${data.service}`,
        `Indicative Budget: ${data.budget}`,
        "",
        "Objectives & Context:",
        data.message,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email delivery service rejected the request. Please email us directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, mode: "sent" });
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request payload." }, { status: 400 });
  }
}

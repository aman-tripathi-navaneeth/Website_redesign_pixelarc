import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid work email address.")
    .max(160, "Email address is too long."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company or organisation name.")
    .max(120, "Company name must be 120 characters or fewer."),
  service: z.enum(
    [
      "software-development",
      "ai-automation",
      "digital-marketing-growth",
      "branding-creative",
      "business-transformation",
      "advisory",
    ],
    { message: "Please select a primary area of focus." }
  ),
  budget: z.enum(["25k-50k", "50k-100k", "100k-250k", "250k-plus", "undisclosed"], {
    message: "Please select an indicative engagement range.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please share a brief overview of your objectives (at least 20 characters).")
    .max(2500, "Message must be 2,500 characters or fewer."),
  consent: z.boolean().refine((val) => val === true, {
    message: "Please confirm we may respond to your enquiry.",
  }),
  /** Hidden honeypot field — must remain empty */
  website: z.string().max(0),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

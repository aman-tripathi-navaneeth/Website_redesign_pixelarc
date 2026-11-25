"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/Magnetic";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

interface ContactFormProps {
  defaultService?: string;
}

const VALID_SERVICES = [
  "software-development",
  "ai-automation",
  "digital-marketing-growth",
  "branding-creative",
  "business-transformation",
  "advisory",
] as const;

type ServiceValue = (typeof VALID_SERVICES)[number];

function isValidService(value?: string): value is ServiceValue {
  return Boolean(value && (VALID_SERVICES as readonly string[]).includes(value));
}

export function ContactForm({ defaultService }: ContactFormProps) {
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: isValidService(defaultService) ? defaultService : "software-development",
      budget: "50k-100k",
      message: "",
      consent: false,
      website: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ContactFormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        toast.error(data.error || "Unable to send your enquiry. Please try again.");
        return;
      }

      toast.success(
        "Enquiry received. A principal consultant will respond within one business day."
      );
      setSubmitted(true);
      form.reset();
    } catch {
      toast.error("Network error while sending your enquiry. Please email us directly.");
    }
  }

  if (submitted) {
    return (
      <div className="border border-sand bg-ivory p-8 md:p-12">
        <div className="flex items-center gap-3">
          <CheckCircle2 strokeWidth={1.25} className="size-5 text-brass" />
          <span className="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase">
            Briefing Scheduled for Review
          </span>
        </div>

        <h2 className="mt-6 font-serif text-3xl font-light text-pine md:text-4xl">
          Thank you. Your project brief is with our partners.
        </h2>

        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-muted-ink">
          A principal from the relevant practice area will review your note and reply within one
          business day with proposed times for an initial discovery conversation.
        </p>

        <div className="mt-8">
          <Button type="button" variant="outline" onClick={() => setSubmitted(false)}>
            Submit Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-8 border border-sand bg-ivory p-6 sm:p-10"
      >
        {/* Honeypot anti-spam field */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...form.register("website")}
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="contact-name"
                    floatingLabel="Full Name *"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="contact-email"
                    type="email"
                    floatingLabel="Work Email *"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="contact-company"
                  floatingLabel="Company / Organisation *"
                  autoComplete="organization"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Discipline *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger aria-label="Primary Discipline">
                      <SelectValue placeholder="Select a discipline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="software-development">Software Development</SelectItem>
                    <SelectItem value="ai-automation">AI &amp; Automation</SelectItem>
                    <SelectItem value="digital-marketing-growth">
                      Digital Marketing &amp; Growth
                    </SelectItem>
                    <SelectItem value="branding-creative">Branding &amp; Creative</SelectItem>
                    <SelectItem value="business-transformation">Business Transformation</SelectItem>
                    <SelectItem value="advisory">Executive Advisory</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indicative Investment *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger aria-label="Indicative Investment">
                      <SelectValue placeholder="Select indicative range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="25k-50k">$25,000 – $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 – $100,000</SelectItem>
                    <SelectItem value="100k-250k">$100,000 – $250,000</SelectItem>
                    <SelectItem value="250k-plus">$250,000+</SelectItem>
                    <SelectItem value="undisclosed">Prefer to discuss</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  id="contact-message"
                  floatingLabel="Project Objectives & Context *"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0 pt-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer font-sans text-xs leading-relaxed tracking-normal text-muted-foreground normal-case">
                  I agree that Pixel Arc may store and use this information to respond to my
                  consultation enquiry.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sand pt-6">
          <span className="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
            Response within 1 business day
          </span>

          <Magnetic>
            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
              <span>{isSubmitting ? "Sending Enquiry..." : "Send Project Brief"}</span>
              <ArrowUpRight strokeWidth={1.25} className="size-4" />
            </Button>
          </Magnetic>
        </div>
      </form>
    </Form>
  );
}

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PROFILE } from "@/data/portfolio";

const INITIAL_FORM = { name: "", email: "", message: "" };

/**
 * Optional: set VITE_CONTACT_ENDPOINT in .env (e.g. a Formspree URL
 * https://formspree.io/f/xxxx) to receive messages directly in your inbox.
 * Without it, the form opens a pre-filled draft in the visitor's mail app.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export const useContactForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sending, setSending] = useState(false);

  const updateField = (field: keyof typeof INITIAL_FORM, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const sendByEndpoint = async (name: string, email: string, message: string) => {
    const response = await fetch(ENDPOINT as string, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (!response.ok) throw new Error("Request failed");
  };

  const sendByMailto = (name: string, email: string, message: string) => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      toast.error("Please complete every field.");
      return;
    }

    if (!ENDPOINT) {
      sendByMailto(name, email, message);
      toast.success("Your email is ready to send.");
      return;
    }

    setSending(true);
    try {
      await sendByEndpoint(name, email, message);
      toast.success("Message sent. Thank you!");
      setForm(INITIAL_FORM);
    } catch {
      toast.error("Could not send the message. Opening your mail app instead.");
      sendByMailto(name, email, message);
    } finally {
      setSending(false);
    }
  };

  return { form, sending, updateField, handleSubmit };
};

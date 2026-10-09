import { useState, type FormEvent } from "react";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY; // Next.js: process.env.NEXT_PUBLIC_WEB3FORMS_KEY

export const useContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const updateField = (field: "name" | "email" | "message", value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      alert("Message sent!"); // replace with your toast
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Something went wrong. Please try again or email me directly."); // replace with your toast
    } finally {
      setSending(false);
    }
  };

  return { form, sending, updateField, handleSubmit };
};
import { Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactForm } from "@/hooks/useContactForm";
import { PROFILE, SOCIAL_LINKS } from "@/data/portfolio";
import { Reveal } from "./motion/Reveal";

const MESSAGE_MAX_LENGTH = 1000;

const ContactSection = () => {
  const { form, sending, updateField, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="py-24">
      <div className="container grid gap-12 px-4 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal direction="left">
          <p className="section-kicker">06 / Contact</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Have an opportunity or an idea?</h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-muted-foreground">
            Tell me what you’re working on. Send me a message and I’ll get back to you soon.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <a className="flex items-center gap-3 hover:text-primary" href={`mailto:${PROFILE.email}`}><Mail /> {PROFILE.email}</a>
            <a className="flex items-center gap-3 hover:text-primary" href={PROFILE.phoneHref}><Phone /> {PROFILE.phone}</a>
            <span className="flex items-center gap-3"><MapPin /> {PROFILE.address}</span>
          </div>

          <div className="mt-8 flex gap-2">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <Button key={label} size="icon" variant="outline" asChild>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon /></a>
              </Button>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.15}>
        <form onSubmit={handleSubmit} className="space-y-5 border border-border bg-card p-6 shadow-md sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold">
              Name
              <Input required autoComplete="name" maxLength={100} placeholder="Your name" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
            </label>
            <label className="space-y-2 text-sm font-semibold">
              Email
              <Input required type="email" autoComplete="email" maxLength={255} placeholder="you@example.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
            </label>
          </div>

          <label className="block space-y-2 text-sm font-semibold">
            Message
            <Textarea required rows={6} maxLength={MESSAGE_MAX_LENGTH} placeholder="Tell me about your opportunity or project..." value={form.message} onChange={(e) => updateField("message", e.target.value)} />
            <span className="block text-right text-xs font-normal text-muted-foreground">
              {form.message.length}/{MESSAGE_MAX_LENGTH}
            </span>
          </label>

          <Button type="submit" size="lg" className="w-full" disabled={sending}>
            {sending ? "Sending..." : <>Send message <Send /></>}
          </Button>
          <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-primary" /> Your message goes straight to Samar’s inbox (or opens your mail app).
          </p>
        </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;

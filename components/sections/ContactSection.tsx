import { ArrowRight, Mail, MessageSquare, PhoneCall } from "lucide-react";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { Reveal } from "@/components/layout/Reveal";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { Card, CardContent } from "@/components/ui/Card";

export function ContactSection() {
  const contactCards = [
    {
      title: "Chat with the team",
      body: "Launch internal support, service desk, or collaboration entry points.",
      icon: MessageSquare,
    },
    {
      title: "Send us an email",
      body: "Useful for formal requests, business ownership queries, and escalation paths.",
      icon: Mail,
    },
    {
      title: "Book a working session",
      body: "For discovery, planning, and coordination with the right Division leads.",
      icon: PhoneCall,
    },
  ];

  return (
    <section
      id="section-7"
      className="relative min-h-screen bg-[radial-gradient(circle_at_bottom,rgba(0,180,216,0.14),transparent_35%),linear-gradient(180deg,var(--navy)_0%,#00111b_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="07" />

      <div className="ml-[8vw] grid min-h-screen max-w-[66vw] xl:max-w-[60vw] 2xl:max-w-[66vw] gap-10 px-6 py-24 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-16 xl:px-10 2xl:px-16">
        <Reveal>
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
            Reach out
          </div>
          <h2 className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl">
            Engage the department building the bank&apos;s next capabilities.
          </h2>
          <p className="mt-6 text-base leading-8 text-(--light)">
            This is your channel to GDTD's fast routing channels with confidence
            that the right people will pick up the work.
          </p>
          <div className="mt-8 inline-flex items-center rounded-full border border-(--c-accent)/18 bg-(--c-accent)/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-accent)">
            Typically replies within 24h
          </div>

          <div className="mt-10 rounded-4xl border border-(--border) bg-[rgba(255,255,255,0.03)] p-6 backdrop-blur-xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
              Engagement model
            </div>
            <p className="mt-4 text-base leading-8 text-(--light)">
              Whether the request is platform-related, service-focused, architectural,
              or exploratory, the site now presents the Division as a responsive command layer
              rather than a passive contact page.
            </p>
          </div>
        </Reveal>

        <Reveal className="grid gap-4">
          {contactCards.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="rounded-4xl border border-(--border) bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_18px_70px_rgba(1,17,27,0.3)] backdrop-blur-xl"
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-2xl border border-(--border) bg-[rgba(255,255,255,0.04)] p-3 text-(--c-primary)">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-sm leading-7 text-(--light)">
                      {item.body}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-(--dim)" />
                </CardContent>
              </Card>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

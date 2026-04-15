"use client";

import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Reveal } from "@/components/layout/Reveal";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { OrgBubble } from "@/components/org/OrgBubble";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { gdtdStructure } from "@/data/gdtd-structure";
import { orgOverview } from "@/data/org-overview";

/* ─── Tooltip portal ──────────────────────────────────────────────────────── */
function NodeTooltip({ message, rect }: { message: string; rect: DOMRect }) {
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: rect.top + rect.height / 2,
        left: rect.right + 14,
        transform: "translateY(-50%)",
        zIndex: 9999,
        maxWidth: 280,
      }}
      className="pointer-events-none rounded-2xl border border-(--c-primary)/20 bg-[rgba(1,17,27,0.92)] px-4 py-3 shadow-[0_16px_40px_rgba(1,17,27,0.6)] backdrop-blur-xl"
    >
      <p className="text-justify text-xs leading-5 text-(--light)">{message}</p>
    </div>,
    document.body
  );
}

/* ─── GM node ─────────────────────────────────────────────────────────────── */
function GmNode({ leader }: { leader: typeof gdtdStructure.leader }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const hasMsg = !!leader.message;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 22 }}
        className="flex flex-col items-center text-center"
        onMouseEnter={() => { if (hasMsg && ref.current) setRect(ref.current.getBoundingClientRect()); }}
        onMouseLeave={() => setRect(null)}
      >
        <div className="relative">
          <OrgBubble label="GM" size="lg" image={leader.image} />
          {hasMsg && (
            <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--navy)] bg-(--c-primary)" />
          )}
        </div>
        <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
          {leader.role}
        </div>
        <div className="mt-1 text-xl font-semibold text-white">{leader.name}</div>
        <div className="mt-1 text-sm text-(--dim)">Group Digital Technology Division</div>
      </motion.div>
      {rect && hasMsg && <NodeTooltip message={leader.message!} rect={rect} />}
    </>
  );
}

/* ─── Senior manager card ─────────────────────────────────────────────────── */
function SmCard({
  name,
  image,
  delay,
}: {
  name: string;
  image?: string;
  delay: number;
}) {
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-(--border) bg-[rgba(11,29,46,0.72)] p-5 shadow-[0_12px_40px_rgba(1,17,27,0.35)] backdrop-blur-xl"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-[var(--teal)] to-[var(--blue)]" />
      <div className="flex flex-col items-center text-center gap-3">
        <OrgBubble
          label={initials}
          gradient="from-[var(--teal)] to-[var(--blue)]"
          image={image}
          size="md"
        />
        <div>
          <div className="text-[9px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/70">
            Senior Manager
          </div>
          <div className="mt-1 text-sm font-semibold text-white">{name}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Manager card ────────────────────────────────────────────────────────── */
function ManagerCard({
  name,
  role,
  image,
  message,
  delay,
}: {
  name: string;
  role?: string;
  image?: string;
  message?: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  const hasMsg = !!message;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 14, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => { if (hasMsg && ref.current) setRect(ref.current.getBoundingClientRect()); }}
        onMouseLeave={() => setRect(null)}
        className="relative flex items-center gap-3 rounded-2xl border border-(--border) bg-[rgba(11,29,46,0.5)] p-3 transition-colors hover:border-(--c-primary)/25 hover:bg-[rgba(11,29,46,0.72)]"
      >
        <OrgBubble
          label={initials}
          gradient="from-[var(--blue)] to-[var(--purple)]"
          image={image}
          size="sm"
        />
        <div className="min-w-0">
          <div className="text-[9px] font-medium uppercase tracking-[0.22em] text-(--dim)">{role ?? "Manager"}</div>
          <div className="mt-0.5 truncate text-xs font-semibold text-white">{name}</div>
        </div>
        {hasMsg && (
          <div className="ml-auto shrink-0 h-1.5 w-1.5 rounded-full bg-(--c-primary)/60" />
        )}
      </motion.div>
      {rect && hasMsg && <NodeTooltip message={message!} rect={rect} />}
    </>
  );
}

/* ─── Animated vertical drop line ────────────────────────────────────────── */
function DropLine({ delay, height = "h-10" }: { delay: number; height?: string }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
      style={{ originY: 0 }}
      className={`${height} w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.7),rgba(0,180,216,0.2))]`}
    />
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export function StructureSection() {
  // Deduplicate SMs across teams, collecting all their managers
  const smList = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        image?: string;
        managers: Array<{ name: string; role?: string; image?: string; message?: string }>;
      }
    >();

    gdtdStructure.teams.forEach((team) => {
      const smName = team.seniorManager.name;
      if (!map.has(smName)) {
        map.set(smName, { name: smName, image: team.seniorManager.image, managers: [] });
      }
      const sm = map.get(smName)!;
      team.managers.forEach((mgr) => {
        if (!sm.managers.find((m) => m.name === mgr.name)) {
          sm.managers.push({ name: mgr.name, role: mgr.role, image: mgr.image, message: mgr.message });
        }
      });
    });

    return Array.from(map.values());
  }, []);

  return (
    <section
      id="section-4"
      className="relative min-h-[200vh] border-b border-(--border) bg-[radial-gradient(circle_at_50%_8%,rgba(0,180,216,0.12),transparent_16%),linear-gradient(180deg,var(--navy)_0%,var(--surface)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="04" />

      <div className="ml-[8vw] max-w-[66vw] px-6 py-24 md:px-10 lg:px-16">

        {/* Section header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-(--c-primary)/70">
            Our structure
          </div>
          <h2 className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.04em] md:text-5xl">
            Structured to deliver across the wider IT organisation and within GDTD itself.
          </h2>
          <p className="mt-5 text-base leading-8 text-(--light)">
            This view shows first where GDTD sits in Republic&apos;s wider technology
            structure, then how leadership and reporting lines flow within the division itself.
          </p>
        </Reveal>

        {/* ── Layer 1: Org placement ─────────────────────────────────────── */}
        <Reveal className="mt-16">
          <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
              Organisational placement
            </div>

            <div className="mt-8 flex flex-col items-center">

              {/* ── CIDTO — prominent top node ──────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="relative w-full overflow-hidden rounded-3xl border border-white/20 bg-[rgba(11,29,46,0.95)] px-10 py-6 text-center shadow-[0_20px_60px_rgba(1,17,27,0.5)]"
              >
                {/* Subtle inner glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
                <div className="relative">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                    {orgOverview.top.title}
                  </span>
                  <div className="mt-2 text-4xl font-black tracking-[-0.02em] text-white">
                    {orgOverview.top.code}
                  </div>
                </div>
              </motion.div>

              {/* Drop from CIDTO to horizontal bar */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
                style={{ originY: 0 }}
                className="h-10 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.15))]"
              />

              {/* ── Division row ─────────────────────────────────────────── */}
              <div className="relative w-full">
                {/* Horizontal connector spanning all three columns */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.42, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                  className="absolute top-0 left-[16.67%] right-[16.67%] h-px bg-[rgba(255,255,255,0.18)]"
                />

              <div className="flex w-full items-start">

                {/* GTSD */}
                <div className="flex flex-1 flex-col items-center">
                  {/* vertical drop from horizontal bar */}
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.62, ease: "easeOut" }}
                    style={{ originY: 0 }}
                    className="h-10 w-px bg-[rgba(255,255,255,0.18)]"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: 0.72 }}
                    className="w-full rounded-2xl border border-(--border) bg-[rgba(11,29,46,0.6)] px-6 py-5 text-center"
                  >
                    <span className="text-[10px] uppercase tracking-[0.22em] text-(--dim)">Division</span>
                    <div className="mt-1.5 text-2xl font-bold text-white">{orgOverview.divisions[0].code}</div>
                    <div className="mt-1 text-[10px] leading-4 text-(--dim)">{orgOverview.divisions[0].title}</div>
                  </motion.div>
                </div>

                {/* GDTD */}
                <div className="flex flex-1 flex-col items-center">
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.54, ease: "easeOut" }}
                    style={{ originY: 0 }}
                    className="h-10 w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.8),rgba(0,180,216,0.4))]"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: 0.58 }}
                    className="w-full px-4"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 18px 2px rgba(0,180,216,0.3)",
                          "0 0 48px 10px rgba(0,180,216,0.75)",
                          "0 0 18px 2px rgba(0,180,216,0.3)",
                        ],
                        borderColor: [
                          "rgba(0,180,216,0.5)",
                          "rgba(0,180,216,1)",
                          "rgba(0,180,216,0.5)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative rounded-2xl border bg-[var(--navy)] px-6 py-5 text-center"
                    >
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[var(--blue-lt)]"
                        animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.12, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span className="relative text-[10px] uppercase tracking-[0.22em] text-(--c-primary)">
                        That&apos;s us
                      </span>
                      <div className="relative mt-1.5 text-2xl font-bold text-(--c-primary)">
                        {orgOverview.divisions[1].code}
                      </div>
                      <div className="relative mt-1 text-[10px] leading-4 text-(--c-primary)/60">
                        {orgOverview.divisions[1].title}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* DGMU */}
                <div className="flex flex-1 flex-col items-center">
                  {/* vertical drop from horizontal bar */}
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.62, ease: "easeOut" }}
                    style={{ originY: 0 }}
                    className="h-10 w-px bg-[rgba(255,255,255,0.18)]"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: 0.82 }}
                    className="w-full rounded-2xl border border-(--border) bg-[rgba(11,29,46,0.6)] px-6 py-5 text-center"
                  >
                    <span className="text-[10px] uppercase tracking-[0.22em] text-(--dim)">Division</span>
                    <div className="mt-1.5 text-2xl font-bold text-white">{orgOverview.divisions[2].code}</div>
                    <div className="mt-1 text-[10px] leading-4 text-(--dim)">{orgOverview.divisions[2].title}</div>
                  </motion.div>
                </div>

              </div>
              </div>{/* end relative wrapper */}
            </div>
          </div>
        </Reveal>

        {/* ── Layer 2: Reporting tree ────────────────────────────────────── */}
        <Reveal className="mt-10">
          <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
              GDTD reporting structure
            </div>

            <div className="mt-8">

              {/* ── Level 0: GM ───────────────────────────────────────── */}
              <div className="flex flex-col items-center">
                <GmNode leader={gdtdStructure.leader} />

                {/* Drop to SM row */}
                <div className="mt-6 flex justify-center">
                  <DropLine delay={0.1} height="h-12" />
                </div>
              </div>

              {/* ── Level 1: Senior Managers ──────────────────────────── */}
              <div className="flex items-start">
                {smList.map((sm, i) => {
                  const isFirst = i === 0;
                  const isLast = i === smList.length - 1;

                  return (
                    <div key={sm.name} className="flex flex-1 flex-col items-center">
                      {/* Arch connector — first child gets top+right border, last gets top+left */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.18, duration: 0.3 }}
                        className={`h-8 w-full ${
                          isFirst && isLast
                            ? "" // only child — no arch needed
                            : isFirst
                            ? "border-r border-t border-[rgba(0,180,216,0.28)]"
                            : isLast
                            ? "border-l border-t border-[rgba(0,180,216,0.28)]"
                            : "border-t border-[rgba(0,180,216,0.28)]"
                        }`}
                      />

                      {/* SM card */}
                      <div className="w-full px-3">
                        <SmCard name={sm.name} image={sm.image} delay={0.26 + i * 0.08} />
                      </div>

                      {/* Drop to manager row */}
                      <div className="mt-0 flex flex-col items-center">
                        <DropLine delay={0.4 + i * 0.08} height="h-8" />
                      </div>

                      {/* ── Level 2: Managers ─────────────────────────── */}
                      <div className="w-full px-3 grid grid-cols-2 gap-2">
                        {sm.managers.map((mgr, j) => (
                          <ManagerCard
                            key={mgr.name}
                            name={mgr.name}
                            role={mgr.role}
                            image={mgr.image}
                            message={mgr.message}
                            delay={0.5 + i * 0.08 + j * 0.06}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

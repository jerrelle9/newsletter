
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { OrgBubble } from "@/components/org/OrgBubble";
import { OrgBox } from "@/components/org/OrgBox";
import { GalaxyBackground } from "@/components/layout/GalaxyBackground";
import { gdtdStructure } from "@/data/gdtd-structure";
import { orgOverview } from "@/data/org-overview";

/* ─── Shared portal tooltip ───────────────────────────────────────────────── */
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

/* ─── Command chain node ──────────────────────────────────────────────────── */
function ChainNode({
  name,
  role,
  image,
  initials,
  gradient,
  tag,
  delay,
  message,
}: {
  name: string;
  role?: string;
  image?: string;
  initials: string;
  gradient: string;
  tag?: string;
  delay: number;
  message?: string;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const hasMessage = !!message;

  return (
    <>
      <motion.div
        ref={nodeRef}
        initial={{ opacity: 0, scale: 0.65, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.5, type: "spring", stiffness: 220, damping: 20 }}
        className="flex flex-col items-center text-center"
        onMouseEnter={() => { if (hasMessage && nodeRef.current) setRect(nodeRef.current.getBoundingClientRect()); }}
        onMouseLeave={() => setRect(null)}
      >
        {/* Pulse ring */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0.6, scale: 0.85 }}
            animate={{ opacity: 0, scale: 1.7 }}
            transition={{ delay: delay + 0.05, duration: 0.9, ease: "easeOut" }}
            className={`absolute inset-0 rounded-full bg-linear-to-br ${gradient}`}
          />
          <OrgBubble label={initials} gradient={gradient} image={image} size="lg" />
          {/* Dot indicator */}
          {hasMessage && (
            <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--navy)] bg-(--c-primary)" />
          )}
        </div>

        {/* Role tag */}
        {tag && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.18, duration: 0.28 }}
            className="mt-3 rounded-full border border-(--border) bg-[rgba(11,29,46,0.7)] px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-(--dim)"
          >
            {tag}
          </motion.div>
        )}

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.24, duration: 0.28 }}
          className="mt-1.5 text-[13px] font-semibold leading-tight text-white"
        >
          {name}
        </motion.div>

        {/* Role text */}
        {role && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.32, duration: 0.28 }}
            className="mt-1 max-w-[130px] text-[10px] leading-[1.4] text-(--light)"
          >
            {role}
          </motion.div>
        )}
      </motion.div>

      {rect && hasMessage && <NodeTooltip message={message!} rect={rect} />}
    </>
  );
}



/* ─── Report card with side tooltip ──────────────────────────────────────── */
type Report = { name: string; role: string; image?: string; message?: string };

function ReportCard({
  report,
  index,
  gradient,
}: {
  report: Report;
  index: number;
  gradient: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const hasMessage = !!report.message;

  const initials = report.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 3);

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 1.14 + index * 0.06,
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseEnter={() => { if (hasMessage && cardRef.current) setRect(cardRef.current.getBoundingClientRect()); }}
        onMouseLeave={() => setRect(null)}
        className="rounded-3xl border border-(--border) bg-[rgba(11,29,46,0.56)] p-4 transition-colors duration-200 hover:border-(--c-primary)/25 hover:bg-[rgba(11,29,46,0.72)]"
      >
        <div className="flex items-center gap-3">
          <OrgBubble label={initials} gradient={gradient} image={report.image} size="md" />
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.26em] text-(--dim)">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mt-0.5 text-sm font-semibold text-white">{report.name}</div>
            <div className="mt-0.5 text-xs leading-5 text-(--light)">{report.role}</div>
          </div>
          {hasMessage && (
            <div className="ml-auto shrink-0 h-1.5 w-1.5 rounded-full bg-(--c-primary)/60" />
          )}
        </div>
      </motion.div>

      {rect && hasMessage && <NodeTooltip message={report.message!} rect={rect} />}
    </>
  );
}

/* ─── GM node ────────────────────────────────────────────────────────────── */
function GmNode({ leader }: { leader: typeof gdtdStructure.leader }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const hasMessage = !!leader.message;

  return (
    <>
      <div
        ref={nodeRef}
        className="flex flex-col items-center text-center"
        onMouseEnter={() => { if (hasMessage && nodeRef.current) setRect(nodeRef.current.getBoundingClientRect()); }}
        onMouseLeave={() => setRect(null)}
      >
        <div className="relative">
          <OrgBubble label="GM" size="lg" image={leader.image} />
          {hasMessage && (
            <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--navy)] bg-(--c-primary)" />
          )}
        </div>
        <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
          {leader.role}
        </div>
        <div className="mt-1 text-xl font-semibold text-white">{leader.name}</div>
        <div className="mt-1 text-sm text-(--dim)">Group Digital Technology Division</div>
        <div className="mt-2 max-w-2xl text-sm leading-7 text-(--light)">
          Select a team below to see its senior manager, manager, and direct reporting line.
        </div>
      </div>

      {rect && hasMessage && <NodeTooltip message={leader.message!} rect={rect} />}
    </>
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export function StructureSection() {
  const descriptors = ["Platforms", "Journeys", "Products"];

  const reportingTeams = gdtdStructure.teams;
  const [activeTeamName, setActiveTeamName] = useState(reportingTeams[0]?.name ?? "");

  const activeTeam =
    reportingTeams.find((team) => team.name === activeTeamName) ?? reportingTeams[0];

  return (
    <section
      id="section-4"
      className="relative min-h-[200vh] border-b border-(--border) bg-[radial-gradient(circle_at_50%_8%,rgba(0,180,216,0.12),transparent_16%),linear-gradient(180deg,var(--navy)_0%,var(--surface)_100%)]"
    >
      <GalaxyBackground />
      <SectionNumber number="04" />

      <div className="ml-[8vw] max-w-[66vw] px-6 py-24 md:px-10 lg:px-16">
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

        {/* Layer 1: Org placement */}
        <Reveal className="mt-16">
          <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
              Organisational placement
            </div>
            <div className="mt-8 flex flex-col items-center">
              <OrgBox code={orgOverview.top.code} title={orgOverview.top.title} active />
              <div className="h-14 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0.2))]" />
              <div className="grid gap-8 md:grid-cols-3">
                {orgOverview.divisions.map((division) => (
                  <OrgBox
                    key={division.code}
                    code={division.code}
                    title={division.title}
                    active={division.highlight}
                  />
                ))}
              </div>
              <div className="mt-8 rounded-full border border-(--c-primary)/20 bg-(--c-primary)/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
                GDTD is the in-scope division for this site
              </div>
            </div>
          </div>
        </Reveal>

        {/* Layer 2: Internal reporting structure */}
        <Reveal className="mt-10">
          <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/80">
              GDTD reporting structure
            </div>

            {/* GM */}
            <div className="mt-8 mx-auto max-w-5xl">
              <GmNode leader={gdtdStructure.leader} />
              <div className="mt-8 flex justify-center">
                <div className="h-16 w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.85),rgba(0,180,216,0.2))]" />
              </div>

              {/* Team selector */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reportingTeams.map((team, index) => {
                  const isActive = team.name === activeTeam?.name;
                  const isLoneInRow =
                    index === reportingTeams.length - 1 &&
                    reportingTeams.length % 3 === 1;
                  return (
                    <button
                      key={team.name}
                      type="button"
                      onClick={() => setActiveTeamName(team.name)}
                      className={`relative overflow-hidden rounded-4xl border p-5 text-left transition duration-200 ${
                        isLoneInRow ? "lg:col-start-2" : ""
                      } ${
                        isActive
                          ? "border-(--c-primary)/30 bg-[rgba(255,255,255,0.06)] shadow-[0_18px_40px_rgba(0,180,216,0.12)]"
                          : "border-(--border) bg-[rgba(255,255,255,0.03)] hover:border-(--c-primary)/18 hover:bg-[rgba(255,255,255,0.05)]"
                      }`}
                    >
                      {/* Active glow bar */}
                      {isActive && (
                        <motion.div
                          layoutId="team-active-bar"
                          className={`absolute inset-x-0 top-0 h-[2px] bg-linear-to-r ${team.color}`}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <OrgBubble label={team.initials} gradient={team.color} />
                          <div>
                            <div className="font-semibold text-white">{team.name}</div>
                            <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--dim)">
                              {/* {descriptors[index]} */}
                            </div>
                          </div>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 shrink-0 text-(--c-primary) transition-transform ${
                            isActive ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      </div>
                      {team.message && (
                        <div className="mt-4 text-sm leading-7 text-(--light)">
                          {team.message}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ── Expanded panel ─────────────────────────────────────────── */}
              <AnimatePresence mode="wait">
                {activeTeam && (
                  <motion.div
                    key={activeTeam.name}
                    initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)", scale: 0.98 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 overflow-hidden rounded-4xl border border-(--c-primary)/20 bg-[rgba(11,29,46,0.62)] shadow-[0_30px_80px_rgba(1,17,27,0.5)] backdrop-blur-xl"
                  >
                    {/* Colour gradient top bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0 }}
                      className={`h-[3px] w-full bg-linear-to-r ${activeTeam.color}`}
                    />

                    <div className="p-6 md:p-8">
                      {/* Header row */}
                      <motion.div
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12, duration: 0.32, ease: "easeOut" }}
                        className="flex flex-wrap items-start justify-between gap-3"
                      >
                        <div>
                          <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-(--c-primary)/70">
                            Command chain
                          </div>
                          <h3 className="mt-1.5 text-2xl font-bold tracking-[-0.02em] text-white">
                            {activeTeam.name}
                          </h3>
                        </div>
                        {/* <div className="rounded-full border border-(--border) bg-[rgba(11,29,46,0.7)] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.26em] text-(--light)">
                          {activeTeam.managers.length} manager{activeTeam.managers.length === 1 ? "" : "s"}
                        </div> */}
                      </motion.div>

                      {/* ── Command chain ────────────────────────────────────── */}
                      <div className="mt-8 flex flex-col items-center">
                        {/* Drop line: header → Senior Manager */}
                        <motion.div
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ delay: 0.12, duration: 0.4, ease: "easeOut" }}
                          style={{ originY: 0 }}
                          className="flex flex-col items-center gap-0"
                        >
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ originX: 0.5 }}
                            className="flex items-center gap-3"
                          >
                            <div className="h-px w-16 bg-[linear-gradient(90deg,transparent,rgba(0,180,216,0.4))]" />
                            <div className="rounded-full border border-(--c-primary)/20 bg-(--c-primary)/10 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.3em] text-(--c-primary)/80">
                              Senior Manager
                            </div>
                            <div className="h-px w-16 bg-[linear-gradient(90deg,rgba(0,180,216,0.4),transparent)]" />
                          </motion.div>
                          <div className="h-6 w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.25),transparent)]" />
                        </motion.div>

                        {/* Senior manager node */}
                        <ChainNode
                          name={activeTeam.seniorManager.name}
                          role={activeTeam.seniorManager.role}
                          image={activeTeam.seniorManager.image}
                          initials={activeTeam.seniorManager.name
                            .split(" ")
                            .map((p) => p[0])
                            .join("")
                            .slice(0, 2)}
                          gradient={activeTeam.color}
                          delay={0.18}
                          message={activeTeam.seniorManager.message}
                        />

                        {/* Drop line: SM → Manager */}
                        <motion.div
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ delay: 0.38, duration: 0.4, ease: "easeOut" }}
                          style={{ originY: 0 }}
                          className="mt-6 flex flex-col items-center gap-0"
                        >
                          <div className="h-10 w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.7),rgba(0,180,216,0.25))]" />
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.46, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ originX: 0.5 }}
                            className="flex items-center gap-3"
                          >
                            <div className="h-px w-16 bg-[linear-gradient(90deg,transparent,rgba(0,180,216,0.4))]" />
                            <div className="rounded-full border border-(--c-primary)/20 bg-(--c-primary)/10 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.3em] text-(--c-primary)/80">
                              {activeTeam.managers.length === 1 ? "Manager" : "Managers"}
                            </div>
                            <div className="h-px w-16 bg-[linear-gradient(90deg,rgba(0,180,216,0.4),transparent)]" />
                          </motion.div>
                          <div className="h-6 w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.25),transparent)]" />
                        </motion.div>

                        {/* Manager(s) — max 3 per row, single item centred */}
                        <div className={`grid gap-6 ${
                          activeTeam.managers.length === 1
                            ? "grid-cols-1 place-items-center"
                            : activeTeam.managers.length === 2
                            ? "grid-cols-2"
                            : "grid-cols-3"
                        }`}>
                          {activeTeam.managers.map((mgr, i) => (
                            <ChainNode
                              key={mgr.name}
                              name={mgr.name}
                              // role={"role" in mgr && mgr.role !== "Manager" ? mgr.role : undefined}
                              image={mgr.image}
                              initials={mgr.name
                                .split(" ")
                                .map((p) => p[0])
                                .join("")
                                .slice(0, 2)}
                              gradient={activeTeam.color}
                              tag={"role" in mgr && mgr.role !== "Manager" ? mgr.role : undefined}
                              delay={0.5 + i * 0.08}
                              message={"message" in mgr ? mgr.message : undefined}
                            />
                          ))}
                        </div>
                      </div>

                      {/* ── Drop line to reports ──────────────────────────── */}
                      {activeTeam.reports.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
                          style={{ originY: 0 }}
                          className="mt-6 flex flex-col items-center gap-0"
                        >
                          <div className="h-10 w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.7),rgba(0,180,216,0.25))]" />
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 1.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ originX: 0.5 }}
                            className="flex items-center gap-3"
                          >
                            <div className="h-px w-16 bg-[linear-gradient(90deg,transparent,rgba(0,180,216,0.4))]" />
                            <div className="rounded-full border border-(--c-primary)/20 bg-(--c-primary)/10 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.3em] text-(--c-primary)/80">
                              Team
                            </div>
                            <div className="h-px w-16 bg-[linear-gradient(90deg,rgba(0,180,216,0.4),transparent)]" />
                          </motion.div>
                          <div className="h-6 w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.25),transparent)]" />
                        </motion.div>
                      )}

                      {/* ── Direct reports grid ───────────────────────────── */}
                      {activeTeam.reports.length > 0 && (
                        <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-3">
                          {activeTeam.reports.map((report, index) => {
                            const loneInRow =
                              activeTeam.reports.length % 3 === 1 &&
                              index === activeTeam.reports.length - 1;
                            return (
                              <div key={report.name} className={loneInRow ? "sm:col-start-2" : ""}>
                                <ReportCard
                                  report={report}
                                  index={index}
                                  gradient={activeTeam.color}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

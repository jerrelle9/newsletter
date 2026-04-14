"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { SectionNumber } from "@/components/layout/SectionNumber";
import { OrgBubble } from "@/components/org/OrgBubble";
import { OrgBox } from "@/components/org/OrgBox";
import { gdtdStructure } from "@/data/gdtd-structure";
import { orgOverview } from "@/data/org-overview";

export function StructureSection() {
  const descriptors = ["Platforms", "Journeys", "Products"];

  const reportingTeams = gdtdStructure.teams;
  const [activeTeamName, setActiveTeamName] = useState(reportingTeams[0]?.name ?? "");

  const activeTeam =
    reportingTeams.find((team) => team.name === activeTeamName) ?? reportingTeams[0];

  const managerNames = activeTeam?.managers.map((manager) => manager.name).join(" and ");

  return (
    <section
      id="section-4"
      className="relative min-h-screen border-b border-(--border) bg-[radial-gradient(circle_at_50%_8%,rgba(0,180,216,0.12),transparent_16%),linear-gradient(180deg,var(--navy)_0%,var(--surface)_100%)]"
    >
      <SectionNumber number="04" />

      <div className="mx-auto min-h-screen max-w-[82vw] px-6 py-24 md:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-sm uppercase tracking-[0.3em] text-[rgba(0,180,230,0.72)]">
            Our structure
          </div>
          <h2 className="mt-4 text-4xl font-black leading-[0.92] tracking-[-0.04em] md:text-6xl">
            Structured to deliver across the wider IT organisation and within GDTD itself.
          </h2>
          <p className="mt-5 leading-8 text-(--light)">
            This view shows first where GDTD sits in Republic&apos;s wider technology structure,
            then how leadership and reporting lines flow within the division itself.
          </p>
        </Reveal>

        {/* Layer 1: IT organisation placement */}
        <Reveal className="mt-16">
          <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-[rgba(0,180,230,0.78)]">
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

              <div className="mt-8 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-200">
                GTD is the in-scope division for this site
              </div>
            </div>
          </div>
        </Reveal>

        {/* Layer 2: GTD internal structure */}
        <Reveal className="mt-10">
          <div className="rounded-4xl border border-(--border) bg-[rgba(11,29,46,0.76)] p-8 shadow-[0_24px_100px_rgba(1,17,27,0.55)] backdrop-blur-2xl">
            <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-[rgba(0,180,230,0.78)]">
              GTD reporting structure
            </div>

            <div className="mt-8 mx-auto max-w-5xl">
              <div className="flex flex-col items-center text-center">
                <OrgBubble label="GM" size="md" />
                <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[rgba(0,180,230,0.78)]">
                  {gdtdStructure.leader.role}
                </div>
                <div className="mt-2 text-xl font-semibold text-white">
                  {gdtdStructure.leader.name}
                </div>
                <div className="mt-2 text-sm text-(--dim)">
                  Group Digital Technology Division
                </div>
                <div className="mt-2 max-w-2xl text-sm leading-7 text-(--light)">
                  Select a team below to see its senior manager, manager, and direct reporting line.
                </div>
                <div className="mt-8 h-16 w-px bg-[linear-gradient(180deg,rgba(0,180,216,0.85),rgba(0,180,216,0.2))]" />
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {reportingTeams.map((team, index) => {
                  const isActive = team.name === activeTeam?.name;

                  return (
                    <button
                      key={team.name}
                      type="button"
                      onClick={() => setActiveTeamName(team.name)}
                      className={`rounded-4xl border p-5 text-left transition duration-200 ${
                        isActive
                          ? "border-[rgba(0,180,216,0.3)] bg-[rgba(255,255,255,0.06)] shadow-[0_18px_40px_rgba(0,180,216,0.12)]"
                          : "border-(--border) bg-[rgba(255,255,255,0.03)] hover:border-[rgba(0,180,216,0.18)] hover:bg-[rgba(255,255,255,0.05)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <OrgBubble label={team.initials} gradient={team.color} />
                          <div>
                            <div className="font-semibold text-white">{team.name}</div>
                            <div className="text-xs uppercase tracking-[0.25em] text-(--dim)">
                              {descriptors[index]}
                            </div>
                          </div>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 shrink-0 text-(--blue-lt) transition-transform ${
                            isActive ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      </div>

                      <div className="mt-5 text-sm leading-7 text-(--light)">
                        Reports through {team.seniorManager.name} and expands to show the named leadership line.
                      </div>
                    </button>
                  );
                })}
              </div>

              {activeTeam ? (
                <div className="mt-8 rounded-4xl border border-[rgba(0,180,216,0.22)] bg-[rgba(0,180,216,0.08)] p-6 backdrop-blur-xl md:p-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-[rgba(0,180,230,0.78)]">
                        Expanded reporting line
                      </div>
                      <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                        {activeTeam.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-(--light)">
                        This team sits under {activeTeam.seniorManager.name} and is led day-to-day by {managerNames}.
                      </p>
                    </div>

                    <div className="rounded-full border border-(--border) bg-[rgba(11,29,46,0.52)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-(--light)">
                      {activeTeam.managers.length} manager{activeTeam.managers.length === 1 ? "" : "s"}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-3xl border border-(--border) bg-[rgba(11,29,46,0.56)] p-5">
                      <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-[rgba(0,180,230,0.78)]">
                        Senior manager
                      </div>
                      <div className="mt-3 flex items-center gap-4">
                        <OrgBubble label="SM" gradient={activeTeam.color} />
                        <div>
                          <div className="text-lg font-semibold text-white">{activeTeam.seniorManager.name}</div>
                          <div className="text-sm text-(--light)">{activeTeam.seniorManager.role}</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-(--border) bg-[rgba(11,29,46,0.56)] p-5">
                      <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-[rgba(0,180,230,0.78)]">
                        Manager{activeTeam.managers.length === 1 ? "" : "s"}
                      </div>
                      <div className="mt-3 grid gap-4">
                        {activeTeam.managers.map((manager, index) => (
                          <div key={manager.name} className="flex items-center gap-4">
                            <OrgBubble
                              label={activeTeam.managers.length === 1 ? "MG" : `M${index + 1}`}
                              gradient={activeTeam.color}
                            />
                            <div>
                              <div className="text-lg font-semibold text-white">{manager.name}</div>
                              <div className="text-sm text-(--light)">{manager.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {activeTeam.reports.length > 0 ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {activeTeam.reports.map((report, index) => (
                      <div
                        key={report.name}
                        className="rounded-3xl border border-(--border) bg-[rgba(11,29,46,0.56)] p-5 text-center"
                      >
                        <div className="mx-auto flex w-fit items-center gap-3">
                          <OrgBubble
                            label={report.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 3)}
                            gradient={activeTeam.color}
                          />
                          <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-(--dim)">
                            0{index + 1}
                          </div>
                        </div>
                        <div className="mt-4 text-base font-semibold text-white">
                          {report.name}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-(--light)">
                          {report.role}
                        </div>
                      </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 rounded-3xl border border-(--border) bg-[rgba(11,29,46,0.42)] p-5 text-sm leading-7 text-(--light)">
                      No additional direct reports are listed below the manager layer for this team.
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
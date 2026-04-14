export function OrgBubble({
  label,
  size = "sm",
  gradient = "from-[var(--teal)] to-[var(--blue)]",
}: {
  label: string;
  size?: "sm" | "md";
  gradient?: string;
}) {
  const sizing =
    size === "md" ? "h-16 w-16 text-sm tracking-[0.16em]" : "h-10 w-10 text-[11px] tracking-[0.12em]";

  return (
    <div
      className={`grid place-items-center rounded-full border border-[var(--border)] bg-linear-to-br ${gradient} ${sizing} font-semibold uppercase text-white shadow-[0_12px_30px_rgba(0,180,216,0.2)] ring-1 ring-white/12`}
    >
      {label}
    </div>
  );
}
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
  variant?: "outline" | "default";
};

export function Button({
  className = "",
  children,
  variant,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full border text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-lt)]/80 disabled:pointer-events-none disabled:opacity-50";

  const styles =
    variant === "outline"
      ? "border-[var(--border)] bg-[rgba(255,255,255,0.03)] text-[var(--white)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[rgba(0,180,216,0.35)] hover:bg-[rgba(255,255,255,0.06)]"
      : "border-[rgba(0,180,216,0.24)] bg-[linear-gradient(135deg,var(--blue-lt),var(--blue))] text-[var(--navy)] shadow-[0_16px_36px_rgba(0,150,199,0.34)] hover:translate-y-[-1px] hover:shadow-[0_24px_44px_rgba(0,150,199,0.4)]";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
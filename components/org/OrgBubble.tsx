"use client";

import { useEffect, useState } from "react";

export function OrgBubble({
  label,
  size = "sm",
  gradient = "from-[var(--teal)] to-[var(--blue)]",
  image,
}: {
  label: string;
  size?: "sm" | "md" | "lg";
  gradient?: string;
  image?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  // Reset failure flag whenever the image path changes so the new
  // image gets a fresh attempt instead of inheriting stale state.
  useEffect(() => {
    setImgFailed(false);
  }, [image]);

  const sizing =
    size === "lg"
      ? "h-20 w-20 text-base tracking-[0.16em]"
      : size === "md"
      ? "h-16 w-16 text-sm tracking-[0.16em]"
      : "h-10 w-10 text-[11px] tracking-[0.12em]";

  if (image && !imgFailed) {
    return (
      <div
        className={`relative overflow-hidden rounded-full border border-[var(--border)] ${sizing} shrink-0 ring-1 ring-white/12 shadow-[0_12px_30px_rgba(0,180,216,0.2)]`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={label}
          className="h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full border border-[var(--border)] bg-linear-to-br ${gradient} ${sizing} font-semibold uppercase text-white shadow-[0_12px_30px_rgba(0,180,216,0.2)] ring-1 ring-white/12`}
    >
      {label}
    </div>
  );
}

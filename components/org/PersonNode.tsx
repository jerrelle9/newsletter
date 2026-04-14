type PersonNodeProps = {
  name: string;
  role: string;
  image?: string;
  accent?: string;
};

export function PersonNode({
  name,
  role,
  image,
  accent = "border-fuchsia-400",
}: PersonNodeProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`h-24 w-24 overflow-hidden rounded-full border-4 ${accent} bg-slate-800 shadow-[0_16px_35px_rgba(0,0,0,0.35)]`}
      >
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-bold text-white">
            {name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
      </div>
      <div className="mt-3 text-base font-semibold text-white">{name}</div>
      <div className="text-sm text-[var(--light)]">{role}</div>
    </div>
  );
}
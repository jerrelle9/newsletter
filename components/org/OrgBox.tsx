type OrgBoxProps = {
  code: string;
  title: string;
  active?: boolean;
};

export function OrgBox({ code, title, active = false }: OrgBoxProps) {
  return (
    <div
      className={`min-w-[220px] rounded-[28px] border px-6 py-5 text-center shadow-[0_20px_40px_rgba(0,0,0,0.28)] ${
        active
          ? "border-fuchsia-300/40 bg-[linear-gradient(180deg,rgba(192,61,255,0.88),rgba(154,43,201,0.82))]"
          : "border-fuchsia-200/20 bg-[linear-gradient(180deg,rgba(190,78,220,0.74),rgba(151,50,174,0.70))]"
      }`}
    >
      <div className="text-3xl font-black text-white">{code}</div>
      <div className="mt-2 text-lg font-semibold leading-snug text-white">
        {title}
      </div>
    </div>
  );
}
interface InfoItemInterface {
  label: string;
  value: string | number;
}

export default function InfoItem({ label, value }: InfoItemInterface) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-3">
      <span className="text-[11px] uppercase tracking-wide text-neutral-500 text-center">
        {label}
      </span>
      <span className="mt-0.5 text-sm font-semibold text-neutral-900 text-center">
        {value}
      </span>
    </div>
  );
}

// src/components/header/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-200 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">
              AAU Football
            </span>
            <span className="hidden sm:block text-xs text-neutral-500">
              University Football Management
            </span>
          </Link>

          <span className="text-[12px] sm:text-xs font-medium px-3 py-1 rounded-full bg-black text-white">
            BETA
          </span>
        </div>
      </div>
    </header>
  );
}

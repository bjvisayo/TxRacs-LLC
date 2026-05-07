import { Flame, Snowflake } from 'lucide-react';

export function Logo({ light = false }) {
  return (
    <a href="#home" className="flex items-center gap-2" aria-label="TxRacs LLC home">
      <span
        className={`relative grid h-11 w-11 place-items-center rounded-full ${
          light ? 'bg-white/10' : 'bg-primary/10'
        }`}
      >
        <Snowflake className="h-6 w-6 text-primary" aria-hidden="true" />
        <Flame className="absolute right-1 top-1 h-5 w-5 text-cta" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className={`block text-2xl font-black italic ${light ? 'text-white' : 'text-primary'}`}>
          Tx<span className="text-cta">Racs</span>
        </span>
        <span className={`ml-1 text-[9px] font-black uppercase tracking-widest ${light ? 'text-white/70' : 'text-slate-500'}`}>
          LLC
        </span>
      </span>
    </a>
  );
}

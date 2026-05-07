export function SectionHeader({ eyebrow, title, description, centered = true, light = false }) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className={light ? 'text-xs font-black uppercase tracking-[0.12em] text-blue-200' : 'eyebrow'}>{eyebrow}</p>}
      <h2 className={`mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {description && <p className={`mt-5 text-base leading-7 ${light ? 'text-blue-100' : 'text-slate-600'}`}>{description}</p>}
    </div>
  );
}

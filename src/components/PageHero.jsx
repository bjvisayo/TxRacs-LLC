import { motion } from 'framer-motion';

export function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-24">
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cta/20 blur-3xl" />
      <motion.div
        className="container-premium relative max-w-4xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-200">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100">{description}</p>
      </motion.div>
    </section>
  );
}

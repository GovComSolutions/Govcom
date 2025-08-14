import React from 'react';

interface SectionHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export default function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <section className="w-full bg-muted/40 dark:bg-muted/20 py-12 mb-8 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-2 font-serif">{title}</h1>
      {children}
    </section>
  );
} 
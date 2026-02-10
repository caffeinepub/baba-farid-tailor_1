import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  background?: 'default' | 'muted' | 'accent';
}

export default function Section({
  id,
  children,
  className = '',
  background = 'default',
}: SectionProps) {
  const bgClasses = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    accent: 'bg-accent/5',
  };

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

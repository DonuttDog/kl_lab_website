import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from './utils';

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Card({ className, children, ...props }: CardProps) {
  return (
    <section
      className={cn('rounded-md border border-border bg-surface p-4 shadow-soft', className)}
      {...props}
    >
      {children}
    </section>
  );
}

import type { SelectHTMLAttributes } from 'react';
import { cn } from './utils';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export function Select({ className, invalid = false, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'h-10 w-full rounded-md border bg-surface px-3 text-sm text-text-primary outline-none transition focus-visible:ring-2 focus-visible:ring-brand',
        invalid ? 'border-danger' : 'border-border',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

import type { InputHTMLAttributes } from 'react';
import { cn } from './utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export function Input({ className, invalid = false, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-md border bg-surface px-3 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-brand',
        invalid ? 'border-danger' : 'border-border',
        className,
      )}
      {...props}
    />
  );
}

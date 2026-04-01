import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from './utils';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
};

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
};

const variantMap: Record<ButtonVariant, string> = {
  primary: 'border border-brand bg-brand text-white hover:bg-brand-hover',
  secondary: 'border border-border bg-surface text-text-primary hover:bg-slate-50',
  danger: 'border border-danger bg-danger text-white hover:bg-red-700',
  ghost: 'border border-transparent bg-transparent text-text-secondary hover:bg-slate-100',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50',
        sizeMap[size],
        variantMap[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    />
  );
}

import { cn } from './utils';

type ToastVariant = 'success' | 'info' | 'warning' | 'error';

type ToastProps = {
  message: string;
  variant?: ToastVariant;
};

const variantClass: Record<ToastVariant, string> = {
  success: 'border-success/40 bg-green-50 text-green-700',
  info: 'border-brand/40 bg-cyan-50 text-cyan-700',
  warning: 'border-warning/40 bg-amber-50 text-amber-700',
  error: 'border-danger/40 bg-rose-50 text-rose-700',
};

export function Toast({ message, variant = 'info' }: ToastProps) {
  return (
    <div
      role="status"
      className={cn(
        'rounded-md border px-3 py-2 text-sm shadow-soft',
        variantClass[variant],
      )}
    >
      {message}
    </div>
  );
}

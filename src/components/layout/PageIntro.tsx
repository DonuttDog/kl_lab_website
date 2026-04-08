import type { ReactNode } from 'react';
import { cn } from '../ui/utils';

type PageIntroProps = {
  title: string;
  subtitle: string;
  hint?: string;
  /** 标题区短标签（如「临床级…」），与 Stitch 对齐 */
  kicker?: string;
  aside?: ReactNode;
  className?: string;
};

export function PageIntro({ title, subtitle, hint, kicker, aside, className }: PageIntroProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between',
        className,
      )}
    >
      <div className="min-w-0 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-brandInk md:text-4xl">{title}</h1>
        <p className="max-w-3xl text-base font-light leading-relaxed text-text-secondary md:text-lg">
          {subtitle}
        </p>
        {kicker ? (
          <div className="flex items-center gap-2 pt-1 text-xs font-medium uppercase tracking-wider text-brandSecondary">
            <span className="h-px w-8 bg-brand/40" aria-hidden />
            {kicker}
          </div>
        ) : null}
        {hint ? (
          <p className="max-w-3xl text-xs leading-relaxed text-text-muted md:text-sm">{hint}</p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0 md:pt-1">{aside}</div> : null}
    </header>
  );
}

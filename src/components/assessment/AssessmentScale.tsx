import { cn } from '../ui/utils';

type AssessmentScaleProps = {
  scaleCount: number;
  value: number | null;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
};

export function AssessmentScale({
  scaleCount,
  value,
  onChange,
  leftLabel,
  rightLabel,
}: AssessmentScaleProps) {
  const count = Math.max(2, scaleCount);
  const options = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div
        role="radiogroup"
        aria-label="assessment-scale"
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      >
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`评分 ${option}`}
              onClick={() => onChange(option)}
              className={cn(
                'h-9 rounded-md border text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                selected
                  ? 'border-brand bg-brand text-white'
                  : 'border-border bg-surface text-text-secondary hover:bg-slate-50',
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

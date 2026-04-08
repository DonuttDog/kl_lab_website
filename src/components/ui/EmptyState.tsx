import { Link } from 'react-router-dom';
import { Button } from './Button';

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  secondaryActionLabel,
  onSecondaryAction,
}: EmptyStateProps) {
  const hasPrimary = Boolean(actionLabel && actionTo);
  const hasSecondary = Boolean(secondaryActionLabel && onSecondaryAction);

  return (
    <div className="rounded-md border border-dashed border-border bg-surface p-6 text-center">
      <p className="text-lg font-semibold text-text-primary">{title}</p>
      {description ? <p className="mt-2 text-sm text-text-muted">{description}</p> : null}
      {hasPrimary || hasSecondary ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {hasSecondary ? (
            <Button type="button" variant="primary" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          ) : null}
          {hasPrimary ? (
            <Link className="inline-flex" to={actionTo!}>
              <Button variant="secondary">{actionLabel}</Button>
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

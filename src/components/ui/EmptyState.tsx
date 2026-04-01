import { Link } from 'react-router-dom';
import { Button } from './Button';

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
};

export function EmptyState({ title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="rounded-md border border-dashed border-border bg-surface p-6 text-center">
      <p className="text-lg font-semibold text-text-primary">{title}</p>
      {description ? <p className="mt-2 text-sm text-text-muted">{description}</p> : null}
      {actionLabel && actionTo ? (
        <Link className="mt-4 inline-flex" to={actionTo}>
          <Button variant="secondary">{actionLabel}</Button>
        </Link>
      ) : null}
    </div>
  );
}

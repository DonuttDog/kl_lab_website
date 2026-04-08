import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../ui/utils';

export type BreadcrumbCrumb = { label: string; to?: string };

type PageBreadcrumbProps = {
  items: BreadcrumbCrumb[];
  className?: string;
};

export function PageBreadcrumb({ items, className }: PageBreadcrumbProps) {
  const { t } = useTranslation();
  return (
    <nav aria-label={t('breadcrumb.navAriaLabel')} className={cn('text-sm text-text-muted', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden className="text-border">/</span> : null}
            {item.to ? (
              <Link className="text-text-secondary transition hover:text-brandInk" to={item.to}>
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-text-primary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** 列表页：首页 / 当前模块 */
export function useListPageBreadcrumb(currentLabelKey: 'breadcrumb.assessments' | 'breadcrumb.courses') {
  const { t } = useTranslation();
  return [
    { label: t('breadcrumb.home'), to: '/' },
    { label: t(currentLabelKey) },
  ] satisfies BreadcrumbCrumb[];
}

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buttonStyleClasses } from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  const { t } = useTranslation();
  const title = `${t('page.notFound.title')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(title);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface px-6 py-16 text-center shadow-soft md:px-12 md:py-20">
        {/* 背景装饰 */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/[0.05] via-transparent to-brandInk/[0.03]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-lg space-y-6">
          {/* 大号 404 */}
          <p
            className="bg-signature-gradient bg-clip-text text-7xl font-extrabold leading-none tracking-tight text-transparent md:text-8xl"
            aria-hidden
          >
            404
          </p>

          <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
            {t('page.notFound.heading')}
          </h1>

          <p className="text-sm leading-relaxed text-text-muted">
            {t('page.notFound.description')}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link
              to="/"
              className={buttonStyleClasses(
                'gradient',
                'md',
                'rounded-xl px-6 font-semibold shadow-sm',
              )}
            >
              {t('page.notFound.backHome')}
            </Link>
            <Link
              to="/assessments"
              className={buttonStyleClasses(
                'secondary',
                'md',
                'rounded-xl px-6',
              )}
            >
              {t('page.notFound.goAssessments')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

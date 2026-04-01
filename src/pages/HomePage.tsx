import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function HomePage() {
  const { t } = useTranslation();
  const title = `${t('page.home.title')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(title);

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-border bg-surface px-6 py-12 text-center shadow-soft">
        <h1 className="text-3xl font-bold text-text-primary md:text-4xl">{t('page.home.heroTitle')}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-muted md:text-base">
          {t('page.home.heroSubtitle')}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">{t('page.home.entryAssessmentsTitle')}</h2>
          <p className="text-sm text-text-muted">{t('page.home.entryAssessmentsDesc')}</p>
          <Link className="mt-3 inline-flex" to="/assessments">
            <Button variant="primary">{t('page.home.entryAssessmentsTitle')}</Button>
          </Link>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">{t('page.home.entryCoursesTitle')}</h2>
          <p className="text-sm text-text-muted">{t('page.home.entryCoursesDesc')}</p>
          <Link className="mt-3 inline-flex" to="/courses">
            <Button variant="secondary">{t('page.home.entryCoursesTitle')}</Button>
          </Link>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-text-primary">{t('page.home.featuresTitle')}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="text-sm text-text-secondary">{t('page.home.feature1')}</Card>
          <Card className="text-sm text-text-secondary">{t('page.home.feature2')}</Card>
          <Card className="text-sm text-text-secondary">{t('page.home.feature3')}</Card>
        </div>
      </section>
    </div>
  );
}

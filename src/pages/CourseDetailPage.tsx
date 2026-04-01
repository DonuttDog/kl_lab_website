import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, EmptyState } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getCourseById } from '../mocks/courses';

export function CourseDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const item = id ? getCourseById(id) : undefined;

  const titleText = item
    ? `${t(item.titleKey)} · ${t('app.documentTitleSuffix')}`
    : `${t('page.courseDetail.notFoundTitle')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(titleText);

  if (!item) {
    return (
      <EmptyState
        title={t('page.courseDetail.notFoundTitle')}
        description={t('page.courseDetail.notFoundHint')}
        actionLabel={t('common.backToList')}
        actionTo="/courses"
      />
    );
  }

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-text-muted" aria-label="breadcrumb">
        <Link className="hover:text-text-primary" to="/">
          {t('breadcrumb.home')}
        </Link>
        <span aria-hidden>/</span>
        <Link className="hover:text-text-primary" to="/courses">
          {t('breadcrumb.courses')}
        </Link>
        <span aria-hidden>/</span>
        <span>{t(item.titleKey)}</span>
      </nav>

      <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-border bg-slate-50 text-sm text-text-muted">
        {t('common.cover')}
      </div>

      <div>
        <h1 className="text-3xl font-bold text-text-primary">{t(item.titleKey)}</h1>
        <p className="mt-2 text-sm text-text-muted">
          {t('common.audienceObject')}: {t(item.audienceKey)}
        </p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-text-primary">{t('page.courseDetail.introTitle')}</h2>
        <p className="mt-3 text-sm leading-7 text-text-secondary">{t(item.detailBodyKey)}</p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-text-primary">{t('page.courseDetail.outlineTitle')}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-text-secondary">
          <li>{t('page.courseDetail.outlineItem1')}</li>
          <li>{t('page.courseDetail.outlineItem2')}</li>
          <li>{t('page.courseDetail.outlineItem3')}</li>
        </ul>
      </Card>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => window.alert(t('page.courseDetail.ctaToast'))}>
          {t('page.courseDetail.ctaLearn')}
        </Button>
        <Link to="/courses">
          <Button variant="secondary">{t('common.backToList')}</Button>
        </Link>
      </div>
    </div>
  );
}

import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, EmptyState } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getAssessmentById } from '../mocks/assessments';

export function AssessmentDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const item = id ? getAssessmentById(id) : undefined;

  const titleText = item
    ? `${t(item.titleKey)} · ${t('app.documentTitleSuffix')}`
    : `${t('page.assessmentDetail.notFoundTitle')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(titleText);

  if (!item) {
    return (
      <EmptyState
        title={t('page.assessmentDetail.notFoundTitle')}
        description={t('page.assessmentDetail.notFoundHint')}
        actionLabel={t('common.backToList')}
        actionTo="/assessments"
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
        <Link className="hover:text-text-primary" to="/assessments">
          {t('breadcrumb.assessments')}
        </Link>
        <span aria-hidden>/</span>
        <span>{t(item.titleKey)}</span>
      </nav>

      <div>
        <h1 className="text-3xl font-bold text-text-primary">{t(item.titleKey)}</h1>
        <p className="mt-2 text-sm text-text-muted">
          {t('page.assessmentDetail.metaDuration', { value: t(item.durationKey) })}
        </p>
        <p className="text-sm text-text-muted">
          {t('page.assessmentDetail.metaAudience', { value: t(item.audienceKey) })}
        </p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-text-primary">{t('page.assessmentDetail.introTitle')}</h2>
        <p className="mt-3 text-sm leading-7 text-text-secondary">{t(item.detailBodyKey)}</p>
      </Card>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link to={`/assessments/${item.id}/answer`}>
          <Button variant="primary">{t('common.startAssessment')}</Button>
        </Link>
        <Link to="/assessments">
          <Button variant="secondary">{t('common.backToList')}</Button>
        </Link>
      </div>
    </div>
  );
}

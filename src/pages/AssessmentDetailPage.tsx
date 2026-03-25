import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
      <div className="card">
        <h1 className="h1">{t('page.assessmentDetail.notFoundTitle')}</h1>
        <p className="muted">{t('page.assessmentDetail.notFoundHint')}</p>
        <Link className="btn" to="/assessments">
          {t('common.backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="stack">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link to="/">{t('breadcrumb.home')}</Link>
        <span aria-hidden>/</span>
        <Link to="/assessments">{t('breadcrumb.assessments')}</Link>
        <span aria-hidden>/</span>
        <span>{t(item.titleKey)}</span>
      </nav>

      <div>
        <h1 className="h1">{t(item.titleKey)}</h1>
        <p className="card__meta">{t('page.assessmentDetail.metaDuration', { value: t(item.durationKey) })}</p>
        <p className="card__meta">{t('page.assessmentDetail.metaAudience', { value: t(item.audienceKey) })}</p>
      </div>

      <section>
        <h2 className="h2">{t('page.assessmentDetail.introTitle')}</h2>
        <p>{t(item.detailBodyKey)}</p>
      </section>

      <p style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <Link className="btn btn--primary" to={`/assessments/${item.id}/answer`}>
          {t('common.startAssessment')}
        </Link>
        <Link className="btn" to="/assessments">
          {t('common.backToList')}
        </Link>
      </p>
    </div>
  );
}

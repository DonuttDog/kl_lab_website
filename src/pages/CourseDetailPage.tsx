import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
      <div className="card">
        <h1 className="h1">{t('page.courseDetail.notFoundTitle')}</h1>
        <p className="muted">{t('page.courseDetail.notFoundHint')}</p>
        <Link className="btn" to="/courses">
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
        <Link to="/courses">{t('breadcrumb.courses')}</Link>
        <span aria-hidden>/</span>
        <span>{t(item.titleKey)}</span>
      </nav>

      <div className="course-hero" aria-hidden>
        {t('common.cover')}
      </div>

      <div>
        <h1 className="h1">{t(item.titleKey)}</h1>
        <p className="card__meta">
          {t('common.audienceObject')}: {t(item.audienceKey)}
        </p>
      </div>

      <section>
        <h2 className="h2">{t('page.courseDetail.introTitle')}</h2>
        <p>{t(item.detailBodyKey)}</p>
      </section>

      <section>
        <h2 className="h2">{t('page.courseDetail.outlineTitle')}</h2>
        <ul>
          <li>{t('page.courseDetail.outlineItem1')}</li>
          <li>{t('page.courseDetail.outlineItem2')}</li>
          <li>{t('page.courseDetail.outlineItem3')}</li>
        </ul>
      </section>

      <p style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => window.alert(t('page.courseDetail.ctaToast'))}
        >
          {t('page.courseDetail.ctaLearn')}
        </button>
        <Link className="btn" to="/courses">
          {t('common.backToList')}
        </Link>
      </p>
    </div>
  );
}

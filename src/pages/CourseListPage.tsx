import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  listCourses,
  type CourseAudienceFilter,
  type CourseTopicFilter,
} from '../mocks/courses';

export function CourseListPage() {
  const { t } = useTranslation();
  const title = `${t('page.courseList.title')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(title);

  const [audience, setAudience] = useState<CourseAudienceFilter>('all');
  const [topic, setTopic] = useState<CourseTopicFilter>('all');

  const items = useMemo(() => listCourses({ audience, topic }), [audience, topic]);

  return (
    <div className="stack">
      <div>
        <h1 className="h1">{t('page.courseList.title')}</h1>
        <p className="muted">{t('page.courseList.subtitle')}</p>
      </div>

      <div className="filters">
        <label>
          {t('page.courseList.filterAudience')}
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value as CourseAudienceFilter)}
          >
            <option value="all">{t('page.courseList.filterAll')}</option>
            <option value="parent">{t('page.courseList.audienceOptionParent')}</option>
            <option value="student">{t('page.courseList.audienceOptionStudent')}</option>
          </select>
        </label>
        <label>
          {t('page.courseList.filterTopic')}
          <select value={topic} onChange={(e) => setTopic(e.target.value as CourseTopicFilter)}>
            <option value="all">{t('page.courseList.filterAll')}</option>
            <option value="family">{t('page.courseList.topicOptionFamily')}</option>
            <option value="exam">{t('page.courseList.topicOptionExam')}</option>
          </select>
        </label>
      </div>

      {items.length === 0 ? (
        <div className="card">
          <p className="card__title">{t('page.courseList.emptyTitle')}</p>
          <p className="muted">{t('page.courseList.emptyHint')}</p>
          <Link className="btn" to="/">
            {t('common.goHome')}
          </Link>
        </div>
      ) : (
        <div className="grid-entries">
          {items.map((c) => (
            <article key={c.id} className="card">
              <div className="course-hero" aria-hidden>
                {t('common.cover')}
              </div>
              <h2 className="card__title">{t(c.titleKey)}</h2>
              <p className="muted">{t(c.summaryKey)}</p>
              <p className="card__meta">
                {t('common.audienceObject')}: {t(c.audienceKey)}
              </p>
              <Link className="btn btn--primary" to={`/courses/${c.id}`}>
                {t('common.viewDetail')}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

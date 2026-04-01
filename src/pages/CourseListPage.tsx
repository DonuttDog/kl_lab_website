import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, EmptyState, Input, Select } from '../components/ui';
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
  const [search, setSearch] = useState('');

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    return listCourses({ audience, topic }).filter((course) => {
      if (!q) return true;
      const titleText = t(course.titleKey).toLowerCase();
      return titleText.includes(q);
    });
  }, [audience, topic, search, t]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{t('page.courseList.title')}</h1>
        <p className="mt-2 text-sm text-text-muted">{t('page.courseList.subtitle')}</p>
      </div>

      <Card className="space-y-4">
        <label htmlFor="course-search" className="space-y-1 text-sm text-text-muted">
          <span>{t('page.courseList.searchLabel')}</span>
          <Input
            id="course-search"
            type="search"
            placeholder={t('page.courseList.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1 text-sm text-text-muted">
            <span>{t('page.courseList.filterAudience')}</span>
            <Select
              value={audience}
              onChange={(e) => setAudience(e.target.value as CourseAudienceFilter)}
            >
              <option value="all">{t('page.courseList.filterAll')}</option>
              <option value="parent">{t('page.courseList.audienceOptionParent')}</option>
              <option value="student">{t('page.courseList.audienceOptionStudent')}</option>
            </Select>
          </label>
          <label className="space-y-1 text-sm text-text-muted">
            <span>{t('page.courseList.filterTopic')}</span>
            <Select value={topic} onChange={(e) => setTopic(e.target.value as CourseTopicFilter)}>
              <option value="all">{t('page.courseList.filterAll')}</option>
              <option value="family">{t('page.courseList.topicOptionFamily')}</option>
              <option value="exam">{t('page.courseList.topicOptionExam')}</option>
            </Select>
          </label>
        </div>
      </Card>

      {items.length === 0 ? (
        <EmptyState
          title={t('page.courseList.emptyTitle')}
          description={t('page.courseList.emptyHint')}
          actionLabel={t('common.goHome')}
          actionTo="/"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((c) => (
            <Card key={c.id} className="space-y-3">
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-border bg-slate-50 text-sm text-text-muted">
                {t('common.cover')}
              </div>
              <h2 className="text-lg font-semibold text-text-primary">{t(c.titleKey)}</h2>
              <p className="text-sm text-text-secondary">{t(c.summaryKey)}</p>
              <p className="text-xs text-text-muted">
                {t('common.audienceObject')}: {t(c.audienceKey)}
              </p>
              <Link className="mt-3 inline-flex" to={`/courses/${c.id}`}>
                <Button variant="primary">{t('common.viewDetail')}</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

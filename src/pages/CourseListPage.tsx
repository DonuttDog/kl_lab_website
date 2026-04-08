import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageIntro } from '../components/layout/PageIntro';
import { PageBreadcrumb, useListPageBreadcrumb } from '../components/layout/PageBreadcrumb';
import { buttonStyleClasses } from '../components/ui/Button';
import { Card, EmptyState, IconUsers, Input, MetaRow, Select } from '../components/ui';
import { cn } from '../components/ui/utils';
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

  const listBreadcrumbs = useListPageBreadcrumb('breadcrumb.courses');
  const hasActiveFilters = audience !== 'all' || topic !== 'all' || search.trim().length > 0;

  const resetFilters = () => {
    setAudience('all');
    setTopic('all');
    setSearch('');
  };

  return (
    <div className="space-y-8">
      <PageBreadcrumb items={listBreadcrumbs} />
      <PageIntro
        title={t('page.courseList.title')}
        subtitle={t('page.courseList.subtitle')}
        kicker={t('page.courseList.introKicker')}
      />

      <section className="space-y-3" aria-labelledby="course-filters-heading">
        <h2 id="course-filters-heading" className="text-sm font-semibold text-text-primary">
          {t('page.courseList.filtersSectionTitle')}
        </h2>
        <Card className="grid grid-cols-1 gap-4 rounded-xl border-border/80 p-6 shadow-[0_4px_20px_rgba(0,105,112,0.04)] md:p-8 lg:grid-cols-3 lg:items-end">
          <div className="space-y-2 lg:col-span-1">
            <label htmlFor="course-search" className="text-xs font-semibold text-text-muted">
              {t('page.courseList.searchLabel')}
            </label>
            <div className="relative">
              <span
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                aria-hidden
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <Input
                id="course-search"
                type="search"
                placeholder={t('page.courseList.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
                className="border-0 bg-surfaceMuted pl-10 focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>
          <label className="space-y-2 text-xs font-semibold text-text-muted">
            <span>{t('page.courseList.filterAudience')}</span>
            <Select
              value={audience}
              onChange={(e) => setAudience(e.target.value as CourseAudienceFilter)}
              className="border-0 bg-surfaceMuted focus:ring-1 focus:ring-brand"
            >
              <option value="all">{t('page.courseList.filterAll')}</option>
              <option value="parent">{t('page.courseList.audienceOptionParent')}</option>
              <option value="student">{t('page.courseList.audienceOptionStudent')}</option>
            </Select>
          </label>
          <label className="space-y-2 text-xs font-semibold text-text-muted">
            <span>{t('page.courseList.filterTopic')}</span>
            <Select
              value={topic}
              onChange={(e) => setTopic(e.target.value as CourseTopicFilter)}
              className="border-0 bg-surfaceMuted focus:ring-1 focus:ring-brand"
            >
              <option value="all">{t('page.courseList.filterAll')}</option>
              <option value="family">{t('page.courseList.topicOptionFamily')}</option>
              <option value="exam">{t('page.courseList.topicOptionExam')}</option>
            </Select>
          </label>
        </Card>
      </section>

      {items.length === 0 ? (
        <EmptyState
          title={t('page.courseList.emptyTitle')}
          description={t('page.courseList.emptyHint')}
          secondaryActionLabel={hasActiveFilters ? t('page.courseList.clearFilters') : undefined}
          onSecondaryAction={hasActiveFilters ? resetFilters : undefined}
          actionLabel={t('common.goHome')}
          actionTo="/"
        />
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <Card
              key={c.id}
              className={cn(
                'flex flex-col overflow-hidden rounded-xl border border-transparent p-0 shadow-soft transition-all duration-300',
                'motion-safe:hover:-translate-y-1 hover:border-border/60 hover:shadow-panel',
              )}
            >
              <div className="flex aspect-[16/10] items-center justify-center border-b border-border/60 bg-gradient-to-br from-surfaceMuted to-slate-100 text-sm text-text-muted">
                {t('common.cover')}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-bold text-text-primary">{t(c.titleKey)}</h2>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
                  {t(c.summaryKey)}
                </p>
                <MetaRow className="mt-4" icon={<IconUsers className="h-4 w-4" />}>
                  {t('common.audienceObject')}: {t(c.audienceKey)}
                </MetaRow>
                <Link
                  to={`/courses/${c.id}`}
                  className={cn(
                    buttonStyleClasses('gradient', 'md', 'mt-5 w-full justify-center rounded-xl'),
                  )}
                >
                  {t('common.viewDetail')}
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

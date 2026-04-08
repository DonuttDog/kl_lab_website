import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageIntro } from '../components/layout/PageIntro';
import { PageBreadcrumb, useListPageBreadcrumb } from '../components/layout/PageBreadcrumb';
import { buttonStyleClasses } from '../components/ui/Button';
import { Card, EmptyState, IconClock, IconUsers, Input, MetaRow, Select } from '../components/ui';
import { cn } from '../components/ui/utils';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  listAssessments,
  type AssessmentAudienceFilter,
  type AssessmentListFilters,
  type AssessmentScenarioFilter,
  type AssessmentThemeFilter,
} from '../mocks/assessments';

export function AssessmentListPage() {
  const { t } = useTranslation();
  const title = `${t('page.assessmentList.title')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(title);

  const [theme, setTheme] = useState<AssessmentThemeFilter>('all');
  const [audience, setAudience] = useState<AssessmentAudienceFilter>('all');
  const [scenario, setScenario] = useState<AssessmentScenarioFilter>('all');
  const [search, setSearch] = useState('');

  const filters: AssessmentListFilters = useMemo(
    () => ({ theme, audience, scenario, search }),
    [theme, audience, scenario, search],
  );

  const items = useMemo(
    () => listAssessments(filters, (key) => t(key)),
    [filters, t],
  );

  const listBreadcrumbs = useListPageBreadcrumb('breadcrumb.assessments');
  const hasActiveFilters =
    theme !== 'all' ||
    audience !== 'all' ||
    scenario !== 'all' ||
    search.trim().length > 0;

  const resetFilters = () => {
    setTheme('all');
    setAudience('all');
    setScenario('all');
    setSearch('');
  };

  return (
    <div className="space-y-8">
      <PageBreadcrumb items={listBreadcrumbs} />
      <PageIntro
        title={t('page.assessmentList.title')}
        subtitle={t('page.assessmentList.subtitle')}
        kicker={t('page.assessmentList.introKicker')}
        hint={t('page.assessmentList.filterHint')}
      />

      <section className="space-y-3" aria-labelledby="assessment-filters-heading">
        <h2 id="assessment-filters-heading" className="text-sm font-semibold text-text-primary">
          {t('page.assessmentList.filtersSectionTitle')}
        </h2>
        <Card className="grid grid-cols-1 gap-4 rounded-xl border-border/80 p-6 shadow-[0_4px_20px_rgba(0,105,112,0.04)] md:p-8 lg:grid-cols-4 lg:items-end">
          <div className="space-y-2">
            <label htmlFor="assessment-search" className="text-xs font-semibold text-text-muted">
              {t('page.assessmentList.searchLabel')}
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
                id="assessment-search"
                type="search"
                placeholder={t('page.assessmentList.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
                className="border-0 bg-surfaceMuted pl-10 focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>
          <label className="space-y-2 text-xs font-semibold text-text-muted">
            <span>{t('page.assessmentList.filterThemeLabel')}</span>
            <Select
              value={theme}
              onChange={(e) => setTheme(e.target.value as AssessmentThemeFilter)}
              className="border-0 bg-surfaceMuted focus:ring-1 focus:ring-brand"
            >
              <option value="all">{t('page.assessmentList.themeOptionAll')}</option>
              <option value="learning">{t('page.assessmentList.themeOptionLearning')}</option>
              <option value="emotion">{t('page.assessmentList.themeOptionEmotion')}</option>
            </Select>
          </label>
          <label className="space-y-2 text-xs font-semibold text-text-muted">
            <span>{t('page.assessmentList.filterAudienceLabel')}</span>
            <Select
              value={audience}
              onChange={(e) => setAudience(e.target.value as AssessmentAudienceFilter)}
              className="border-0 bg-surfaceMuted focus:ring-1 focus:ring-brand"
            >
              <option value="all">{t('page.assessmentList.audienceOptionAll')}</option>
              <option value="k12">{t('page.assessmentList.audienceOptionK12')}</option>
              <option value="teen_parent">{t('page.assessmentList.audienceOptionTeenParent')}</option>
            </Select>
          </label>
          <label className="space-y-2 text-xs font-semibold text-text-muted">
            <span>{t('page.assessmentList.filterScenarioLabel')}</span>
            <Select
              value={scenario}
              onChange={(e) => setScenario(e.target.value as AssessmentScenarioFilter)}
              className="border-0 bg-surfaceMuted focus:ring-1 focus:ring-brand"
            >
              <option value="all">{t('page.assessmentList.scenarioOptionAll')}</option>
              <option value="self">{t('page.assessmentList.scenarioOptionSelf')}</option>
              <option value="stress">{t('page.assessmentList.scenarioOptionStress')}</option>
            </Select>
          </label>
        </Card>
      </section>

      {items.length === 0 ? (
        <EmptyState
          title={t('page.assessmentList.emptyTitle')}
          description={t('page.assessmentList.emptyHint')}
          secondaryActionLabel={hasActiveFilters ? t('page.assessmentList.clearFilters') : undefined}
          onSecondaryAction={hasActiveFilters ? resetFilters : undefined}
          actionLabel={t('common.goHome')}
          actionTo="/"
        />
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <Card
              key={a.id}
              className={cn(
                'flex flex-col rounded-xl border border-transparent bg-surface p-6 shadow-soft transition-all duration-300',
                'motion-safe:hover:-translate-y-1 hover:border-border/60 hover:shadow-panel',
              )}
            >
              <div className="mb-4 flex flex-wrap gap-2" aria-label={t('page.assessmentList.badgesTitle')}>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-bold text-brandSecondary">
                  {t(`page.assessmentList.themeBadge.${a.theme}`)}
                </span>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-bold text-brandInk">
                  {t(`page.assessmentList.audienceBadge.${a.audience}`)}
                </span>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-bold text-brandSecondary">
                  {t(`page.assessmentList.scenarioBadge.${a.scenario}`)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-text-primary">{t(a.titleKey)}</h2>
              <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">
                {t(a.summaryKey)}
              </p>
              <div className="mb-6 mt-4 space-y-2">
                <MetaRow icon={<IconUsers className="h-4 w-4" />}>
                  {t('common.audience')}: {t(a.audienceKey)}
                </MetaRow>
                <MetaRow icon={<IconClock className="h-4 w-4" />}>
                  {t('common.duration')}: {t(a.durationKey)}
                </MetaRow>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <Link
                  to={`/assessments/${a.id}`}
                  className={buttonStyleClasses('secondary', 'md', 'w-full justify-center rounded-xl')}
                >
                  {t('common.viewDetail')}
                </Link>
                <Link
                  to={`/assessments/${a.id}/answer`}
                  className={buttonStyleClasses('gradient', 'md', 'w-full justify-center rounded-xl')}
                >
                  {t('common.startAssessment')}
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

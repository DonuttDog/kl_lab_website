import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, EmptyState, Input, Select } from '../components/ui';
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{t('page.assessmentList.title')}</h1>
        <p className="mt-2 text-sm text-text-muted">{t('page.assessmentList.subtitle')}</p>
        <p className="mt-1 text-xs text-text-muted">
          {t('page.assessmentList.filterHint')}
        </p>
      </div>

      <Card className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="assessment-search" className="text-sm text-text-muted">
            {t('page.assessmentList.searchLabel')}
          </label>
          <Input
            id="assessment-search"
            type="search"
            placeholder={t('page.assessmentList.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <label className="space-y-1 text-sm text-text-muted">
            <span>{t('page.assessmentList.filterThemeLabel')}</span>
            <Select value={theme} onChange={(e) => setTheme(e.target.value as AssessmentThemeFilter)}>
              <option value="all">{t('page.assessmentList.themeOptionAll')}</option>
              <option value="learning">{t('page.assessmentList.themeOptionLearning')}</option>
              <option value="emotion">{t('page.assessmentList.themeOptionEmotion')}</option>
            </Select>
          </label>
          <label className="space-y-1 text-sm text-text-muted">
            <span>{t('page.assessmentList.filterAudienceLabel')}</span>
            <Select
              value={audience}
              onChange={(e) => setAudience(e.target.value as AssessmentAudienceFilter)}
            >
              <option value="all">{t('page.assessmentList.audienceOptionAll')}</option>
              <option value="k12">{t('page.assessmentList.audienceOptionK12')}</option>
              <option value="teen_parent">{t('page.assessmentList.audienceOptionTeenParent')}</option>
            </Select>
          </label>
          <label className="space-y-1 text-sm text-text-muted">
            <span>{t('page.assessmentList.filterScenarioLabel')}</span>
            <Select
              value={scenario}
              onChange={(e) => setScenario(e.target.value as AssessmentScenarioFilter)}
            >
              <option value="all">{t('page.assessmentList.scenarioOptionAll')}</option>
              <option value="self">{t('page.assessmentList.scenarioOptionSelf')}</option>
              <option value="stress">{t('page.assessmentList.scenarioOptionStress')}</option>
            </Select>
          </label>
        </div>
      </Card>

      {items.length === 0 ? (
        <EmptyState
          title={t('page.assessmentList.emptyTitle')}
          description={t('page.assessmentList.emptyHint')}
          actionLabel={t('common.goHome')}
          actionTo="/"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((a) => (
            <Card key={a.id} className="space-y-3">
              <h2 className="text-lg font-semibold text-text-primary">{t(a.titleKey)}</h2>
              <ul className="flex flex-wrap gap-2" aria-label={t('page.assessmentList.badgesTitle')}>
                <li className="rounded-full border border-border bg-slate-50 px-2 py-1 text-xs text-text-muted">
                  {t(`page.assessmentList.themeBadge.${a.theme}`)}
                </li>
                <li className="rounded-full border border-border bg-slate-50 px-2 py-1 text-xs text-text-muted">
                  {t(`page.assessmentList.audienceBadge.${a.audience}`)}
                </li>
                <li className="rounded-full border border-border bg-slate-50 px-2 py-1 text-xs text-text-muted">
                  {t(`page.assessmentList.scenarioBadge.${a.scenario}`)}
                </li>
              </ul>
              <p className="text-sm text-text-secondary">{t(a.summaryKey)}</p>
              <p className="text-xs text-text-muted">
                {t('common.audience')}: {t(a.audienceKey)}
              </p>
              <p className="text-xs text-text-muted">
                {t('common.duration')}: {t(a.durationKey)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link to={`/assessments/${a.id}`}>
                  <Button variant="secondary">{t('common.viewDetail')}</Button>
                </Link>
                <Link to={`/assessments/${a.id}/answer`}>
                  <Button variant="primary">{t('common.startAssessment')}</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

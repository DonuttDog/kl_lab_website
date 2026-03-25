import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    <div className="stack">
      <div>
        <h1 className="h1">{t('page.assessmentList.title')}</h1>
        <p className="muted">{t('page.assessmentList.subtitle')}</p>
        <p className="muted" style={{ fontSize: '0.875rem' }}>
          {t('page.assessmentList.filterHint')}
        </p>
      </div>

      <div>
        <label htmlFor="assessment-search" style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
          {t('page.assessmentList.searchLabel')}
        </label>
        <input
          id="assessment-search"
          type="search"
          className="search-input"
          placeholder={t('page.assessmentList.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="filters">
        <label>
          {t('page.assessmentList.filterThemeLabel')}
          <select value={theme} onChange={(e) => setTheme(e.target.value as AssessmentThemeFilter)}>
            <option value="all">{t('page.assessmentList.themeOptionAll')}</option>
            <option value="learning">{t('page.assessmentList.themeOptionLearning')}</option>
            <option value="emotion">{t('page.assessmentList.themeOptionEmotion')}</option>
          </select>
        </label>
        <label>
          {t('page.assessmentList.filterAudienceLabel')}
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value as AssessmentAudienceFilter)}
          >
            <option value="all">{t('page.assessmentList.audienceOptionAll')}</option>
            <option value="k12">{t('page.assessmentList.audienceOptionK12')}</option>
            <option value="teen_parent">{t('page.assessmentList.audienceOptionTeenParent')}</option>
          </select>
        </label>
        <label>
          {t('page.assessmentList.filterScenarioLabel')}
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value as AssessmentScenarioFilter)}
          >
            <option value="all">{t('page.assessmentList.scenarioOptionAll')}</option>
            <option value="self">{t('page.assessmentList.scenarioOptionSelf')}</option>
            <option value="stress">{t('page.assessmentList.scenarioOptionStress')}</option>
          </select>
        </label>
      </div>

      {items.length === 0 ? (
        <div className="card">
          <p className="card__title">{t('page.assessmentList.emptyTitle')}</p>
          <p className="muted">{t('page.assessmentList.emptyHint')}</p>
          <Link className="btn" to="/">
            {t('common.goHome')}
          </Link>
        </div>
      ) : (
        <div className="grid-entries">
          {items.map((a) => (
            <article key={a.id} className="card">
              <h2 className="card__title">{t(a.titleKey)}</h2>
              <ul className="tag-list" aria-label={t('page.assessmentList.badgesTitle')}>
                <li className="tag">{t(`page.assessmentList.themeBadge.${a.theme}`)}</li>
                <li className="tag">{t(`page.assessmentList.audienceBadge.${a.audience}`)}</li>
                <li className="tag">{t(`page.assessmentList.scenarioBadge.${a.scenario}`)}</li>
              </ul>
              <p className="muted">{t(a.summaryKey)}</p>
              <p className="card__meta">
                {t('common.audience')}: {t(a.audienceKey)}
              </p>
              <p className="card__meta">
                {t('common.duration')}: {t(a.durationKey)}
              </p>
              <p style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Link className="btn" to={`/assessments/${a.id}`}>
                  {t('common.viewDetail')}
                </Link>
                <Link className="btn btn--primary" to={`/assessments/${a.id}/answer`}>
                  {t('common.startAssessment')}
                </Link>
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

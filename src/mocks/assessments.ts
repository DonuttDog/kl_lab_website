/** 内容主题（与列表筛选下拉一致） */
export type AssessmentTheme = 'learning' | 'emotion';

/** 适用人群分段 */
export type AssessmentAudience = 'k12' | 'teen_parent';

/** 使用场景 */
export type AssessmentScenario = 'self' | 'stress';

export type AssessmentThemeFilter = 'all' | AssessmentTheme;
export type AssessmentAudienceFilter = 'all' | AssessmentAudience;
export type AssessmentScenarioFilter = 'all' | AssessmentScenario;

export type MockAssessment = {
  id: string;
  titleKey: string;
  summaryKey: string;
  durationKey: string;
  audienceKey: string;
  detailBodyKey: string;
  theme: AssessmentTheme;
  audience: AssessmentAudience;
  scenario: AssessmentScenario;
};

export const mockAssessments: MockAssessment[] = [
  {
    id: '1',
    titleKey: 'mock.assessment.a1.title',
    summaryKey: 'mock.assessment.a1.summary',
    durationKey: 'mock.assessment.a1.duration',
    audienceKey: 'mock.assessment.a1.audience',
    detailBodyKey: 'mock.assessment.a1.detailBody',
    theme: 'learning',
    audience: 'k12',
    scenario: 'self',
  },
  {
    id: '2',
    titleKey: 'mock.assessment.a2.title',
    summaryKey: 'mock.assessment.a2.summary',
    durationKey: 'mock.assessment.a2.duration',
    audienceKey: 'mock.assessment.a2.audience',
    detailBodyKey: 'mock.assessment.a2.detailBody',
    theme: 'emotion',
    audience: 'teen_parent',
    scenario: 'stress',
  },
];

export type AssessmentListFilters = {
  theme: AssessmentThemeFilter;
  audience: AssessmentAudienceFilter;
  scenario: AssessmentScenarioFilter;
  search: string;
};

export function listAssessments(
  f: AssessmentListFilters,
  titleText: (key: string) => string,
): MockAssessment[] {
  const q = f.search.trim().toLowerCase();
  return mockAssessments.filter((a) => {
    if (f.theme !== 'all' && a.theme !== f.theme) return false;
    if (f.audience !== 'all' && a.audience !== f.audience) return false;
    if (f.scenario !== 'all' && a.scenario !== f.scenario) return false;
    if (q && !titleText(a.titleKey).toLowerCase().includes(q)) return false;
    return true;
  });
}

export function getAssessmentById(id: string): MockAssessment | undefined {
  return mockAssessments.find((x) => x.id === id);
}

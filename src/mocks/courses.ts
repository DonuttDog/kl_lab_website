export type CourseAudienceFilter = 'all' | 'parent' | 'student';
export type CourseTopicFilter = 'all' | 'family' | 'exam';

export type MockCourse = {
  id: string;
  titleKey: string;
  summaryKey: string;
  audienceKey: string;
  detailBodyKey: string;
  audienceFilter: Exclude<CourseAudienceFilter, 'all'>;
  topicFilter: Exclude<CourseTopicFilter, 'all'>;
};

export const mockCourses: MockCourse[] = [
  {
    id: '1',
    titleKey: 'mock.course.c1.title',
    summaryKey: 'mock.course.c1.summary',
    audienceKey: 'mock.course.c1.audience',
    detailBodyKey: 'mock.course.c1.detailBody',
    audienceFilter: 'parent',
    topicFilter: 'family',
  },
  {
    id: '2',
    titleKey: 'mock.course.c2.title',
    summaryKey: 'mock.course.c2.summary',
    audienceKey: 'mock.course.c2.audience',
    detailBodyKey: 'mock.course.c2.detailBody',
    audienceFilter: 'student',
    topicFilter: 'exam',
  },
];

export function listCourses(filters: {
  audience: CourseAudienceFilter;
  topic: CourseTopicFilter;
}): MockCourse[] {
  return mockCourses.filter((c) => {
    const okA = filters.audience === 'all' || c.audienceFilter === filters.audience;
    const okT = filters.topic === 'all' || c.topicFilter === filters.topic;
    return okA && okT;
  });
}

export function getCourseById(id: string): MockCourse | undefined {
  return mockCourses.find((c) => c.id === id);
}

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AssessmentAnswerPage } from '../pages/AssessmentAnswerPage';
import { AssessmentDetailPage } from '../pages/AssessmentDetailPage';
import { AssessmentListPage } from '../pages/AssessmentListPage';
import { CourseDetailPage } from '../pages/CourseDetailPage';
import { CourseListPage } from '../pages/CourseListPage';
import { HomePage } from '../pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'assessments', element: <AssessmentListPage /> },
      { path: 'assessments/:id', element: <AssessmentDetailPage /> },
      { path: 'courses', element: <CourseListPage /> },
      { path: 'courses/:id', element: <CourseDetailPage /> },
    ],
  },
  {
    path: '/assessments/:id/answer',
    element: <AssessmentAnswerPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

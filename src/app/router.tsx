import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AssessmentAnswerPage } from '../pages/AssessmentAnswerPage';
import { AssessmentDetailPage } from '../pages/AssessmentDetailPage';
import { AssessmentListPage } from '../pages/AssessmentListPage';
import { CourseDetailPage } from '../pages/CourseDetailPage';
import { CourseListPage } from '../pages/CourseListPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { RegisterPage } from '../pages/RegisterPage';

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
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'profile', element: <ProfilePage /> },
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

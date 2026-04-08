import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../HomePage';
import { AssessmentListPage } from '../AssessmentListPage';
import { CourseListPage } from '../CourseListPage';

function renderWithRoute(path: string, ui: ReactElement) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('page smoke', () => {
  it('renders home with hero and product features anchor', () => {
    renderWithRoute('/', <HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(document.getElementById('product-features')).toBeTruthy();
    expect(screen.getByRole('link', { name: /开始专业测评/i })).toHaveAttribute('href', '/assessments');
  });

  it('renders assessment list with filters and cards', () => {
    renderWithRoute('/assessments', <AssessmentListPage />);
    expect(screen.getByRole('heading', { name: /心理测评/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders course list', () => {
    renderWithRoute('/courses', <CourseListPage />);
    expect(screen.getByRole('heading', { name: /课程/i, level: 1 })).toBeInTheDocument();
  });
});

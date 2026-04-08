import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SiteHeader } from '../SiteHeader';

function renderHeader(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SiteHeader />
    </MemoryRouter>,
  );
}

describe('SiteHeader', () => {
  it('marks assessments nav trigger when on /assessments', () => {
    renderHeader('/assessments');
    const trigger = screen.getByRole('button', { name: /心理测评/i });
    expect(trigger).toHaveAttribute('aria-current', 'page');
  });

  it('marks mall nav trigger when on /courses', () => {
    renderHeader('/courses');
    const trigger = screen.getByRole('button', { name: /商城/i });
    expect(trigger).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark assessments trigger on home', () => {
    renderHeader('/');
    const trigger = screen.getByRole('button', { name: /心理测评/i });
    expect(trigger).not.toHaveAttribute('aria-current');
  });

  it('uses gradient CTA and signature avatar styles', () => {
    renderHeader('/');
    const cta = screen.getByRole('link', { name: /开始测评/i });
    expect(cta.className).toMatch(/signature-gradient/);
    const avatar = screen.getByRole('button', { name: 'T' });
    expect(avatar.className).toMatch(/signature-gradient/);
    expect(avatar.className).toMatch(/ring-brand/);
  });
});

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buttonStyleClasses } from '../ui/Button';
import { cn } from '../ui/utils';

type DropdownId = 'assessments' | 'mall' | 'profile' | null;

function IconMenu({ open }: { open: boolean }) {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

export function SiteHeader() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const assessmentsActive = pathname.startsWith('/assessments');
  const coursesActive = pathname.startsWith('/courses');
  const [open, setOpen] = useState<DropdownId>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(null);
        setMobileNavOpen(false);
      }
    };
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(null);
        setMobileNavOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  const linkClass =
    'block rounded-md px-3 py-2 text-sm text-text-secondary transition hover:bg-slate-100 hover:text-text-primary';

  const mobileLinkClass =
    'block w-full rounded-md px-3 py-3 text-left text-sm text-text-secondary transition hover:bg-slate-100 hover:text-text-primary';

  const navTriggerClass = (active: boolean) =>
    cn(
      'inline-flex items-center gap-1 rounded-md border-b-2 px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
      active
        ? 'border-brandInk font-semibold text-brandInk hover:bg-slate-50'
        : 'border-transparent text-text-secondary hover:bg-slate-100 hover:text-text-primary',
    );

  const closeAllMenus = () => {
    setOpen(null);
    setMobileNavOpen(false);
  };

  const profileMenu = (
    <ul className="py-1 text-sm text-text-secondary">
      <li>
        <Link className={mobileLinkClass} to="/profile" onClick={closeAllMenus}>
          {t('header.userCenter')}
        </Link>
      </li>
      <li>
        <button
          type="button"
          className={`${mobileLinkClass} w-full`}
          onClick={() => {
            window.alert(t('header.updateLogToast'));
            closeAllMenus();
          }}
        >
          {t('header.updateLog')}
        </button>
      </li>
      <li>
        <a className={mobileLinkClass} href="https://pixso.cn" target="_blank" rel="noreferrer" onClick={closeAllMenus}>
          {t('header.visitWebsite')}
        </a>
      </li>
      <li>
        <button
          type="button"
          className={`${mobileLinkClass} w-full`}
          onClick={() => {
            toggleTheme();
            closeAllMenus();
          }}
        >
          {isDark ? t('header.switchLight') : t('header.switchDark')}
        </button>
      </li>
      <li className="mt-1 border-t border-border pt-1">
        <button
          type="button"
          className="block w-full rounded-md px-3 py-3 text-left text-sm text-danger transition hover:bg-rose-50"
          onClick={() => {
            window.alert(t('header.logoutToast'));
            closeAllMenus();
          }}
        >
          {t('header.logout')}
        </button>
      </li>
    </ul>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/90 shadow-[0_4px_20px_rgba(0,105,112,0.06)] backdrop-blur-md">
      <div
        ref={headerRef}
        className="relative mx-auto flex w-full max-w-content min-h-16 items-center gap-2 px-3 sm:px-4 md:gap-4 md:px-6"
      >
        <Link
          className="min-w-0 flex-1 truncate text-sm font-semibold text-text-primary sm:text-base md:max-w-none md:flex-none md:whitespace-nowrap md:text-base"
          to="/"
        >
          {t('app.brandName')}
        </Link>

        {/* Desktop primary nav */}
        <nav
          className="hidden min-h-10 flex-1 items-center gap-1 overflow-x-auto overflow-y-hidden md:flex md:overflow-visible"
          aria-label="primary"
        >
          <div
            className="relative"
            onMouseEnter={() => {
              clearCloseTimer();
              setOpen('assessments');
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={navTriggerClass(assessmentsActive)}
              aria-expanded={open === 'assessments'}
              aria-haspopup="true"
              aria-current={assessmentsActive ? 'page' : undefined}
              onClick={() => setOpen((v) => (v === 'assessments' ? null : 'assessments'))}
            >
              {t('header.assessmentsMenuLabel')}
              <span aria-hidden>⌄</span>
            </button>
            {open === 'assessments' ? (
              <div
                className="absolute left-0 top-full z-40 mt-1 min-w-56 rounded-md border border-border bg-surface p-2 shadow-panel"
                role="menu"
              >
                <p className="px-3 py-2 text-xs text-text-muted">{t('header.dropdownPreviewHint')}</p>
                <Link className={linkClass} to="/assessments" role="menuitem" onClick={() => setOpen(null)}>
                  {t('header.goToAssessmentList')}
                </Link>
                <Link className={linkClass} to="/assessments/1" role="menuitem" onClick={() => setOpen(null)}>
                  {t('mock.headerPreview.assessment1')}
                </Link>
                <Link className={linkClass} to="/assessments/2" role="menuitem" onClick={() => setOpen(null)}>
                  {t('mock.headerPreview.assessment2')}
                </Link>
              </div>
            ) : null}
          </div>

          <div
            className="relative"
            onMouseEnter={() => {
              clearCloseTimer();
              setOpen('mall');
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={navTriggerClass(coursesActive)}
              aria-expanded={open === 'mall'}
              aria-haspopup="true"
              aria-current={coursesActive ? 'page' : undefined}
              onClick={() => setOpen((v) => (v === 'mall' ? null : 'mall'))}
            >
              {t('header.mallMenuLabel')}
              <span aria-hidden>⌄</span>
            </button>
            {open === 'mall' ? (
              <div
                className="absolute left-0 top-full z-40 mt-1 min-w-56 rounded-md border border-border bg-surface p-2 shadow-panel"
                role="menu"
              >
                <p className="px-3 py-2 text-xs text-text-muted">{t('header.dropdownPreviewHint')}</p>
                <Link className={linkClass} to="/courses" role="menuitem" onClick={() => setOpen(null)}>
                  {t('header.goToCourseList')}
                </Link>
                <Link className={linkClass} to="/courses/1" role="menuitem" onClick={() => setOpen(null)}>
                  {t('mock.headerPreview.course1')}
                </Link>
                <Link className={linkClass} to="/courses/2" role="menuitem" onClick={() => setOpen(null)}>
                  {t('mock.headerPreview.course2')}
                </Link>
              </div>
            ) : null}
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            className="rounded-md px-3 py-2 text-sm text-text-secondary transition hover:bg-slate-100 hover:text-text-primary"
            to="/login"
          >
            {t('nav.login')}
          </Link>
          <Link
            to="/assessments"
            className={buttonStyleClasses(
              'gradient',
              'md',
              'rounded-xl font-semibold shadow-sm hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand',
            )}
          >
            {t('nav.startAssessment')}
          </Link>

          <div className="relative">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-signature-gradient text-sm font-semibold text-white ring-2 ring-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-haspopup="true"
              aria-expanded={open === 'profile'}
              onClick={() => setOpen((v) => (v === 'profile' ? null : 'profile'))}
            >
              T
            </button>
            {open === 'profile' ? (
              <div className="absolute right-0 top-full z-40 mt-2 w-56 overflow-hidden rounded-md border border-border bg-surface shadow-panel">
                <ul className="py-2 text-sm text-text-secondary">
                  <li>
                    <Link className={linkClass} to="/profile" onClick={() => setOpen(null)}>
                      {t('header.userCenter')}
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`${linkClass} w-full text-left`}
                      onClick={() => {
                        window.alert(t('header.updateLogToast'));
                        setOpen(null);
                      }}
                    >
                      {t('header.updateLog')}
                    </button>
                  </li>
                  <li>
                    <a className={linkClass} href="https://pixso.cn" target="_blank" rel="noreferrer">
                      {t('header.visitWebsite')}
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`${linkClass} w-full text-left`}
                      onClick={() => {
                        toggleTheme();
                        setOpen(null);
                      }}
                    >
                      {isDark ? t('header.switchLight') : t('header.switchDark')}
                    </button>
                  </li>
                  <li className="mt-1 border-t border-border pt-1">
                    <button
                      type="button"
                      className="block w-full rounded-md px-3 py-2 text-left text-sm text-danger transition hover:bg-rose-50"
                      onClick={() => {
                        window.alert(t('header.logoutToast'));
                        setOpen(null);
                      }}
                    >
                      {t('header.logout')}
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-text-primary transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-primary-nav"
          aria-label={mobileNavOpen ? t('header.mobileMenuClose') : t('header.mobileMenuOpen')}
          onClick={() => {
            setOpen(null);
            setMobileNavOpen((v) => !v);
          }}
        >
          <IconMenu open={mobileNavOpen} />
        </button>

        {/* Mobile full-width panel */}
        {mobileNavOpen ? (
          <div
            id="mobile-primary-nav"
            className="absolute left-0 right-0 top-full z-50 max-h-[min(85vh,32rem)] overflow-y-auto border-b border-border bg-surface shadow-lg md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('header.mobileNavAriaLabel')}
          >
            <div className="px-4 pb-4 pt-2">
              <p className="px-1 pb-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                {t('header.navSectionAssessments')}
              </p>
              <Link className={mobileLinkClass} to="/assessments" onClick={closeAllMenus}>
                {t('header.goToAssessmentList')}
              </Link>
              <Link className={mobileLinkClass} to="/assessments/1" onClick={closeAllMenus}>
                {t('mock.headerPreview.assessment1')}
              </Link>
              <Link className={mobileLinkClass} to="/assessments/2" onClick={closeAllMenus}>
                {t('mock.headerPreview.assessment2')}
              </Link>

              <p className="mt-4 px-1 pb-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                {t('header.navSectionMall')}
              </p>
              <Link className={mobileLinkClass} to="/courses" onClick={closeAllMenus}>
                {t('header.goToCourseList')}
              </Link>
              <Link className={mobileLinkClass} to="/courses/1" onClick={closeAllMenus}>
                {t('mock.headerPreview.course1')}
              </Link>
              <Link className={mobileLinkClass} to="/courses/2" onClick={closeAllMenus}>
                {t('mock.headerPreview.course2')}
              </Link>

              <div className="my-3 border-t border-border" />

              <Link className={mobileLinkClass} to="/login" onClick={closeAllMenus}>
                {t('nav.login')}
              </Link>
              <Link
                to="/assessments"
                onClick={closeAllMenus}
                className={cn(
                  buttonStyleClasses(
                    'gradient',
                    'md',
                    'mt-2 w-full justify-center rounded-xl font-semibold shadow-sm',
                  ),
                )}
              >
                {t('nav.startAssessment')}
              </Link>

              <div className="my-3 border-t border-border" />
              {profileMenu}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

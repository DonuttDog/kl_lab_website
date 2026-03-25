import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type DropdownId = 'assessments' | 'mall' | null;

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<DropdownId>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="site-header__brand" to="/">
          {t('app.brandName')}
        </Link>

        <nav className="site-header__nav" aria-label="primary">
          <div
            className="dropdown"
            onMouseEnter={() => {
              clearCloseTimer();
              setOpen('assessments');
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className="dropdown__trigger"
              aria-expanded={open === 'assessments'}
              aria-haspopup="true"
              onClick={() => setOpen((v) => (v === 'assessments' ? null : 'assessments'))}
            >
              {t('header.assessmentsMenuLabel')}
              <span aria-hidden>▾</span>
            </button>
            {open === 'assessments' ? (
              <div className="dropdown__panel" role="menu">
                <div className="dropdown__hint">{t('header.dropdownPreviewHint')}</div>
                <Link className="dropdown__link" to="/assessments" role="menuitem">
                  {t('header.goToAssessmentList')}
                </Link>
                <Link className="dropdown__link" to="/assessments/1" role="menuitem">
                  {t('mock.headerPreview.assessment1')}
                </Link>
                <Link className="dropdown__link" to="/assessments/2" role="menuitem">
                  {t('mock.headerPreview.assessment2')}
                </Link>
              </div>
            ) : null}
          </div>

          <div
            className="dropdown"
            onMouseEnter={() => {
              clearCloseTimer();
              setOpen('mall');
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className="dropdown__trigger"
              aria-expanded={open === 'mall'}
              aria-haspopup="true"
              onClick={() => setOpen((v) => (v === 'mall' ? null : 'mall'))}
            >
              {t('header.mallMenuLabel')}
              <span aria-hidden>▾</span>
            </button>
            {open === 'mall' ? (
              <div className="dropdown__panel" role="menu">
                <div className="dropdown__hint">{t('header.dropdownPreviewHint')}</div>
                <Link className="dropdown__link" to="/courses" role="menuitem">
                  {t('header.goToCourseList')}
                </Link>
                <Link className="dropdown__link" to="/courses/1" role="menuitem">
                  {t('mock.headerPreview.course1')}
                </Link>
                <Link className="dropdown__link" to="/courses/2" role="menuitem">
                  {t('mock.headerPreview.course2')}
                </Link>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="site-header__actions">
          <button type="button" className="btn btn--ghost">
            {t('nav.login')}
          </button>
          <Link className="btn btn--primary" to="/assessments">
            {t('nav.startAssessment')}
          </Link>
        </div>
      </div>
    </header>
  );
}

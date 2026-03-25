import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getAssessmentById } from '../mocks/assessments';

const TOTAL_PLACEHOLDER = 12;

export function AssessmentAnswerPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const item = id ? getAssessmentById(id) : undefined;
  const [current, setCurrent] = useState(1);

  const titleText = item
    ? `${t(item.titleKey)} · ${t('page.assessmentAnswer.progress', { current, total: TOTAL_PLACEHOLDER })}`
    : t('page.assessmentDetail.notFoundTitle');
  useDocumentTitle(`${titleText} · ${t('app.documentTitleSuffix')}`);

  const onExit = () => {
    if (window.confirm(t('page.assessmentAnswer.exitConfirm'))) {
      if (item) navigate(`/assessments/${item.id}`);
      else navigate('/assessments');
    }
  };

  const onSubmit = () => {
    window.alert(t('page.assessmentAnswer.submitToast'));
    navigate(item ? `/assessments/${item.id}` : '/assessments');
  };

  if (!item) {
    return (
      <div className="answer-shell">
        <p className="h1">{t('page.assessmentDetail.notFoundTitle')}</p>
        <Link className="btn" to="/assessments">
          {t('common.backToList')}
        </Link>
      </div>
    );
  }

  const isLast = current >= TOTAL_PLACEHOLDER;

  return (
    <div className="answer-shell">
      <div className="answer-bar">
        <strong>{t(item.titleKey)}</strong>
        <button type="button" className="btn btn--ghost" onClick={onExit}>
          {t('page.assessmentAnswer.exit')}
        </button>
      </div>

      <p className="muted">
        {t('page.assessmentAnswer.progress', { current, total: TOTAL_PLACEHOLDER })}
      </p>

      <section>
        <p>{t('page.assessmentAnswer.questionPlaceholder')}</p>
        <div className="options" role="radiogroup" aria-label={t('page.assessmentAnswer.questionPlaceholder')}>
          <label className="option">
            <input type="radio" name="opt" defaultChecked />
            {t('page.assessmentAnswer.optionA')}
          </label>
          <label className="option">
            <input type="radio" name="opt" />
            {t('page.assessmentAnswer.optionB')}
          </label>
          <label className="option">
            <input type="radio" name="opt" />
            {t('page.assessmentAnswer.optionC')}
          </label>
        </div>
      </section>

      <div className="answer-actions">
        <button
          type="button"
          className="btn"
          disabled={current <= 1}
          onClick={() => setCurrent((c) => Math.max(1, c - 1))}
        >
          {t('page.assessmentAnswer.prev')}
        </button>
        {isLast ? (
          <button type="button" className="btn btn--primary" onClick={onSubmit}>
            {t('page.assessmentAnswer.submit')}
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={() => setCurrent((c) => c + 1)}>
            {t('page.assessmentAnswer.next')}
          </button>
        )}
      </div>
    </div>
  );
}

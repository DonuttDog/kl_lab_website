import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AssessmentScale } from '../components/assessment/AssessmentScale';
import { Button, Card, Modal } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import { getAssessmentById } from '../mocks/assessments';

const TOTAL_PLACEHOLDER = 12;

export function AssessmentAnswerPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const item = id ? getAssessmentById(id) : undefined;
  const [current, setCurrent] = useState(1);
  const [choice, setChoice] = useState<string>('A');
  const [scaleValue, setScaleValue] = useState<number | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const titleText = item
    ? `${t(item.titleKey)} · ${t('page.assessmentAnswer.progress', { current, total: TOTAL_PLACEHOLDER })}`
    : t('page.assessmentDetail.notFoundTitle');
  useDocumentTitle(`${titleText} · ${t('app.documentTitleSuffix')}`);

  const onExit = () => setShowExitModal(true);

  const confirmExit = () => {
    setShowExitModal(false);
    if (item) navigate(`/assessments/${item.id}`);
    else navigate('/assessments');
  };

  const onSubmit = () => {
    showToast(t('page.assessmentAnswer.submitToast'), 'success');
    navigate(item ? `/assessments/${item.id}` : '/assessments');
  };

  if (!item) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-4 px-4 py-6">
        <p className="text-3xl font-bold text-text-primary">{t('page.assessmentDetail.notFoundTitle')}</p>
        <Link to="/assessments">
          <Button variant="secondary">{t('common.backToList')}</Button>
        </Link>
      </div>
    );
  }

  const isLast = current >= TOTAL_PLACEHOLDER;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-6 md:px-6">
      <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-4 py-3">
        <strong className="text-sm text-text-primary md:text-base">{t(item.titleKey)}</strong>
        <Button variant="ghost" onClick={onExit}>
          {t('page.assessmentAnswer.exit')}
        </Button>
      </div>

      <p className="text-sm text-text-muted">
        {t('page.assessmentAnswer.progress', { current, total: TOTAL_PLACEHOLDER })}
      </p>

      <Card className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-text-primary">
            Q{current}. {t('page.assessmentAnswer.questionPlaceholder')}
          </p>
          <div className="space-y-2" role="radiogroup" aria-label={t('page.assessmentAnswer.questionPlaceholder')}>
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-secondary hover:bg-slate-50">
              <input
                type="radio"
                name="opt"
                checked={choice === 'A'}
                onChange={() => setChoice('A')}
              />
              {t('page.assessmentAnswer.optionA')}
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-secondary hover:bg-slate-50">
              <input
                type="radio"
                name="opt"
                checked={choice === 'B'}
                onChange={() => setChoice('B')}
              />
              {t('page.assessmentAnswer.optionB')}
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-secondary hover:bg-slate-50">
              <input
                type="radio"
                name="opt"
                checked={choice === 'C'}
                onChange={() => setChoice('C')}
              />
              {t('page.assessmentAnswer.optionC')}
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-text-primary">
            Q{current + 1}. {t('page.assessmentAnswer.scaleQuestion')}
          </p>
          <AssessmentScale
            scaleCount={7}
            value={scaleValue}
            onChange={setScaleValue}
            leftLabel={t('page.assessmentAnswer.scaleLeft')}
            rightLabel={t('page.assessmentAnswer.scaleRight')}
          />
          <p className="text-xs text-text-muted">{t('page.assessmentAnswer.scaleHint')}</p>
        </div>
      </Card>

      <div className="mt-auto flex justify-between gap-3">
        <Button
          variant="secondary"
          disabled={current <= 1}
          onClick={() => setCurrent((c) => Math.max(1, c - 1))}
        >
          {t('page.assessmentAnswer.prev')}
        </Button>
        {isLast ? (
          <Button variant="primary" onClick={onSubmit}>
            {t('page.assessmentAnswer.submit')}
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setCurrent((c) => c + 1)}>
            {t('page.assessmentAnswer.next')}
          </Button>
        )}
      </div>

      {/* 退出确认 Modal */}
      <Modal
        open={showExitModal}
        onClose={() => setShowExitModal(false)}
        title={t('page.assessmentAnswer.exitConfirmTitle')}
        description={t('page.assessmentAnswer.exitConfirm')}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowExitModal(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="danger" onClick={confirmExit}>
              {t('common.confirm')}
            </Button>
          </>
        }
      />
    </div>
  );
}

import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const title = `${t('page.auth.registerTitle')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(title);

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!account.trim() || !password.trim() || !confirmPassword.trim()) {
      window.alert(t('page.auth.fillRequiredToast'));
      return;
    }
    if (password !== confirmPassword) {
      window.alert(t('page.auth.passwordMismatchToast'));
      return;
    }
    window.alert(t('page.auth.registerSuccessToast'));
    navigate('/login');
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      <Card className="space-y-6 p-6 md:p-7">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{t('page.auth.registerTitle')}</h1>
          <p className="mt-2 text-sm text-text-muted">{t('page.auth.mockHint')}</p>
          <p className="mt-1 text-xs text-text-muted">{t('page.auth.registerAccountOnlyHint')}</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-1">
            <span className="text-sm text-text-muted">{t('page.auth.accountLabel')}</span>
            <Input
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder={t('page.auth.accountPlaceholder')}
              autoComplete="username"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm text-text-muted">{t('page.auth.passwordLabel')}</span>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('page.auth.passwordPlaceholder')}
              autoComplete="new-password"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm text-text-muted">{t('page.auth.confirmPasswordLabel')}</span>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t('page.auth.confirmPasswordPlaceholder')}
              autoComplete="new-password"
            />
          </label>

          <Button type="submit" variant="primary" fullWidth>
            {t('page.auth.registerAction')}
          </Button>
        </form>

        <p className="text-sm text-text-secondary">
          {t('page.auth.haveAccount')}{' '}
          <Link className="font-medium text-brand hover:text-brand-hover" to="/login">
            {t('page.auth.toLogin')}
          </Link>
        </p>
      </Card>
    </div>
  );
}

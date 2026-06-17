import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const title = `${t('page.auth.loginTitle')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(title);

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!account.trim() || !password.trim()) {
      showToast(t('page.auth.fillRequiredToast'), 'warning');
      return;
    }
    showToast(t('page.auth.loginSuccessToast'), 'success');
    navigate('/profile');
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      <Card className="space-y-6 p-6 md:p-7">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{t('page.auth.loginTitle')}</h1>
          <p className="mt-2 text-sm text-text-muted">{t('page.auth.mockHint')}</p>
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
              autoComplete="current-password"
            />
          </label>

          <Button type="submit" variant="primary" fullWidth>
            {t('page.auth.loginAction')}
          </Button>
        </form>

        <p className="text-sm text-text-secondary">
          {t('page.auth.noAccount')}{' '}
          <Link className="font-medium text-brand hover:text-brand-hover" to="/register">
            {t('page.auth.toRegister')}
          </Link>
        </p>
      </Card>
    </div>
  );
}

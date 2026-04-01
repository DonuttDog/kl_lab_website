import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Toast } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type ProfileTab = 'settings' | 'wallet' | 'orders';

type MockProfile = {
  name: string;
  userId: string;
  phone: string;
  wechatBound: boolean;
  emailBound: boolean;
  verified: boolean;
};

const INITIAL_PROFILE: MockProfile = {
  name: 'T同学',
  userId: 'U-102493',
  phone: '123 4567 8900',
  wechatBound: true,
  emailBound: false,
  verified: false,
};

export function ProfilePage() {
  const { t } = useTranslation();
  const title = `${t('page.profile.title')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(title);

  const [activeTab, setActiveTab] = useState<ProfileTab>('settings');
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const wechatText = useMemo(
    () => (profile.wechatBound ? t('page.profile.bound') : t('page.profile.unbound')),
    [profile.wechatBound, t],
  );
  const emailText = useMemo(
    () => (profile.emailBound ? t('page.profile.bound') : t('page.profile.unbound')),
    [profile.emailBound, t],
  );
  const verifyText = useMemo(
    () => (profile.verified ? t('page.profile.verified') : t('page.profile.unverified')),
    [profile.verified, t],
  );

  const copyUserId = async () => {
    try {
      await navigator.clipboard.writeText(profile.userId);
    } catch {
      // Keep mock flow resilient in non-secure contexts.
    }
    setToastMessage(t('page.profile.toastCopied'));
  };

  const updateField = (field: 'name' | 'phone') => {
    const next = window.prompt(
      field === 'name' ? t('page.profile.promptName') : t('page.profile.promptPhone'),
      profile[field],
    );
    if (!next?.trim()) return;
    setProfile((prev) => ({ ...prev, [field]: next.trim() }));
    setToastMessage(t('page.profile.toastSaved'));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{t('page.profile.title')}</h1>
        <p className="mt-2 text-sm text-text-muted">{t('page.profile.mockHint')}</p>
      </div>

      {toastMessage ? <Toast message={toastMessage} variant="info" /> : null}

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <Card className="h-fit p-2">
          <nav className="space-y-1" aria-label={t('page.profile.title')}>
            <button
              type="button"
              className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                activeTab === 'settings'
                  ? 'bg-slate-100 font-semibold text-text-primary'
                  : 'text-text-secondary hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              {t('page.profile.tabSettings')}
            </button>
            <button
              type="button"
              className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                activeTab === 'wallet'
                  ? 'bg-slate-100 font-semibold text-text-primary'
                  : 'text-text-secondary hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('wallet')}
            >
              {t('page.profile.tabWallet')}
            </button>
            <button
              type="button"
              className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                activeTab === 'orders'
                  ? 'bg-slate-100 font-semibold text-text-primary'
                  : 'text-text-secondary hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              {t('page.profile.tabOrders')}
            </button>
          </nav>
        </Card>

        <Card className="space-y-5">
          {activeTab !== 'settings' ? (
            <div className="rounded-md border border-dashed border-border bg-slate-50 p-5 text-sm text-text-muted">
              {t('page.profile.tabPlaceholder')}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-4 border-b border-border pb-5">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white">
                  T
                </div>
                <div className="space-y-1">
                  <Button variant="secondary" size="sm">
                    {t('page.profile.changeAvatar')}
                  </Button>
                  <p className="text-xs text-text-muted">{t('page.profile.avatarHint')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <FieldRow
                  label={t('page.profile.fieldName')}
                  value={profile.name}
                  actions={
                    <Button size="sm" variant="secondary" onClick={() => updateField('name')}>
                      {t('page.profile.actionEdit')}
                    </Button>
                  }
                />
                <FieldRow
                  label={t('page.profile.fieldId')}
                  value={profile.userId}
                  actions={
                    <Button size="sm" variant="secondary" onClick={copyUserId}>
                      {t('page.profile.actionCopy')}
                    </Button>
                  }
                />
                <FieldRow
                  label={t('page.profile.fieldPhone')}
                  value={profile.phone}
                  actions={
                    <Button size="sm" variant="secondary" onClick={() => updateField('phone')}>
                      {t('page.profile.actionChange')}
                    </Button>
                  }
                />
                <FieldRow
                  label={t('page.profile.fieldWechat')}
                  value={wechatText}
                  actions={
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        {t('page.profile.actionChange')}
                      </Button>
                      <Button size="sm" variant="secondary">
                        {t('page.profile.actionUnbind')}
                      </Button>
                    </div>
                  }
                />
                <FieldRow
                  label={t('page.profile.fieldEmail')}
                  value={emailText}
                  actions={
                    <Button size="sm" variant="secondary">
                      {profile.emailBound ? t('page.profile.actionChange') : t('page.profile.actionBind')}
                    </Button>
                  }
                />
                <FieldRow
                  label={t('page.profile.fieldVerify')}
                  value={verifyText}
                  actions={
                    <Button size="sm" variant="secondary">
                      {t('page.profile.actionView')}
                    </Button>
                  }
                />
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function FieldRow({ label, value, actions }: { label: string; value: string; actions: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border pb-4 last:border-b-0">
      <div className="min-w-[120px] text-sm font-medium text-text-primary">{label}</div>
      <div className="flex-1 text-sm text-text-secondary">{value}</div>
      <div className="ml-auto">{actions}</div>
    </div>
  );
}

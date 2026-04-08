import { useTranslation } from 'react-i18next';

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-surfaceMuted/80">
      <div className="mx-auto w-full max-w-content px-4 py-6 text-center text-sm text-text-muted md:px-6">
        {t('footer.copyright')}
      </div>
    </footer>
  );
}

import { useTranslation } from 'react-i18next';

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="site-footer">
      <div className="container">{t('footer.copyright')}</div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function HomePage() {
  const { t } = useTranslation();
  const title = `${t('page.home.title')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(title);

  return (
    <div className="stack stack--lg">
      <section className="hero">
        <h1 className="hero__title">{t('page.home.heroTitle')}</h1>
        <p className="hero__subtitle">{t('page.home.heroSubtitle')}</p>
      </section>

      <section className="entry-row">
        <div className="card">
          <h2 className="h2">{t('page.home.entryAssessmentsTitle')}</h2>
          <p className="muted">{t('page.home.entryAssessmentsDesc')}</p>
          <p>
            <Link className="btn btn--primary" to="/assessments">
              {t('page.home.entryAssessmentsTitle')}
            </Link>
          </p>
        </div>
        <div className="card">
          <h2 className="h2">{t('page.home.entryCoursesTitle')}</h2>
          <p className="muted">{t('page.home.entryCoursesDesc')}</p>
          <p>
            <Link className="btn" to="/courses">
              {t('page.home.entryCoursesTitle')}
            </Link>
          </p>
        </div>
      </section>

      <section className="features">
        <h2 className="h2">{t('page.home.featuresTitle')}</h2>
        <ul>
          <li>{t('page.home.feature1')}</li>
          <li>{t('page.home.feature2')}</li>
          <li>{t('page.home.feature3')}</li>
        </ul>
      </section>
    </div>
  );
}

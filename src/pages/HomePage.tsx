import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui';
import { SectionHeading } from '../components/layout/SectionHeading';
import { buttonStyleClasses } from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const ENTRY_IMG_ASSESSMENT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQxSUFE2HK43WT16yus_zK4AQFcq2oOm2goh0xFQ0bfmSSRlJDlZMp2fbVO1u6CbWTKxz8_BxIOWX54EjBqG3RHjMTrm_nj6JFE_2QyDJmO27Ydn6yrkgp4kkjqKMMlqd9_TUiRankMWdFE9LgC4JR-u9E6qJ7bb017bsdxNL0f6ORCjxWnsO8FjkenRf0hr_4sEeapGs0JxQCMAOSvTyCb_HKwR9VSsCEpg1L2Gqggv-JQOeJeH0WhkCYw8OgDDQGoQLkinwQMac';

const ENTRY_IMG_COURSE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDZaQJEloRJaLaRNjbCeCjmqbNpVb0lgxu0LrjSAImUp4fSeaKxc7UNmAgMkPo1SwnsoPUQq3HYzRLuk3tgT5fLvTcaWXLLql8Yln-EW20_0s9pAs7YegD9D3DbC9B1HTUjp9ptrFWkcWEY7W7bJuyZQWNGh0EWwpHT006ymReS0yke22V7NEy9RBA4XQ03HckKheiyRzN16CwsiCpKuBd4plhLp5MlBBQBPUNnR-eWasbdb_02_G7WMUlUT16K-T8NefZYMn_J4l8';

function IconFeatureVerified({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFeatureShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 4v5c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V7l8-4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFeatureSpark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  const title = `${t('page.home.title')} · ${t('app.documentTitleSuffix')}`;
  useDocumentTitle(title);

  const features = [
    {
      Icon: IconFeatureVerified,
      title: t('page.home.featureTitle1'),
      body: t('page.home.featureBody1'),
    },
    {
      Icon: IconFeatureShield,
      title: t('page.home.featureTitle2'),
      body: t('page.home.featureBody2'),
    },
    {
      Icon: IconFeatureSpark,
      title: t('page.home.featureTitle3'),
      body: t('page.home.featureBody3'),
    },
  ] as const;

  return (
    <div className="space-y-12 md:space-y-16">
      <section className="relative overflow-hidden rounded-xl border border-border bg-surface px-4 py-12 text-center shadow-soft md:px-8 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/[0.07] via-transparent to-brandInk/[0.04]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl">
          <span className="mb-6 inline-block rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-medium tracking-widest text-brandInk">
            {t('page.home.heroBadge')}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-5xl md:leading-tight">
            {t('page.home.heroTitleLead')}
            <span className="text-brand italic"> {t('page.home.heroTitleAccent')}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
            {t('page.home.heroSubtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/assessments"
              className={buttonStyleClasses('gradient', 'lg', 'rounded-xl px-8 py-4 text-base font-bold shadow-lg')}
            >
              {t('page.home.heroCtaPrimary')}
            </Link>
            <Link
              to="/#product-features"
              className={buttonStyleClasses(
                'secondary',
                'lg',
                'rounded-xl border-border/80 bg-surface px-8 py-4 text-base font-bold shadow-sm',
              )}
            >
              {t('page.home.heroCtaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-entries-heading">
        <h2 id="home-entries-heading" className="sr-only">
          {t('page.home.entriesSectionTitle')}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="group overflow-hidden border border-border/80 p-0 shadow-soft transition-[box-shadow,transform] duration-300 motion-safe:hover:-translate-y-1 hover:shadow-panel">
            <div className="aspect-video overflow-hidden">
              <img
                src={ENTRY_IMG_ASSESSMENT}
                alt={t('page.home.entryImageAssessmentsAlt')}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="space-y-4 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-text-primary">{t('page.home.entryAssessmentsTitle')}</h3>
              <p className="leading-relaxed text-text-secondary">{t('page.home.entryAssessmentsDesc')}</p>
              <Link
                to="/assessments"
                className="inline-flex items-center font-bold text-brand hover:underline hover:decoration-2 hover:underline-offset-8"
              >
                {t('page.home.entryAssessmentsLink')}
                <span className="ml-2" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </Card>
          <Card className="group overflow-hidden border border-border/80 p-0 shadow-soft transition-[box-shadow,transform] duration-300 motion-safe:hover:-translate-y-1 hover:shadow-panel">
            <div className="aspect-video overflow-hidden">
              <img
                src={ENTRY_IMG_COURSE}
                alt={t('page.home.entryImageCoursesAlt')}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="space-y-4 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-text-primary">{t('page.home.entryCoursesTitle')}</h3>
              <p className="leading-relaxed text-text-secondary">{t('page.home.entryCoursesDesc')}</p>
              <Link
                to="/courses"
                className="inline-flex items-center font-bold text-brand hover:underline hover:decoration-2 hover:underline-offset-8"
              >
                {t('page.home.entryCoursesLink')}
                <span className="ml-2" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section id="product-features" className="scroll-mt-24 border-t border-border/60 pt-12 md:pt-16">
        <SectionHeading title={t('page.home.featuresTitle')} />
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {features.map(({ Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brandInk">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">{title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

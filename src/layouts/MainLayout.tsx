import { Outlet } from 'react-router-dom';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-content px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

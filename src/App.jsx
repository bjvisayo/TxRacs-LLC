import { lazy, Suspense } from 'react';
import { HomePage } from './pages/HomePage';
import { SeoSchema } from './components/SeoSchema';
import { PageLayout } from './components/PageLayout';
import { usePathname } from './hooks/usePathname';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ServicesPage } from './pages/ServicesPage';

const AdminPage = lazy(() => import('./pages/AdminPage').then((module) => ({ default: module.AdminPage })));

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/services': ServicesPage,
  '/reviews': ReviewsPage,
  '/contact': ContactPage,
  '/admin': AdminPage,
};

export default function App() {
  const pathname = usePathname();
  const Page = routes[pathname] || HomePage;

  if (pathname === '/admin') {
    return (
      <Suspense
        fallback={
          <div className="grid min-h-screen place-items-center bg-softBlue text-lg font-black text-primary">
            Loading admin...
          </div>
        }
      >
        <AdminPage />
      </Suspense>
    );
  }

  return (
    <>
      <SeoSchema />
      <PageLayout>
        <Page />
      </PageLayout>
    </>
  );
}

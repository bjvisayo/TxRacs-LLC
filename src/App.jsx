import { HomePage } from './pages/HomePage';
import { SeoSchema } from './components/SeoSchema';
import { PageLayout } from './components/PageLayout';
import { usePathname } from './hooks/usePathname';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ServicesPage } from './pages/ServicesPage';

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/services': ServicesPage,
  '/reviews': ReviewsPage,
  '/contact': ContactPage,
};

export default function App() {
  const pathname = usePathname();
  const Page = routes[pathname] || HomePage;

  return (
    <>
      <SeoSchema />
      <PageLayout>
        <Page />
      </PageLayout>
    </>
  );
}

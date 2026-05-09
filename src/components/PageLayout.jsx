import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';
import { Navbar } from './Navbar';

export function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

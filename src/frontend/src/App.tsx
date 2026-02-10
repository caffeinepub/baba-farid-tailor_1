import { useEffect, useState } from 'react';
import TopContactBar from './components/navigation/TopContactBar';
import SiteHeader from './components/navigation/SiteHeader';
import HomeHeroSection from './components/sections/HomeHeroSection';
import AboutSection from './components/sections/AboutSection';
import CatalogSection from './components/catalog/CatalogSection';
import OrderNowSection from './components/order/OrderNowSection';
import ContactSection from './components/sections/ContactSection';
import SiteFooter from './components/layout/SiteFooter';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <TopContactBar />
      <SiteHeader activeSection={activeSection} />
      
      <main className="flex-1">
        <HomeHeroSection />
        <AboutSection />
        <CatalogSection />
        <OrderNowSection />
        <ContactSection />
      </main>
      
      <SiteFooter />
    </div>
  );
}

export default App;

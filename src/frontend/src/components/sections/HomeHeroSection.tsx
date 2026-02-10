import { ArrowRight } from 'lucide-react';
import Section from '../layout/Section';

export default function HomeHeroSection() {
  const scrollToOrder = () => {
    const element = document.getElementById('order');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <Section id="home" className="relative overflow-hidden !py-0">
      {/* Hero Banner Background */}
      <div className="relative h-[600px] md:h-[700px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/tailoring-hero-banner.dim_2400x900.png)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">
                Premium Bespoke Tailoring
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Crafted to
              <span className="block text-primary">Perfection</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Experience the art of custom tailoring with Baba Farid Tailor. 
              Every stitch tells a story of excellence, precision, and timeless elegance.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToOrder}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                Order Now
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => {
                  const element = document.getElementById('catalog');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-all"
              >
                View Catalog
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fabric Texture Overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: 'url(/assets/generated/fabric-texture-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
        }}
      />
    </Section>
  );
}

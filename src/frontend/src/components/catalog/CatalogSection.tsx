import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import Section from '../layout/Section';
import { useCatalog } from '../../hooks/useQueries';
import { useSelectedStyle } from '../../state/selectedStyle';
import type { Style } from '../../backend';

export default function CatalogSection() {
  const { data: catalog, isLoading, error } = useCatalog();
  const { setSelectedStyle } = useSelectedStyle();
  const [selectedCategory, setSelectedCategory] = useState<bigint | null>(null);

  const handleStyleSelect = (style: Style) => {
    setSelectedStyle(style);
    const element = document.getElementById('order');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const filteredStyles = selectedCategory
    ? catalog?.styles.filter((style) => style.categoryId === selectedCategory)
    : catalog?.styles;

  if (isLoading) {
    return (
      <Section id="catalog">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section id="catalog">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-xl font-semibold mb-2">Failed to Load Catalog</h3>
          <p className="text-muted-foreground">
            Please try refreshing the page.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="catalog">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Our Catalog</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of premium tailored garments. Select a style 
            to begin your custom order.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card border border-border hover:border-primary/50'
            }`}
          >
            All Categories
          </button>
          {catalog?.categories.map((category) => (
            <button
              key={category.id.toString()}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card border border-border hover:border-primary/50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStyles?.map((style) => (
            <div
              key={style.id.toString()}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all"
            >
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-6xl mb-2">👔</div>
                  <p className="text-sm text-muted-foreground">{style.image}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{style.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {style.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-2xl font-bold text-primary">
                    ${style.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleStyleSelect(style)}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

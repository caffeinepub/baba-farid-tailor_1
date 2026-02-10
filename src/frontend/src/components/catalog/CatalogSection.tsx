import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import Section from '../layout/Section';
import { useCatalog } from '../../hooks/useQueries';
import { useSelectedStyle } from '../../state/selectedStyle';
import CatalogCardImage from './CatalogCardImage';
import type { Style } from '../../backend';

export default function CatalogSection() {
  const { data: catalog, isLoading, error } = useCatalog();
  const { setSelectedStyle, reconcileWithCatalog } = useSelectedStyle();
  const [selectedCategory, setSelectedCategory] = useState<bigint | null>(null);

  // Reconcile selected style when catalog changes
  useEffect(() => {
    if (catalog?.styles) {
      reconcileWithCatalog(catalog.styles);
    }
  }, [catalog, reconcileWithCatalog]);

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

  // Apply defensive UI-level filtering to exclude "Saree Blouse" and "African Kaftan"
  const availableStyles = catalog?.styles.filter(
    (style) => style.name !== 'Saree Blouse' && style.name !== 'African Kaftan'
  );

  const filteredStyles = selectedCategory
    ? availableStyles?.filter((style) => style.categoryId === selectedCategory)
    : availableStyles;

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
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <CatalogCardImage 
                  src={style.image} 
                  alt={style.name}
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{style.name}</h3>
                  <p className="text-sm text-muted-foreground">{style.description}</p>
                </div>
                <div className="flex items-center justify-between">
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

        {filteredStyles?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No styles found in this category.</p>
          </div>
        )}
      </div>
    </Section>
  );
}

import { useState, useMemo } from 'react';
import { products, categories } from '@/data/products';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';

interface ProductGridProps {
  onProductSelect?: (product: Product) => void;
}

const ProductGrid = ({ onProductSelect }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevance');

  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'Todos' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nossas Peças
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre peças únicas que expressam sua personalidade e estilo
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort and Results Count */}
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              {filteredProducts.length} produtos
            </Badge>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-border rounded-md px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-ring"
            >
              <option value="relevance">Mais Relevantes</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="name">Nome A-Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard 
                product={product} 
                onQuickView={onProductSelect}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProducts.length > 8 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Carregar Mais Produtos
            </Button>
          </div>
        )}

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              Nenhum produto encontrado nesta categoria.
            </p>
            <Button 
              variant="link" 
              onClick={() => setSelectedCategory('Todos')}
              className="mt-4"
            >
              Ver todos os produtos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';
import { Product } from '@/types/product';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductGrid onProductSelect={setSelectedProduct} />
      <Footer />
      
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Index;

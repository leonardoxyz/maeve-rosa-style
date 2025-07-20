import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromotionBanner from '@/components/PromotionBanner';
import PromotionGrid from '@/components/PromotionGrid';
import ProductGrid from '@/components/ProductGrid';
import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';
import { Product } from '@/types/product';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PromotionBanner />
      <Hero />
      <PromotionGrid />
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

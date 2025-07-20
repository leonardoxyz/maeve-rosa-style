import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, Star, Truck, RefreshCw, Shield } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link to="/">
            <Button>Voltar à página inicial</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Produtos similares (mesma categoria, excluindo o produto atual)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => 
    price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para produtos
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-gradient-card">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Ângulo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground font-medium">{product.category}</span>
                {product.isNew && <Badge className="bg-primary text-primary-foreground">NOVO</Badge>}
                {product.isSale && <Badge variant="destructive">PROMOÇÃO</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-4 font-display">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(124 avaliações)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <Separator />

            {/* Colors */}
            <div className="space-y-3">
              <h3 className="font-semibold">Cores disponíveis:</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                    }`}
                    style={{ 
                      backgroundColor: color.toLowerCase() === 'rosa' ? '#FAE1DD' :
                                      color.toLowerCase() === 'bordô' ? '#540B0E' :
                                      color.toLowerCase() === 'branco' ? '#FFFFFF' :
                                      color.toLowerCase() === 'preto' ? '#000000' :
                                      color.toLowerCase() === 'bege' ? '#F5F5DC' :
                                      color.toLowerCase() === 'azul marinho' ? '#191970' :
                                      color.toLowerCase() === 'azul claro' ? '#87CEEB' :
                                      color.toLowerCase() === 'azul escuro' ? '#00008B' :
                                      color.toLowerCase() === 'creme' ? '#FFFDD0' :
                                      color.toLowerCase() === 'cinza' ? '#808080' :
                                      color.toLowerCase() === 'marrom' ? '#8B4513' : '#E5E5E5'
                    }}
                    title={color}
                  />
                ))}
              </div>
              {selectedColor && <p className="text-sm text-muted-foreground">Cor selecionada: {selectedColor}</p>}
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <h3 className="font-semibold">Tamanhos disponíveis:</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-all ${
                      selectedSize === size 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && <p className="text-sm text-muted-foreground">Tamanho selecionado: {selectedSize}</p>}
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1 text-lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorited(!isFavorited)}
                className={isFavorited ? 'text-destructive border-destructive' : ''}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-destructive' : ''}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Frete grátis acima de R$ 199</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RefreshCw className="h-4 w-4 text-primary" />
                <span>Troca em até 30 dias</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 font-display">Produtos Similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard 
                  key={similarProduct.id} 
                  product={similarProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingBag, Share2, Minus, Plus, X } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: number) => 
    price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Get similar products (same category, different product)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const getColorHex = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'rosa': '#FAE1DD',
      'bordô': '#540B0E',
      'branco': '#FFFFFF',
      'preto': '#000000',
      'bege': '#F5F5DC',
      'azul marinho': '#191970',
      'azul claro': '#87CEEB',
      'azul escuro': '#00008B',
      'creme': '#FFFDD0',
      'cinza': '#808080',
      'marrom': '#8B4513'
    };
    return colorMap[color.toLowerCase()] || '#E5E5E5';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Detalhes do Produto</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-card rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground">NOVO</Badge>
                )}
                {product.isSale && (
                  <Badge variant="destructive">PROMOÇÃO</Badge>
                )}
              </div>

              {/* Basic Info */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                  {product.category}
                </p>
                <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-foreground leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Cor: <span className="font-normal">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: getColorHex(color) }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Tamanho: {selectedSize && <span className="font-normal">{selectedSize}</span>}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Quantidade</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full"
                  disabled={!selectedSize}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="flex-1"
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isFavorited ? 'fill-destructive text-destructive' : ''}`} />
                    {isFavorited ? 'Favoritado' : 'Favoritar'}
                  </Button>
                  
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-sm text-muted-foreground space-y-1">
                <p>✓ Frete grátis acima de R$ 199</p>
                <p>✓ Parcelamento em até 6x sem juros</p>
                <p>✓ Primeira troca grátis</p>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Produtos Similares</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((similarProduct) => (
                  <ProductCard key={similarProduct.id} product={similarProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images || [product.image];

  // Efeito para alternar imagens quando em hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1000); // Troca de imagem a cada 1 segundo
    } else {
      setCurrentImageIndex(0); // Volta para a primeira imagem quando não está em hover
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, images.length]);

  const formatPrice = (price: number) => 
    price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Link to={`/produto/${product.id}`}>
      <div 
        className="group relative bg-card rounded-xl overflow-hidden shadow-product hover:shadow-hover transition-all duration-300 hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-card">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
          />
        {/* Image Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">
              NOVO
            </Badge>
          )}
          {product.isSale && (
            <Badge variant="destructive">
              PROMOÇÃO
            </Badge>
          )}
        </div>

        {/* Discount percentage */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-background/90 backdrop-blur-sm text-foreground border-border/50">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          </div>
        )}

        {/* Hover Actions */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-center justify-center gap-3 transition-all duration-300 ${
          isHovered ? 'opacity-100 backdrop-blur-[2px]' : 'opacity-0'
        }`}>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-lg hover:scale-110 transition-all duration-200 bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
          >
            <Heart className={`h-4 w-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
          
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-lg hover:scale-110 transition-all duration-200 bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView?.(product);
            }}
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
          
          <Button
            size="icon"
            className="rounded-full shadow-lg hover:scale-110 transition-all duration-200 bg-primary/90 backdrop-blur-sm hover:bg-primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{product.category}</p>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2">
          {product.colors.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full border border-border"
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
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Sizes */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Tamanhos:</span>
          {product.sizes.slice(0, 4).map((size, index) => (
            <span key={index} className="text-xs text-muted-foreground">
              {size}{index < Math.min(product.sizes.length, 4) - 1 ? ', ' : ''}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="text-xs text-muted-foreground">...</span>
          )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
import { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    'Novidades',
    'Vestidos',
    'Blusas',
    'Calças',
    'Saias',
    'Blazers',
    'Acessórios',
    'Sale'
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        FRETE GRÁTIS acima de R$ 199 | Parcelamento em até 6x sem juros
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <div className="flex-1 md:flex-none">
            <h1 className="text-2xl font-bold text-primary text-center md:text-left">
              ROSA
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  item === 'Sale' ? 'text-destructive font-semibold' : 'text-foreground'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                className="border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 w-64"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    item === 'Sale' ? 'text-destructive font-semibold' : 'text-foreground'
                  }`}
                >
                  {item}
                </a>
              ))}
              <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2 mt-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  className="border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
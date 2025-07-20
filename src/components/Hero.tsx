import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const Hero = () => {
  const slides = [
    {
      image: heroImage,
      title: 'Nova',
      subtitle: 'Coleção',
      description: 'Descubra peças únicas para mulheres autênticas e confiantes'
    },
    {
      image: hero2,
      title: 'Estilo',
      subtitle: 'Único',
      description: 'Expresse sua personalidade com nossa moda exclusiva'
    },
    {
      image: hero3,
      title: 'Tendência',
      subtitle: 'Verão',
      description: 'As últimas tendências da moda feminina chegaram'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/20" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-2xl text-white">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {slides[currentSlide].title}
              <span className="block text-secondary">{slides[currentSlide].subtitle}</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light opacity-90">
              {slides[currentSlide].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6"
              >
                Explorar Coleção
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
              >
                Ver Promoções
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 hidden lg:block animate-hover-float">
        <div className="w-20 h-20 rounded-full bg-secondary/30 backdrop-blur-sm" />
      </div>
      
      <div className="absolute bottom-32 right-32 hidden lg:block animate-hover-float" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm" />
      </div>
    </section>
  );
};

export default Hero;
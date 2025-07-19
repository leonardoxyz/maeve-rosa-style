import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fashion Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/20" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-2xl text-white">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Nova
              <span className="block text-secondary">Coleção</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light opacity-90">
              Descubra peças únicas para mulheres autênticas e confiantes
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
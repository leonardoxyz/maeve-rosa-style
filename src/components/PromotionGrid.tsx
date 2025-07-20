import promo1 from '@/assets/promo-1.jpg';
import promo2 from '@/assets/promo-2.jpg';

const PromotionGrid = () => {
  const promotions = [
    {
      id: 1,
      image: promo1,
      title: 'Coleção Verão',
      subtitle: 'Até 50% OFF',
      link: '#'
    },
    {
      id: 2,
      image: promo2,
      title: 'Lançamentos',
      subtitle: 'Novas Peças',
      link: '#'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-display">
          Ofertas Especiais
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {promotions.map((promo) => (
            <div 
              key={promo.id}
              className="group relative overflow-hidden rounded-2xl shadow-product hover:shadow-hover transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2 font-display">
                  {promo.title}
                </h3>
                <p className="text-lg font-light opacity-90">
                  {promo.subtitle}
                </p>
              </div>
              
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionGrid;
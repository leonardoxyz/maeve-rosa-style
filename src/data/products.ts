import { Product } from '@/types/product';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Blusa Delicada Rosa',
    price: 129.90,
    originalPrice: 159.90,
    image: product1,
    category: 'Blusas',
    description: 'Uma blusa feminina e delicada em tom rosé, perfeita para looks românticos e casuais. Tecido leve e confortável.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Rosa', 'Branco', 'Bege'],
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    name: 'Vestido Elegante Bordô',
    price: 299.90,
    image: product2,
    category: 'Vestidos',
    description: 'Vestido elegante na cor bordô, ideal para ocasiões especiais. Corte moderno que valoriza a silhueta feminina.',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Bordô', 'Preto', 'Azul Marinho'],
    isNew: true
  },
  {
    id: '3',
    name: 'Calça Jeans Branca',
    price: 189.90,
    originalPrice: 229.90,
    image: product3,
    category: 'Calças',
    description: 'Calça jeans branca com corte moderno. Versátil e confortável para o dia a dia.',
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Branco', 'Azul Claro', 'Azul Escuro'],
    isSale: true
  },
  {
    id: '4',
    name: 'Cardigan Rosa Suave',
    price: 169.90,
    image: product4,
    category: 'Cardigans',
    description: 'Cardigan em tricot macio na cor rosa suave. Peça coringa para compor looks femininos e confortáveis.',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Rosa', 'Creme', 'Cinza'],
    isNew: true
  },
  {
    id: '5',
    name: 'Saia Mini Preta',
    price: 89.90,
    image: product5,
    category: 'Saias',
    description: 'Saia mini preta básica, essencial no guarda-roupa feminino. Combina com diversos looks.',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Preto', 'Marrom', 'Bege']
  },
  {
    id: '6',
    name: 'Blazer Bege Cropped',
    price: 249.90,
    image: product6,
    category: 'Blazers',
    description: 'Blazer cropped em alfaiataria bege. Sofisticação e elegância para looks profissionais e casuais.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Bege', 'Preto', 'Branco'],
    isNew: true
  }
];

export const categories = [
  'Todos',
  'Vestidos',
  'Blusas',
  'Calças',
  'Saias',
  'Blazers',
  'Cardigans',
  'Acessórios'
];
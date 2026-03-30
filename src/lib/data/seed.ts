import { Collection, Category, Product, ProductVariant, ProductImage, HomepageBlock, Promotion, Coupon, SizeRule, Setting, Customer, DogProfile, Order, OrderItem } from '../types';

// ---- Collections ----
export const collections: Collection[] = [
  { id: 'col-1', title: 'OTSO', slug: 'otso', description: 'La colección que define el streetwear canino. Inspirada en lo urbano, diseñada para perrhijos con actitud.', image_url: '/products/GAP foto 0.jpg', display_priority: 1, is_visible: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'col-2', title: 'The North Fetch', slug: 'the-north-fetch', description: 'Para aventuras al aire libre. Prendas técnicas con estilo premium para los perrhijos más exploradores.', image_url: '/products/TNF foto 1.jpg', display_priority: 2, is_visible: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'col-3', title: 'Streetwear Esencial', slug: 'streetwear-esencial', description: 'Los básicos que todo perrhijo necesita. Hoodies, playeras y más con el sello Estilo Perrón.', image_url: '/products/HD foto 1.jpg', display_priority: 3, is_visible: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'col-4', title: 'Edición Especial', slug: 'edicion-especial', description: 'Piezas únicas de edición limitada. Cuando tu perrhijo merece algo irrepetible.', image_url: '/products/Playera Mundial foto 0.jpg', display_priority: 4, is_visible: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
];

// ---- Categories ----
export const categories: Category[] = [
  { id: 'cat-1', title: 'Hoodies', slug: 'hoodies', description: 'Hoodies premium para perrhijos con estilo', image_url: '/products/GAP foto 2.jpg', display_priority: 1, is_visible: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'cat-2', title: 'Playeras', slug: 'playeras', description: 'Playeras cómodas y con actitud', image_url: '/products/Playera Mundial foto 1.jpg', display_priority: 2, is_visible: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'cat-3', title: 'Chamarras', slug: 'chamarras', description: 'Chamarras para los días fríos', image_url: '/products/TNF foto 2.jpg', display_priority: 3, is_visible: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'cat-4', title: 'Denim', slug: 'denim', description: 'La línea denim más cool', image_url: '/products/Denim foto 1.jpg', display_priority: 4, is_visible: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
  { id: 'cat-5', title: 'Accesorios', slug: 'accesorios', description: 'Complementos para completar el look', image_url: '/products/Display Various 1.jpg', display_priority: 5, is_visible: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
];

// ---- Products ----
export const products: Product[] = [
  {
    id: 'prod-1', title: 'Hoodie GAP Clásico', slug: 'hoodie-gap-clasico',
    description: 'El hoodie insignia de nuestra colección OTSO. Confeccionado en algodón premium con interior afelpado, este hoodie combina comodidad con el estilo urbano que define a Estilo Perrón. Perfecto para paseos matutinos y tardes en el parque.',
    short_description: 'Hoodie premium de algodón con interior afelpado',
    collection_id: 'col-1', category_id: 'cat-1', base_price: 549, compare_at_price: 699, cost: 180,
    is_featured: true, is_new: false, is_favorite: true, is_visible: true, is_archived: false,
    personalization_enabled: true, personalization_type: 'text', personalization_cost: 89,
    personalization_instructions: 'Agrega el nombre de tu perrhijo bordado en el hoodie',
    personalization_extra_days: 3, care_instructions: 'Lavar a máquina en frío. No usar secadora. Planchar a baja temperatura.',
    tags: ['hoodie', 'bestseller', 'otso'], display_priority: 1, created_at: '2026-01-15', updated_at: '2026-03-01',
  },
  {
    id: 'prod-2', title: 'Hoodie GAP Rosa', slug: 'hoodie-gap-rosa',
    description: 'El rosa nunca fue tan perrón. Nuestro hoodie signature en un tono vibrante que hará que tu perrhijo sea el centro de todas las miradas.',
    short_description: 'Hoodie signature en rosa vibrante',
    collection_id: 'col-1', category_id: 'cat-1', base_price: 549, cost: 180,
    is_featured: true, is_new: true, is_favorite: false, is_visible: true, is_archived: false,
    personalization_enabled: true, personalization_type: 'text', personalization_cost: 89,
    personalization_instructions: 'Bordado personalizado con nombre', personalization_extra_days: 3,
    care_instructions: 'Lavar a máquina en frío. No usar secadora.', tags: ['hoodie', 'rosa', 'nuevo'],
    display_priority: 2, created_at: '2026-02-01', updated_at: '2026-03-01',
  },
  {
    id: 'prod-3', title: 'Chamarra The North Fetch', slug: 'chamarra-the-north-fetch',
    description: 'Inspirada en las mejores chamarras outdoor, esta pieza combina funcionalidad y diseño. Resistente al viento y con relleno ligero para mantener calentito a tu perrhijo en cualquier aventura.',
    short_description: 'Chamarra outdoor con relleno ligero',
    collection_id: 'col-2', category_id: 'cat-3', base_price: 799, compare_at_price: 999, cost: 280,
    is_featured: true, is_new: false, is_favorite: true, is_visible: true, is_archived: false,
    personalization_enabled: false, personalization_cost: 0, personalization_extra_days: 0,
    tags: ['chamarra', 'outdoor', 'tnf'], display_priority: 3, created_at: '2026-01-10', updated_at: '2026-03-01',
  },
  {
    id: 'prod-4', title: 'Hoodie Lila Universitario', slug: 'hoodie-lila-universitario',
    description: 'El estilo varsity llegó al mundo canino. Hoodie en lila suave con parche bordado, ideal para perrhijos con personalidad académica y mucho flow.',
    short_description: 'Hoodie varsity en lila con parche bordado',
    collection_id: 'col-3', category_id: 'cat-1', base_price: 499, cost: 165,
    is_featured: false, is_new: true, is_favorite: false, is_visible: true, is_archived: false,
    personalization_enabled: true, personalization_type: 'patch', personalization_cost: 120,
    personalization_instructions: 'Elige tu parche personalizado', personalization_extra_days: 5,
    tags: ['hoodie', 'varsity', 'lila'], display_priority: 4, created_at: '2026-02-15', updated_at: '2026-03-01',
  },
  {
    id: 'prod-5', title: 'Chaleco Oxxo Edition', slug: 'chaleco-oxxo-edition',
    description: 'Edición limitada en colaboración. Este chaleco icónico trae toda la vibra urbana mexicana al guardarropa de tu perrhijo. Piezas numeradas, estilo infinito.',
    short_description: 'Chaleco edición limitada colaboración',
    collection_id: 'col-4', category_id: 'cat-3', base_price: 649, cost: 220,
    is_featured: true, is_new: true, is_favorite: false, is_visible: true, is_archived: false,
    personalization_enabled: false, personalization_cost: 0, personalization_extra_days: 0,
    tags: ['chaleco', 'edicion-limitada', 'oxxo'], display_priority: 5, created_at: '2026-03-01', updated_at: '2026-03-01',
  },
  {
    id: 'prod-6', title: 'Playera Mundial', slug: 'playera-mundial',
    description: 'Tu perrhijo también es seleccionado nacional. Playera conmemorativa con los colores que nos unen, perfecta para ver los partidos juntos.',
    short_description: 'Playera conmemorativa selección',
    collection_id: 'col-4', category_id: 'cat-2', base_price: 399, compare_at_price: 499, cost: 130,
    is_featured: false, is_new: false, is_favorite: true, is_visible: true, is_archived: false,
    personalization_enabled: true, personalization_type: 'text', personalization_cost: 79,
    personalization_instructions: 'Nombre y número en la espalda', personalization_extra_days: 4,
    tags: ['playera', 'mundial', 'seleccion'], display_priority: 6, created_at: '2026-01-20', updated_at: '2026-03-01',
  },
  {
    id: 'prod-7', title: 'Hoodie Tommy Hilperro', slug: 'hoodie-tommy-hilperro',
    description: 'Elegancia clásica con un twist perrón. Este hoodie rinde homenaje al preppy style americano, pero con toda la actitud mexicana.',
    short_description: 'Hoodie estilo preppy premium',
    collection_id: 'col-1', category_id: 'cat-1', base_price: 599, cost: 195,
    is_featured: true, is_new: false, is_favorite: true, is_visible: true, is_archived: false,
    personalization_enabled: true, personalization_type: 'text', personalization_cost: 89,
    personalization_instructions: 'Bordado personalizado', personalization_extra_days: 3,
    tags: ['hoodie', 'preppy', 'premium'], display_priority: 7, created_at: '2026-01-05', updated_at: '2026-03-01',
  },
  {
    id: 'prod-8', title: 'Denim Jacket Perrón', slug: 'denim-jacket-perron',
    description: 'La chamarra de mezclilla definitiva para perrhijos rebeldes. Denim resistente con corte impecable y detalles que marcan la diferencia.',
    short_description: 'Chamarra de mezclilla con actitud',
    collection_id: 'col-3', category_id: 'cat-4', base_price: 699, cost: 240,
    is_featured: false, is_new: true, is_favorite: false, is_visible: true, is_archived: false,
    personalization_enabled: false, personalization_cost: 0, personalization_extra_days: 0,
    tags: ['denim', 'chamarra', 'rebelde'], display_priority: 8, created_at: '2026-02-20', updated_at: '2026-03-01',
  },
  {
    id: 'prod-9', title: 'Hoodie Azul Celeste', slug: 'hoodie-azul-celeste',
    description: 'Suave como el cielo, fresco como tu perrhijo. Hoodie en azul celeste con el sello inconfundible de Estilo Perrón.',
    short_description: 'Hoodie en azul celeste premium',
    collection_id: 'col-3', category_id: 'cat-1', base_price: 499, cost: 165,
    is_featured: false, is_new: false, is_favorite: false, is_visible: true, is_archived: false,
    personalization_enabled: true, personalization_type: 'text', personalization_cost: 89,
    personalization_instructions: 'Agrega el nombre bordado', personalization_extra_days: 3,
    tags: ['hoodie', 'azul', 'basico'], display_priority: 9, created_at: '2026-01-25', updated_at: '2026-03-01',
  },
  {
    id: 'prod-10', title: 'Chaleco TNF Explorer', slug: 'chaleco-tnf-explorer',
    description: 'El chaleco más aventurero de la colección. Interior térmico, exterior a prueba de viento. Para perrhijos que no conocen límites.',
    short_description: 'Chaleco térmico para aventuras',
    collection_id: 'col-2', category_id: 'cat-3', base_price: 699, compare_at_price: 849, cost: 250,
    is_featured: true, is_new: false, is_favorite: false, is_visible: true, is_archived: false,
    personalization_enabled: false, personalization_cost: 0, personalization_extra_days: 0,
    tags: ['chaleco', 'tnf', 'outdoor'], display_priority: 10, created_at: '2026-01-12', updated_at: '2026-03-01',
  },
];

// ---- Variants ----
const sizes: Array<'XS' | 'S' | 'M' | 'L' | 'XL'> = ['XS', 'S', 'M', 'L', 'XL'];
function makeVariants(productId: string, prefix: string, basePrice: number, cost: number, compareAt?: number): ProductVariant[] {
  return sizes.map((size, i) => ({
    id: `var-${prefix}-${size.toLowerCase()}`,
    product_id: productId,
    sku: `EP-${prefix}-${size}`,
    size,
    price: basePrice,
    compare_at_price: compareAt,
    cost,
    stock: Math.floor(Math.random() * 20) + 2,
    low_stock_threshold: 5,
    is_active: true,
    position: i,
    created_at: '2026-01-01',
    updated_at: '2026-03-01',
  }));
}

export const productVariants: ProductVariant[] = [
  ...makeVariants('prod-1', 'GAP-CL', 549, 180, 699),
  ...makeVariants('prod-2', 'GAP-RS', 549, 180),
  ...makeVariants('prod-3', 'TNF-CH', 799, 280, 999),
  ...makeVariants('prod-4', 'LIL-UN', 499, 165),
  ...makeVariants('prod-5', 'OXX-ED', 649, 220),
  ...makeVariants('prod-6', 'MUN-PL', 399, 130, 499),
  ...makeVariants('prod-7', 'TH-HD', 599, 195),
  ...makeVariants('prod-8', 'DEN-JK', 699, 240),
  ...makeVariants('prod-9', 'AZL-HD', 499, 165),
  ...makeVariants('prod-10', 'TNF-EX', 699, 250, 849),
];

// ---- Product Images ----
export const productImages: ProductImage[] = [
  { id: 'img-1a', product_id: 'prod-1', url: '/products/GAP foto 0.jpg', alt_text: 'Hoodie GAP Clásico vista frontal', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-1b', product_id: 'prod-1', url: '/products/GAP foto 1.jpg', alt_text: 'Hoodie GAP Clásico detalle', position: 1, is_primary: false, created_at: '2026-01-01' },
  { id: 'img-1c', product_id: 'prod-1', url: '/products/GAP foto 2.jpg', alt_text: 'Hoodie GAP Clásico lateral', position: 2, is_primary: false, created_at: '2026-01-01' },
  { id: 'img-2a', product_id: 'prod-2', url: '/products/IMG_1259.PNG', alt_text: 'Hoodie GAP Rosa', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-2b', product_id: 'prod-2', url: '/products/GAP foto 3.jpg', alt_text: 'Hoodie GAP Rosa detalle', position: 1, is_primary: false, created_at: '2026-01-01' },
  { id: 'img-3a', product_id: 'prod-3', url: '/products/TNF foto 1.jpg', alt_text: 'Chamarra The North Fetch', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-3b', product_id: 'prod-3', url: '/products/TNF foto 2.jpg', alt_text: 'Chamarra TNF detalle', position: 1, is_primary: false, created_at: '2026-01-01' },
  { id: 'img-3c', product_id: 'prod-3', url: '/products/TNF foto 3.jpg', alt_text: 'Chamarra TNF lateral', position: 2, is_primary: false, created_at: '2026-01-01' },
  { id: 'img-4a', product_id: 'prod-4', url: '/products/IMG_1261.PNG', alt_text: 'Hoodie Lila Universitario', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-4b', product_id: 'prod-4', url: '/products/GAP foto 4.jpg', alt_text: 'Hoodie Lila detalle', position: 1, is_primary: false, created_at: '2026-01-01' },
  { id: 'img-5a', product_id: 'prod-5', url: '/products/Oxxo foto 1.jpg', alt_text: 'Chaleco Oxxo Edition', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-5b', product_id: 'prod-5', url: '/products/Oxxo foto 2.jpg', alt_text: 'Chaleco Oxxo detalle', position: 1, is_primary: false, created_at: '2026-01-01' },
  { id: 'img-6a', product_id: 'prod-6', url: '/products/Playera Mundial foto 0.jpg', alt_text: 'Playera Mundial', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-6b', product_id: 'prod-6', url: '/products/Playera Mundial foto 1.jpg', alt_text: 'Playera Mundial detalle', position: 1, is_primary: false, created_at: '2026-01-01' },
  { id: 'img-7a', product_id: 'prod-7', url: '/products/TH foto 1.jpg', alt_text: 'Hoodie Tommy Hilperro', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-7b', product_id: 'prod-7', url: '/products/TH foto 2.jpg', alt_text: 'Tommy Hilperro detalle', position: 1, is_primary: false, created_at: '2026-01-01' },
  { id: 'img-8a', product_id: 'prod-8', url: '/products/Denim foto 1.jpg', alt_text: 'Denim Jacket Perrón', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-9a', product_id: 'prod-9', url: '/products/IMG_1263.PNG', alt_text: 'Hoodie Azul Celeste', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-10a', product_id: 'prod-10', url: '/products/TNF Display 1.jpg', alt_text: 'Chaleco TNF Explorer', position: 0, is_primary: true, created_at: '2026-01-01' },
  { id: 'img-10b', product_id: 'prod-10', url: '/products/TNF Display 2.jpg', alt_text: 'Chaleco TNF Explorer display', position: 1, is_primary: false, created_at: '2026-01-01' },
];

// ---- Homepage Blocks ----
export const homepageBlocks: HomepageBlock[] = [
  {
    id: 'hb-1', block_type: 'promo_strip', title: '10% OFF en tu primera compra con el código PERRHIJO10 🐾',
    position: 0, is_visible: true, theme: 'blue', bg_color: '#5568AF', text_color: '#FFFFFF',
    created_at: '2026-01-01', updated_at: '2026-03-01',
  },
  {
    id: 'hb-2', block_type: 'hero',
    title: 'Amor que se lleva puesto',
    subtitle: 'Por cada compra, donamos $10 a un refugio para que más perrhijos tengan estilo.',
    cta_text: 'Ver la tienda', cta_url: '/tienda',
    cta_secondary_text: 'Es un regalo', cta_secondary_url: '/tienda?filter=regalo',
    image_url: '/products/IMG_1267.PNG',
    position: 1, is_visible: true, theme: 'stone', bg_color: '#E8E1D8',
    created_at: '2026-01-01', updated_at: '2026-03-01',
  },
  {
    id: 'hb-3', block_type: 'trust_strip',
    title: 'Para perritos con un estilo... bien perrón',
    subtitle: '+1,500 perrhijos ya lucen con estilo  •  Envío gratis a partir de $999  •  Hecho en México con amor',
    position: 2, is_visible: true, theme: 'white',
    created_at: '2026-01-01', updated_at: '2026-03-01',
  },
  {
    id: 'hb-4', block_type: 'product_mosaic',
    title: 'Lo más cool para tu perrhijo',
    position: 3, is_visible: true, theme: 'pink', bg_color: '#F8C9DD',
    config: { filters: ['Todo', 'Lo más nuevo', 'Los favoritos'] },
    created_at: '2026-01-01', updated_at: '2026-03-01',
  },
  {
    id: 'hb-5', block_type: 'campaign',
    title: 'Aquí siempre está abierta la segunda caja',
    subtitle: 'Adquiere la nueva línea de chalequitos OTSO para que tu perrhijo se vea muy chido/cómodo/cool',
    cta_text: 'Comprar', cta_url: '/colecciones/otso',
    image_url: '/products/Oxxo foto 1.jpg', secondary_image_url: '/products/TH Oxxo foto 1.jpg',
    position: 4, is_visible: true, theme: 'red', bg_color: '#EC1763',
    created_at: '2026-01-01', updated_at: '2026-03-01',
  },
  {
    id: 'hb-6', block_type: 'campaign',
    title: '¿Perrhijos con actitud rebelde?',
    subtitle: 'No apagues su brillo. Complementa su personalidad con el toque más auténtico que puede tener.',
    cta_text: 'Comprar', cta_url: '/colecciones/streetwear-esencial',
    image_url: '/products/IMG_1265.PNG', secondary_image_url: '/products/GAP foto 5.jpg',
    position: 5, is_visible: true, theme: 'lime', bg_color: '#CDD629',
    created_at: '2026-01-01', updated_at: '2026-03-01',
  },
  {
    id: 'hb-7', block_type: 'featured_products',
    title: 'Recién llegados',
    subtitle: 'Las piezas más nuevas de la familia Perrón',
    position: 6, is_visible: true, theme: 'white',
    config: { filter: 'is_new' },
    created_at: '2026-01-01', updated_at: '2026-03-01',
  },
  {
    id: 'hb-8', block_type: 'dog_registration_cta',
    title: 'Registra a tu perrhijo',
    subtitle: 'Encuentra su talla perfecta en menos de 2 minutos. Sin dramas, pura buena vibra.',
    cta_text: 'Registrar ahora', cta_url: '/registra-a-tu-perrhijo',
    position: 7, is_visible: true, theme: 'aqua', bg_color: '#CEEEAE',
    created_at: '2026-01-01', updated_at: '2026-03-01',
  },
];

// ---- Promotions ----
export const promotions: Promotion[] = [
  { id: 'promo-1', title: 'Lanzamiento Perrón', description: '10% de descuento en tu primera compra', type: 'percentage', value: 10, is_active: true, is_featured: true, applies_to: 'all', usage_count: 0, created_at: '2026-01-01', updated_at: '2026-03-01' },
  { id: 'promo-2', title: 'Envío Gratis', description: 'Envío gratis en compras mayores a $999', type: 'free_shipping', value: 0, min_order_amount: 999, is_active: true, is_featured: false, applies_to: 'all', usage_count: 0, created_at: '2026-01-01', updated_at: '2026-03-01' },
  { id: 'promo-3', title: 'OTSO -15%', description: '15% en toda la colección OTSO', type: 'percentage', value: 15, is_active: true, is_featured: true, applies_to: 'collection', applies_to_id: 'col-1', usage_count: 0, created_at: '2026-02-01', updated_at: '2026-03-01' },
];

export const coupons: Coupon[] = [
  { id: 'coup-1', code: 'PERRHIJO10', promotion_id: 'promo-1', is_active: true, usage_limit: 1000, usage_count: 47, created_at: '2026-01-01' },
  { id: 'coup-2', code: 'OTSO15', promotion_id: 'promo-3', is_active: true, usage_limit: 500, usage_count: 12, created_at: '2026-02-01' },
];

// ---- Size Rules ----
export const sizeRules: SizeRule[] = [
  { id: 'sr-1', weight_range: 'muy_pequeno', body_type: 'delgado', recommended_size: 'XS', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-2', weight_range: 'muy_pequeno', body_type: 'standard', recommended_size: 'XS', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-3', weight_range: 'muy_pequeno', body_type: 'robusto', recommended_size: 'S', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-4', weight_range: 'ligero', body_type: 'delgado', recommended_size: 'XS', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-5', weight_range: 'ligero', body_type: 'standard', recommended_size: 'S', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-6', weight_range: 'ligero', body_type: 'robusto', recommended_size: 'S', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-7', weight_range: 'pequeno_robusto', body_type: 'delgado', recommended_size: 'S', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-8', weight_range: 'pequeno_robusto', body_type: 'standard', recommended_size: 'M', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-9', weight_range: 'pequeno_robusto', body_type: 'robusto', recommended_size: 'M', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-10', weight_range: 'mediano', body_type: 'delgado', recommended_size: 'M', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-11', weight_range: 'mediano', body_type: 'standard', recommended_size: 'L', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-12', weight_range: 'mediano', body_type: 'robusto', recommended_size: 'L', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-13', weight_range: 'grandote', body_type: 'delgado', recommended_size: 'L', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-14', weight_range: 'grandote', body_type: 'standard', recommended_size: 'XL', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-15', weight_range: 'grandote', body_type: 'robusto', recommended_size: 'XL', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-16', weight_range: 'gigante', body_type: 'delgado', recommended_size: 'XL', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-17', weight_range: 'gigante', body_type: 'standard', recommended_size: 'XL', is_active: true, created_at: '2026-01-01' },
  { id: 'sr-18', weight_range: 'gigante', body_type: 'robusto', recommended_size: 'XL', is_active: true, created_at: '2026-01-01' },
];

// ---- Settings ----
export const settings: Setting[] = [
  { id: 'set-1', key: 'store_name', value: { value: 'Estilo Perrón' }, description: 'Nombre de la tienda', updated_at: '2026-01-01' },
  { id: 'set-2', key: 'currency', value: { code: 'MXN', symbol: '$' }, description: 'Moneda', updated_at: '2026-01-01' },
  { id: 'set-3', key: 'free_shipping_threshold', value: { amount: 999 }, description: 'Monto mínimo para envío gratis', updated_at: '2026-01-01' },
  { id: 'set-4', key: 'shipping_base_cost', value: { amount: 149 }, description: 'Costo base de envío', updated_at: '2026-01-01' },
  { id: 'set-5', key: 'donation_enabled', value: { enabled: true, message: 'Por cada compra, donamos $10 a refugios de perrhijos', amount_per_order: 10 }, description: 'Donación por pedido', updated_at: '2026-01-01' },
  { id: 'set-6', key: 'contact_email', value: { value: 'hola@estiloperron.mx' }, description: 'Email de contacto', updated_at: '2026-01-01' },
  { id: 'set-7', key: 'contact_phone', value: { value: '+52 55 1234 5678' }, description: 'Teléfono de contacto', updated_at: '2026-01-01' },
  { id: 'set-8', key: 'social_instagram', value: { value: '@estiloperron' }, description: 'Instagram', updated_at: '2026-01-01' },
];

// ---- Sample Customers ----
export const customers: Customer[] = [
  { id: 'cust-1', email: 'maria@ejemplo.com', first_name: 'María', last_name: 'González', phone: '+52 55 9876 5432', accepts_marketing: true, total_orders: 3, total_spent: 1847, created_at: '2026-01-15', updated_at: '2026-03-01' },
  { id: 'cust-2', email: 'carlos@ejemplo.com', first_name: 'Carlos', last_name: 'Rodríguez', phone: '+52 33 8765 4321', accepts_marketing: false, total_orders: 1, total_spent: 549, created_at: '2026-02-01', updated_at: '2026-03-01' },
  { id: 'cust-3', email: 'ana@ejemplo.com', first_name: 'Ana', last_name: 'López', phone: '+52 81 7654 3210', accepts_marketing: true, total_orders: 5, total_spent: 3295, created_at: '2026-01-05', updated_at: '2026-03-01' },
];

// ---- Sample Dog Profiles ----
export const dogProfiles: DogProfile[] = [
  { id: 'dog-1', customer_id: 'cust-1', name: 'Luna', breed: 'Cocker Spaniel', weight_range: 'pequeno_robusto', body_type: 'robusto', known_size: 'M', recommended_size: 'M', photo_url: '/products/IMG_1261.PNG', created_at: '2026-01-15', updated_at: '2026-03-01' },
  { id: 'dog-2', customer_id: 'cust-1', name: 'Rocky', breed: 'Bull Terrier', weight_range: 'mediano', body_type: 'atletico', known_size: 'L', recommended_size: 'L', photo_url: '/products/IMG_1265.PNG', created_at: '2026-01-20', updated_at: '2026-03-01' },
  { id: 'dog-3', customer_id: 'cust-3', name: 'Milo', breed: 'Maltés', weight_range: 'ligero', body_type: 'delgado', known_size: 'XS', recommended_size: 'XS', photo_url: '/products/IMG_1263.PNG', created_at: '2026-01-10', updated_at: '2026-03-01' },
];

// ---- Sample Orders ----
export const orders: Order[] = [
  {
    id: 'ord-1', order_number: 'EP-0001', customer_id: 'cust-1', status: 'delivered', payment_status: 'paid',
    subtotal: 1098, discount_amount: 109.8, shipping_cost: 0, total: 988.2,
    shipping_name: 'María González', shipping_city: 'CDMX', shipping_state: 'Ciudad de México', shipping_postal_code: '06600',
    payment_method: 'mercadopago', has_personalization: true, coupon_code: 'PERRHIJO10',
    dog_profile_id: 'dog-1', created_at: '2026-01-20', updated_at: '2026-02-01',
  },
  {
    id: 'ord-2', order_number: 'EP-0002', customer_id: 'cust-2', status: 'shipped', payment_status: 'paid',
    subtotal: 549, discount_amount: 0, shipping_cost: 149, total: 698,
    shipping_name: 'Carlos Rodríguez', shipping_city: 'Guadalajara', shipping_state: 'Jalisco', shipping_postal_code: '44100',
    payment_method: 'mercadopago', has_personalization: false, created_at: '2026-02-15', updated_at: '2026-03-01',
  },
  {
    id: 'ord-3', order_number: 'EP-0003', customer_id: 'cust-3', status: 'in_preparation', payment_status: 'paid',
    subtotal: 1298, discount_amount: 0, shipping_cost: 0, total: 1298,
    shipping_name: 'Ana López', shipping_city: 'Monterrey', shipping_state: 'Nuevo León', shipping_postal_code: '64000',
    payment_method: 'mercadopago', has_personalization: true, created_at: '2026-03-10', updated_at: '2026-03-15',
  },
  {
    id: 'ord-4', order_number: 'EP-0004', customer_id: 'cust-1', status: 'pending', payment_status: 'pending',
    subtotal: 499, discount_amount: 0, shipping_cost: 149, total: 648,
    shipping_name: 'María González', shipping_city: 'CDMX', shipping_state: 'Ciudad de México', shipping_postal_code: '06600',
    has_personalization: false, created_at: '2026-03-25', updated_at: '2026-03-25',
  },
];

export const orderItems: OrderItem[] = [
  { id: 'oi-1', order_id: 'ord-1', variant_id: 'var-GAP-CL-m', product_title: 'Hoodie GAP Clásico', variant_sku: 'EP-GAP-CL-M', variant_size: 'M', unit_price: 549, quantity: 1, subtotal: 549, has_personalization: true, personalization_type: 'text', personalization_data: { text: 'Luna' }, personalization_cost: 89, product_image_url: '/products/GAP foto 0.jpg', created_at: '2026-01-20' },
  { id: 'oi-2', order_id: 'ord-1', variant_id: 'var-GAP-RS-m', product_title: 'Hoodie GAP Rosa', variant_sku: 'EP-GAP-RS-M', variant_size: 'M', unit_price: 549, quantity: 1, subtotal: 549, has_personalization: false, personalization_cost: 0, product_image_url: '/products/IMG_1259.PNG', created_at: '2026-01-20' },
  { id: 'oi-3', order_id: 'ord-2', variant_id: 'var-GAP-CL-l', product_title: 'Hoodie GAP Clásico', variant_sku: 'EP-GAP-CL-L', variant_size: 'L', unit_price: 549, quantity: 1, subtotal: 549, has_personalization: false, personalization_cost: 0, product_image_url: '/products/GAP foto 0.jpg', created_at: '2026-02-15' },
  { id: 'oi-4', order_id: 'ord-3', variant_id: 'var-TNF-CH-l', product_title: 'Chamarra The North Fetch', variant_sku: 'EP-TNF-CH-L', variant_size: 'L', unit_price: 799, quantity: 1, subtotal: 799, has_personalization: false, personalization_cost: 0, product_image_url: '/products/TNF foto 1.jpg', created_at: '2026-03-10' },
  { id: 'oi-5', order_id: 'ord-3', variant_id: 'var-LIL-UN-xs', product_title: 'Hoodie Lila Universitario', variant_sku: 'EP-LIL-UN-XS', variant_size: 'XS', unit_price: 499, quantity: 1, subtotal: 499, has_personalization: true, personalization_type: 'patch', personalization_data: { patch: 'estrella' }, personalization_cost: 120, product_image_url: '/products/IMG_1261.PNG', created_at: '2026-03-10' },
];

// ============================================
// Estilo Perrón — Database Types
// ============================================

// ---- Enums ----
export type AdminRole = 'super_admin' | 'admin' | 'editor';

export type WeightRange = 'muy_pequeno' | 'ligero' | 'pequeno_robusto' | 'mediano' | 'grandote' | 'gigante';

export type BodyType = 'delgado' | 'atletico' | 'standard' | 'robusto' | 'compacto';

export type DogSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type OrderStatus = 'pending' | 'paid' | 'in_preparation' | 'personalized' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PromotionType = 'percentage' | 'fixed_amount' | 'free_shipping';

export type PromotionAppliesTo = 'all' | 'collection' | 'category' | 'product';

export type InventoryMovementType = 'adjustment' | 'sale' | 'return' | 'restock' | 'correction';

export type PersonalizationType = 'text' | 'patch' | 'custom_field';

export type HomepageBlockType = 'promo_strip' | 'hero' | 'trust_strip' | 'product_mosaic' | 'campaign' | 'featured_products' | 'dog_registration_cta' | 'custom';

export type HomepageBlockTheme = 'pink' | 'red' | 'lime' | 'stone' | 'blue' | 'white' | 'aqua' | 'sunset';

// ---- Entities ----

export interface Admin {
  id: string;
  auth_user_id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  accepts_marketing: boolean;
  notes?: string;
  total_orders: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface CustomerAddress {
  id: string;
  customer_id: string;
  label: string;
  street: string;
  ext_number?: string;
  int_number?: string;
  neighborhood?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface DogProfile {
  id: string;
  customer_id?: string;
  name: string;
  photo_url?: string;
  breed?: string;
  weight_range?: WeightRange;
  weight_kg?: number;
  body_type?: BodyType;
  known_size?: DogSize;
  chest_cm?: number;
  neck_cm?: number;
  back_length_cm?: number;
  recommended_size?: DogSize;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_priority: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_priority: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  collection_id?: string;
  category_id?: string;
  base_price: number;
  compare_at_price?: number;
  cost?: number;
  is_featured: boolean;
  is_new: boolean;
  is_favorite: boolean;
  is_visible: boolean;
  is_archived: boolean;
  personalization_enabled: boolean;
  personalization_type?: PersonalizationType;
  personalization_cost: number;
  personalization_instructions?: string;
  personalization_extra_days: number;
  care_instructions?: string;
  tags: string[];
  seo_title?: string;
  seo_description?: string;
  display_priority: number;
  created_at: string;
  updated_at: string;
  // Relations
  collection?: Collection;
  category?: Category;
  variants?: ProductVariant[];
  images?: ProductImage[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  size: DogSize;
  color?: string;
  color_hex?: string;
  price: number;
  compare_at_price?: number;
  cost?: number;
  stock: number;
  low_stock_threshold: number;
  is_active: boolean;
  image_url?: string;
  weight_grams?: number;
  barcode?: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string;
  position: number;
  is_primary: boolean;
  created_at: string;
}

export interface InventoryMovement {
  id: string;
  variant_id: string;
  type: InventoryMovementType;
  quantity: number;
  previous_stock: number;
  new_stock: number;
  reason?: string;
  admin_id?: string;
  order_id?: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  total: number;
  shipping_name?: string;
  shipping_street?: string;
  shipping_neighborhood?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_postal_code?: string;
  shipping_phone?: string;
  payment_method?: string;
  payment_reference?: string;
  mercadopago_payment_id?: string;
  coupon_code?: string;
  promotion_id?: string;
  dog_profile_id?: string;
  has_personalization: boolean;
  internal_notes?: string;
  customer_notes?: string;
  shipped_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
  // Relations
  customer?: Customer;
  items?: OrderItem[];
  dog_profile?: DogProfile;
}

export interface OrderItem {
  id: string;
  order_id: string;
  variant_id?: string;
  product_title: string;
  variant_sku: string;
  variant_size?: string;
  variant_color?: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
  has_personalization: boolean;
  personalization_type?: PersonalizationType;
  personalization_data?: Record<string, string>;
  personalization_cost: number;
  product_image_url?: string;
  created_at: string;
}

export interface Promotion {
  id: string;
  title: string;
  description?: string;
  type: PromotionType;
  value: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  applies_to: PromotionAppliesTo;
  applies_to_id?: string;
  is_active: boolean;
  starts_at?: string;
  ends_at?: string;
  usage_limit?: number;
  usage_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  promotion_id: string;
  is_active: boolean;
  usage_limit: number;
  usage_count: number;
  created_at: string;
  promotion?: Promotion;
}

export interface HomepageBlock {
  id: string;
  block_type: HomepageBlockType;
  title?: string;
  subtitle?: string;
  body_text?: string;
  cta_text?: string;
  cta_url?: string;
  cta_secondary_text?: string;
  cta_secondary_url?: string;
  image_url?: string;
  secondary_image_url?: string;
  bg_color?: string;
  text_color?: string;
  theme?: HomepageBlockTheme;
  position: number;
  is_visible: boolean;
  config?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SizeRule {
  id: string;
  category_id?: string;
  weight_range?: WeightRange;
  body_type?: BodyType;
  recommended_size: DogSize;
  chest_min?: number;
  chest_max?: number;
  neck_min?: number;
  neck_max?: number;
  back_min?: number;
  back_max?: number;
  notes?: string;
  is_active: boolean;
  created_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  description?: string;
  updated_at: string;
}

// ---- Cart Types ----
export interface CartItem {
  variant_id: string;
  product_id: string;
  product_title: string;
  product_slug: string;
  variant_sku: string;
  variant_size: string;
  variant_color?: string;
  unit_price: number;
  compare_at_price?: number;
  quantity: number;
  image_url?: string;
  personalization?: {
    type: PersonalizationType;
    data: Record<string, string>;
    cost: number;
  };
  max_stock: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  total: number;
  coupon_code?: string;
  item_count: number;
}

// ---- UI Helpers ----
export const WEIGHT_RANGE_LABELS: Record<WeightRange, { label: string; emoji: string; range: string }> = {
  muy_pequeno: { label: 'Muy pequeñito', emoji: '🐾', range: '1–3 kg' },
  ligero: { label: 'Ligero', emoji: '🐕', range: '3–5 kg' },
  pequeno_robusto: { label: 'Pequeño pero fuerte', emoji: '💪', range: '5–8 kg' },
  mediano: { label: 'Mediano', emoji: '🦮', range: '8–15 kg' },
  grandote: { label: 'Grandote', emoji: '🐕‍🦺', range: '15–25 kg' },
  gigante: { label: 'Gigantón', emoji: '🐻', range: '25+ kg' },
};

export const BODY_TYPE_LABELS: Record<BodyType, { label: string; description: string }> = {
  delgado: { label: 'Delgado', description: 'Cuerpo estilizado y alargado' },
  atletico: { label: 'Atlético', description: 'Musculoso y proporcionado' },
  standard: { label: 'Estándar', description: 'Complexión promedio' },
  robusto: { label: 'Robusto', description: 'Pecho amplio y fuerte' },
  compacto: { label: 'Compacto', description: 'Cuerpo corto y sólido' },
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: 'Pendiente', color: 'status-pending' },
  paid: { label: 'Pagado', color: 'status-paid' },
  in_preparation: { label: 'En preparación', color: 'status-preparation' },
  personalized: { label: 'Personalizado', color: 'status-preparation' },
  shipped: { label: 'Enviado', color: 'status-shipped' },
  delivered: { label: 'Entregado', color: 'status-delivered' },
  cancelled: { label: 'Cancelado', color: 'status-cancelled' },
};

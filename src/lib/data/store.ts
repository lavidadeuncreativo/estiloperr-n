'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Product, ProductVariant, ProductImage, Collection, Category,
  HomepageBlock, Promotion, Coupon, Customer, DogProfile, Order,
  OrderItem, SizeRule, Setting, CartItem,
} from '../types';
import * as seed from './seed';

// ============================================
// DATA STORE — Single source of truth
// ============================================

interface DataStore {
  products: Product[];
  productVariants: ProductVariant[];
  productImages: ProductImage[];
  collections: Collection[];
  categories: Category[];
  homepageBlocks: HomepageBlock[];
  promotions: Promotion[];
  coupons: Coupon[];
  customers: Customer[];
  dogProfiles: DogProfile[];
  orders: Order[];
  orderItems: OrderItem[];
  sizeRules: SizeRule[];
  settings: Setting[];

  // Product accessors
  getProduct: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  getProductWithRelations: (slug: string) => (Product & { variants: ProductVariant[]; images: ProductImage[]; collection?: Collection; category?: Category }) | undefined;
  getProductsByCollection: (collectionSlug: string) => Product[];
  getProductsByCategory: (categorySlug: string) => Product[];
  getFeaturedProducts: () => Product[];
  getNewProducts: () => Product[];
  getFavoriteProducts: () => Product[];
  getVisibleProducts: () => Product[];
  getProductPrimaryImage: (productId: string) => string;
  getProductVariants: (productId: string) => ProductVariant[];
  getProductImages: (productId: string) => ProductImage[];

  // Collection/Category accessors
  getCollection: (slug: string) => Collection | undefined;
  getCategory: (slug: string) => Category | undefined;
  getVisibleCollections: () => Collection[];
  getVisibleCategories: () => Category[];

  // Homepage
  getVisibleHomepageBlocks: () => HomepageBlock[];

  // Orders
  getOrderWithItems: (id: string) => (Order & { items: OrderItem[]; customer?: Customer }) | undefined;

  // Settings
  getSetting: (key: string) => unknown;

  // CRUD mutations (admin)
  updateProduct: (id: string, data: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateVariant: (id: string, data: Partial<ProductVariant>) => void;
  addVariant: (variant: ProductVariant) => void;
  updateCollection: (id: string, data: Partial<Collection>) => void;
  addCollection: (collection: Collection) => void;
  updateCategory: (id: string, data: Partial<Category>) => void;
  addCategory: (category: Category) => void;
  updateHomepageBlock: (id: string, data: Partial<HomepageBlock>) => void;
  addHomepageBlock: (block: HomepageBlock) => void;
  deleteHomepageBlock: (id: string) => void;
  updateOrderStatus: (id: string, status: string) => void;
  updatePromotion: (id: string, data: Partial<Promotion>) => void;
  addPromotion: (promotion: Promotion) => void;
  addCoupon: (coupon: Coupon) => void;
  addDogProfile: (profile: DogProfile) => void;
  removeDogProfile: (id: string) => void;
  addOrder: (order: Order, items: OrderItem[]) => void;
}

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      // Initialize with seed data
      products: seed.products,
      productVariants: seed.productVariants,
      productImages: seed.productImages,
      collections: seed.collections,
      categories: seed.categories,
      homepageBlocks: seed.homepageBlocks,
      promotions: seed.promotions,
      coupons: seed.coupons,
      customers: seed.customers,
      dogProfiles: seed.dogProfiles,
      orders: seed.orders,
      orderItems: seed.orderItems,
      sizeRules: seed.sizeRules,
      settings: seed.settings,

      // ---- Accessors ----
      getProduct: (slug) => get().products.find(p => p.slug === slug && p.is_visible && !p.is_archived),
      getProductById: (id) => get().products.find(p => p.id === id),
      getProductWithRelations: (slug) => {
        const p = get().products.find(pr => pr.slug === slug && pr.is_visible);
        if (!p) return undefined;
        return {
          ...p,
          variants: get().productVariants.filter(v => v.product_id === p.id && v.is_active),
          images: get().productImages.filter(i => i.product_id === p.id).sort((a, b) => a.position - b.position),
          collection: get().collections.find(c => c.id === p.collection_id),
          category: get().categories.find(c => c.id === p.category_id),
        };
      },
      getProductsByCollection: (slug) => {
        const col = get().collections.find(c => c.slug === slug);
        if (!col) return [];
        return get().products.filter(p => p.collection_id === col.id && p.is_visible && !p.is_archived);
      },
      getProductsByCategory: (slug) => {
        const cat = get().categories.find(c => c.slug === slug);
        if (!cat) return [];
        return get().products.filter(p => p.category_id === cat.id && p.is_visible && !p.is_archived);
      },
      getFeaturedProducts: () => get().products.filter(p => p.is_featured && p.is_visible && !p.is_archived),
      getNewProducts: () => get().products.filter(p => p.is_new && p.is_visible && !p.is_archived),
      getFavoriteProducts: () => get().products.filter(p => p.is_favorite && p.is_visible && !p.is_archived),
      getVisibleProducts: () => get().products.filter(p => p.is_visible && !p.is_archived),
      getProductPrimaryImage: (productId) => {
        const img = get().productImages.find(i => i.product_id === productId && i.is_primary);
        return img?.url || get().productImages.find(i => i.product_id === productId)?.url || '/products/GAP foto 0.jpg';
      },
      getProductVariants: (productId) => get().productVariants.filter(v => v.product_id === productId),
      getProductImages: (productId) => get().productImages.filter(i => i.product_id === productId).sort((a, b) => a.position - b.position),
      getCollection: (slug) => get().collections.find(c => c.slug === slug && c.is_visible),
      getCategory: (slug) => get().categories.find(c => c.slug === slug && c.is_visible),
      getVisibleCollections: () => get().collections.filter(c => c.is_visible).sort((a, b) => a.display_priority - b.display_priority),
      getVisibleCategories: () => get().categories.filter(c => c.is_visible).sort((a, b) => a.display_priority - b.display_priority),
      getVisibleHomepageBlocks: () => get().homepageBlocks.filter(b => b.is_visible).sort((a, b) => a.position - b.position),
      getOrderWithItems: (id) => {
        const order = get().orders.find(o => o.id === id);
        if (!order) return undefined;
        return {
          ...order,
          items: get().orderItems.filter(i => i.order_id === id),
          customer: get().customers.find(c => c.id === order.customer_id),
        };
      },
      getSetting: (key) => {
        const s = get().settings.find(s => s.key === key);
        return s?.value;
      },

      // ---- Mutations ----
      updateProduct: (id, data) => set(state => ({
        products: state.products.map(p => p.id === id ? { ...p, ...data, updated_at: new Date().toISOString() } : p)
      })),
      addProduct: (product) => set(state => ({ products: [...state.products, product] })),
      deleteProduct: (id) => set(state => ({
        products: state.products.map(p => p.id === id ? { ...p, is_archived: true } : p)
      })),
      updateVariant: (id, data) => set(state => ({
        productVariants: state.productVariants.map(v => v.id === id ? { ...v, ...data, updated_at: new Date().toISOString() } : v)
      })),
      addVariant: (variant) => set(state => ({ productVariants: [...state.productVariants, variant] })),
      updateCollection: (id, data) => set(state => ({
        collections: state.collections.map(c => c.id === id ? { ...c, ...data, updated_at: new Date().toISOString() } : c)
      })),
      addCollection: (collection) => set(state => ({ collections: [...state.collections, collection] })),
      updateCategory: (id, data) => set(state => ({
        categories: state.categories.map(c => c.id === id ? { ...c, ...data, updated_at: new Date().toISOString() } : c)
      })),
      addCategory: (category) => set(state => ({ categories: [...state.categories, category] })),
      updateHomepageBlock: (id, data) => set(state => ({
        homepageBlocks: state.homepageBlocks.map(b => b.id === id ? { ...b, ...data, updated_at: new Date().toISOString() } : b)
      })),
      addHomepageBlock: (block) => set(state => ({ homepageBlocks: [...state.homepageBlocks, block] })),
      deleteHomepageBlock: (id) => set(state => ({
        homepageBlocks: state.homepageBlocks.filter(b => b.id !== id)
      })),
      updateOrderStatus: (id, status) => set(state => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status: status as Order['status'], updated_at: new Date().toISOString() } : o)
      })),
      updatePromotion: (id, data) => set(state => ({
        promotions: state.promotions.map(p => p.id === id ? { ...p, ...data, updated_at: new Date().toISOString() } : p)
      })),
      addPromotion: (promotion) => set(state => ({ promotions: [...state.promotions, promotion] })),
      addCoupon: (coupon) => set(state => ({ coupons: [...state.coupons, coupon] })),
      addDogProfile: (profile) => set(state => ({
        dogProfiles: [...state.dogProfiles, profile]
      })),
      removeDogProfile: (id) => set(state => ({
        dogProfiles: state.dogProfiles.filter(p => p.id !== id)
      })),
      addOrder: (order, items) => set(state => ({
        orders: [...state.orders, order],
        orderItems: [...state.orderItems, ...items],
      })),
    }),
    {
      name: 'estilo-perron-store',
      partialize: (state) => ({
        products: state.products,
        productVariants: state.productVariants,
        productImages: state.productImages,
        collections: state.collections,
        categories: state.categories,
        homepageBlocks: state.homepageBlocks,
        promotions: state.promotions,
        coupons: state.coupons,
        customers: state.customers,
        dogProfiles: state.dogProfiles,
        orders: state.orders,
        orderItems: state.orderItems,
        sizeRules: state.sizeRules,
        settings: state.settings,
      }),
    }
  )
);

// ============================================
// CART STORE
// ============================================

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => set(state => {
        const existing = state.items.find(i => i.variant_id === item.variant_id);
        if (existing) {
          return {
            items: state.items.map(i =>
              i.variant_id === item.variant_id
                ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.max_stock) }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (variantId) => set(state => ({
        items: state.items.filter(i => i.variant_id !== variantId),
      })),
      updateQuantity: (variantId, quantity) => set(state => ({
        items: quantity <= 0
          ? state.items.filter(i => i.variant_id !== variantId)
          : state.items.map(i => i.variant_id === variantId ? { ...i, quantity: Math.min(quantity, i.max_stock) } : i),
      })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getSubtotal: () => get().items.reduce((sum, i) => sum + (i.unit_price * i.quantity) + (i.personalization?.cost || 0), 0),
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 999 ? 0 : 149;
      },
      getTotal: () => get().getSubtotal() + get().getShippingCost(),
    }),
    {
      name: 'estilo-perron-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export interface Phone {
  id: string;
  brand: string;
  name: string;
  imageUrl: string;
  basePrice: number;
}

export interface CartItem extends Phone {
  quantity: number;
  selectedColor: string;
  selectedStorage: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (phone: Phone, color: string, storage: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

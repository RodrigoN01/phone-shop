export interface Phone {
  id: string;
  brand: string;
  name: string;
  imageUrl: string;
  basePrice: number;
  rating: number;
  description: string;
  colorOptions: [
    {
      hexCode: string;
      imageUrl: string;
      name: string;
    }
  ];
  storageOptions: [
    {
      capacity: string;
      price: number;
    }
  ];
  specs: {
    battery: string;
    mainCamera: string;
    os: string;
    processor: string;
    resolution: string;
    screen: string;
    screenRefreshRate: string;
    selfieCamera: string;
  };
  similarProducts: [
    {
      id: string;
      imageUrl: string;
      name: string;
      basePrice: number;
      brand: string;
    }
  ];
}

export interface CartItem extends Phone {
  quantity: number;
  selectedColor: string;
  selectedStorage: string;
  currentPrice: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (
    phone: Phone,
    color: string,
    storage: string,
    price: number
  ) => void;
  removeFromCart: (id: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

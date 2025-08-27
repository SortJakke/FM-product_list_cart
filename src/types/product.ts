export interface ProductImage {
  thumbnail: string
  mobile: string
  tablet: string
  desktop: string
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: ProductImage;
}

export interface CartItem {
  product: Product
  quantity: number
}
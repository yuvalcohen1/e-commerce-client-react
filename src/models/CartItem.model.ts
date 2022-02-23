import { ProductModel } from "./Product.model";

export interface CartItemModel {
  _id: string;
  quantity: number;
  cartId: string;
  product: ProductModel;
}

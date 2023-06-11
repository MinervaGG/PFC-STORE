import { CartKey } from "./CartKey.model";

export class ItemToCart{
    id: CartKey;
    cuantity: number;    
  constructor(
    id: CartKey, 
    cuantity: number, 
) {
    this.id = id
    this.cuantity = cuantity
  }    
}
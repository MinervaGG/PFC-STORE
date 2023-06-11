import { User } from "src/app/entities/user/model/user.model";
import { CartKey } from "./CartKey.model";
import { Item } from "src/app/entities/item/model/item.model";

export class ItemInCart{
    id: CartKey;
    user: User ;
    item: Item;
    cuantity: number;
  constructor(
    id: CartKey, 
    user: User ,
    item: Item,
    cuantity: number     
) {
    this.id = id
    this.user = user
    this.item = item
    this.cuantity = cuantity
  }    
}
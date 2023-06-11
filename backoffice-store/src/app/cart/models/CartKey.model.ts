export class CartKey{
    userId: string | undefined;
    itemId: number | undefined;
  constructor(
    userId: string | undefined, 
    itemId: number | undefined 
) {
    this.userId = userId
    this.itemId = itemId
  }    
}
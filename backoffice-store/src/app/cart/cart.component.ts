import { Component } from '@angular/core';
import { UserLoginService } from '../entities/user/service/user-login.service';
import { UserService } from '../entities/user/service/user.service';
import { Item } from '../entities/item/model/item.model';
import { Observable } from 'rxjs';
import { ItemInCart } from './models/ItemInCart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  alertMessage?: string;
  isError: boolean = false;
  userNick?: string | null;
  userId?: string | null;
  items?: Item[] =[];
  itemsInCart: ItemInCart[] = []

  constructor(private userLoginService: UserLoginService,
              private userService: UserService){}


  ngOnInit(): void {
    this.userNick = this.userLoginService.getNickUser();
    this.userId = this.userLoginService.getIdUser();
    this.setItemCart();
  }

  setItemCart(): void {
    var itemsCart : Observable<ItemInCart[]> = this.userService.getUserCart(this.userId!);
    itemsCart.subscribe({
      next: (data: any) => {
        this.itemsInCart = data;
      },
      error: (err) => {
        console.log(err);}
      })
  }

  increaseQuantity(itemCart: ItemInCart){
    itemCart.item.price /= itemCart.cuantity;
    itemCart.cuantity++;
    itemCart.item.price *= itemCart.cuantity;   
  }

  decreaseQuantity(itemCart: ItemInCart){
    if(itemCart.cuantity >= 2){
      itemCart.item.price /= itemCart.cuantity;
      itemCart.cuantity--;
      itemCart.item.price *= itemCart.cuantity;   
    }
    else {
      this.showAlert("No puedes comprar menos de 1 item");
    }
  }

  private showAlert(message: string): void {
    this.alertMessage = message;
    this.isError = true;
  }

  calculateTotalPrice(): number{
    var totalShoppingCart : number = 0;
    this.itemsInCart.forEach((item) => {
      totalShoppingCart += item.item.price;  
    })
    return totalShoppingCart;
  }
}

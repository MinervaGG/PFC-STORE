import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/userLogin.model';
import { Item } from '../../item/model/item.model';
import { ItemToCart } from 'src/app/cart/models/ItemToCart.model';
import { ItemInCart } from 'src/app/cart/models/ItemInCart.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public insert(user: User): Observable<User> {
    let urlEndpoint: string = "http://localhost:8080/store/users/";
    return this.http.post<User>(urlEndpoint, user);
  }

  public getUserById(userId: string): Observable<User> {
    let urlEndpoint: string = "http://localhost:8080/store/users/" + userId;
    return this.http.get<User>(urlEndpoint);
  }

  public login(userLogin: UserLogin): Observable<string> {
    let urlEndpoint: string = "http://localhost:8080/store/users/login/";
    return this.http.post(urlEndpoint, userLogin , {responseType: 'text'});
  }

  public addItemToFavorite(userId: string, itemId: number): Observable<any> {
    let urlEndpoint: string = "http://localhost:8080/store/users/" +userId + "/favorites/" + itemId;
    return this.http.put(urlEndpoint, {});
  }

  public getUserFavorites(userId: string): Observable<Item[]> {
    let urlEndpoint: string = "http://localhost:8080/store/users/" +userId + "/favorites";
    return this.http.get<Item[]>(urlEndpoint);
  }

  public removeItemFromFavorite(userId: string, itemId: number): Observable<any> {
    let urlEndpoint: string = "http://localhost:8080/store/users/" +userId + "/favorites/" + itemId;
    return this.http.delete(urlEndpoint);
  }

  public isItemFavorite(userId: string, itemId: number): Observable<any> {
    let urlEndpoint: string = "http://localhost:8080/store/users/" +userId + "/favorites/" + itemId;
    return this.http.get(urlEndpoint);
  }

  public addItemToCart(userId: string, item: ItemToCart): Observable<any> {
    let urlEndpoint: string = "http://localhost:8080/store/users/" +userId + "/cart";
    return this.http.put(urlEndpoint, item);
  }

  public getUserCart(userId: string): Observable<ItemInCart[]> {
    let urlEndpoint: string = "http://localhost:8080/store/users/" +userId + "/cart";
    return this.http.get<ItemInCart[]>(urlEndpoint);
  }
}

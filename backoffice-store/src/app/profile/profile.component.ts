import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../entities/user/service/user-login.service';
import { Item } from '../entities/item/model/item.model';
import { UserService } from '../entities/user/service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  alertMessage?: string;
  isCorrect?: boolean;

  constructor(private userLoginService: UserLoginService,
              private userService: UserService){}

  userNick?: string | null;
  userId?: string | null;
  items?: Item[] = [];

  ngOnInit(): void {
    this.userNick = this.userLoginService.getNickUser();
    this.userId = this.userLoginService.getIdUser();
    this.setItemFavorites();
  }

  setItemFavorites(): void {
    var itemsFavoritos : Observable<Item[]> = this.userService.getUserFavorites(this.userId!);
    itemsFavoritos.subscribe({
      next: (data: any) => {
        this.items = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);}
      })
  }

  deleteFavorite(itemId: number) {
    if (this.userLoginService.getIdUser() != null){
      var userId = this.userLoginService.getIdUser();
      this.userService.removeItemFromFavorite(userId!, itemId).subscribe({
        next: (data: any) => {
          console.log(data);
          this.showAlert("Eliminado correctamente");
          this.setItemFavorites();

        },
        error: (err: any) => {console.log(err);}
      })
    }
  }

  private showAlert(message: string): void {
    this.alertMessage = message;
    this.isCorrect = true;
  }

}
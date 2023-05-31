import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  userNick?: string;
  userName?: string;
  userSurname?: string;
  userTelephone?: string;
  userEmail?: string;
  userPassword?: string;

  user?: User;


  isError?: boolean;
  alertMessage?: string;


  constructor(){}

  ngOnInit(): void {
   
  }

  public createUser(){
    if(!this.userExist()){
      this.user = new User(this.userNick!, this.userName!, this.userSurname!, this.userEmail!, this.userPassword!, this.userTelephone);
      console.log(this.user);

    }    
  }

  public userExist(): boolean{
    this.handleError("Ese usuario ya existe");
    return false;

  }

  private handleError(err: any): void {
    this.isError = true;
    this.alertMessage = err;
  }
}

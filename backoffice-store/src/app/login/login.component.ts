import { Component, OnInit } from '@angular/core';
import { UserService } from '../entities/user/service/user.service';
import { User } from '../entities/user/model/user.model';
import { UserLogin } from '../entities/user/model/userLogin.model';
import { UserLoginService } from '../entities/user/service/user-login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  userNick?: string;
  userPassword?: string;
  user?: User;
  
  alertMessage?: string;
  isError: boolean = false;

  constructor(private userService: UserService,
              private userLoginService: UserLoginService,
              private location: Location){}

  ngOnInit(): void {
  }

  public login(){
    if(this.userNick && this.userPassword){     
      
      const userLogin = new UserLogin(this.userNick, this.userPassword) 
      console.log(userLogin);
      
      this.userService.login(userLogin).subscribe({
        next: (itemRequest) => {
          if (itemRequest) {
            this.userLoginService.setIdUser(itemRequest);
            this.userLoginService.setNickUser(userLogin.nick);          
            this.location.back(); 
          }
        },
        error: (err) => {
          if (err.status == "401")
            this.handleError("Contraseña incorrecta")
          if (err.status == "404")
            this.handleError("Usuario no existe");}
      })
   }
  } 

  private handleError(err: any): void {
    this.isError = true;
    this.alertMessage = err;    
  } 
}
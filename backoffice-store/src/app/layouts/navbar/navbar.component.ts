import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLoginService } from 'src/app/entities/user/service/user-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy, OnInit{

  userNick: string | null = null;
  userId: string | null = null;
  private userSubscription: Subscription;

  constructor(private userLoginService: UserLoginService, private route: Router){
    this.userSubscription = this.userLoginService.userChange.subscribe((nick => {
       this.userNick = nick;
       this.userId = this.userLoginService.getIdUser();
      }));
  }

  logOut(){
    this.userLoginService.removeUser()
    this.route.navigateByUrl('');
  }  

  ngOnInit(): void {
    this.userNick = this.userLoginService.getNickUser();
    this.userId = this.userLoginService.getIdUser();
  }
 
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }  
}

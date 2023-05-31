import { Component, OnInit } from '@angular/core';
import { UserService } from '../entities/user/service/user.service';
import { User } from '../entities/user/model/user.model';

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
  isCorrect: boolean = false;
  isError: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit(): void {
  }

  public checkIfUserExist(){
    console.log(this.userNick);
    console.log(this.userPassword);

    this.userService.getUserById(this.userNick!).subscribe({
      next: (itemRequest) => {
        this.user = itemRequest;
      },
      error: (err) => {this.handleError(err);}
    })

  }

  private handleError(err: any): void {
    this.isError = true;
    this.alertMessage = err;
  }

  private showAlert(message: string): void {
    this.alertMessage = message;
    this.isCorrect = true;
  }

    
  
}

import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user/model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../entities/user/service/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
/** 
  userNick?: string;
  userName?: string;
  userSurname?: string;
  userTelephone?: string;
  userEmail?: string;
  userPassword?: string;

*/
  user?: User;

  isError?: boolean;
  alertMessage?: string;
  isCorrect: boolean = false;


  userForm?: FormGroup;


  constructor(private fb: FormBuilder,
              private userService: UserService){}

  ngOnInit(): void {
   this.buildForm();
  }

  private buildForm(): void {
    this.userForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: [ '', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    var password = form.get('password')!.value;
    var repeatPassword = form.get('repeatPassword')!.value;

    if (password !== repeatPassword)
    {
      form.get('repeatPassword')?.setErrors({passwordMismatch: true});
    }
  }

  private createFromForm(): User {
    return {
      ...this.user,
      id: this.userForm?.get(['id'])!.value,
      name: this.userForm?.get(['name'])!.value,
      surname: this.userForm?.get(['surname'])!.value,
      email: this.userForm?.get(['email'])!.value,
      password: this.userForm?.get(['password'])!.value,
      telephone: this.userForm?.get(['telephone'])!.value
    };
  }

  public createUser(){
    const user = this.createFromForm();
    this.insertUser(user);
  }

  private insertUser(userToCreate: User): void{
    this.userService.insert(userToCreate).subscribe({
      next: (userCreated) => {
        console.log("Creado correctamente");
        console.log(userCreated);
        this.showAlert("Creado correctamente")
      },
      error: (err) => {this.handleError(err);}
    })
  }
/**

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
  **/
  private handleError(err: any): void {
    this.isError = true;
    this.alertMessage = err;
  }

  private showAlert(message: string): void {
    this.alertMessage = message;
    this.isCorrect = true;
  }
}

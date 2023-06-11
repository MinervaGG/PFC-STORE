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
      nick: ['', [Validators.required, Validators.minLength(6)]],
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
      id: undefined,
      nick: this.userForm?.get(['nick'])!.value,
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

  private insertUser(userToCreate: User){
      this.userService.insert(userToCreate).subscribe({
      next: (userCreated) => {
        this.showAlert("Usuario " + userCreated.nick + " correctamente")
      },
      error: (err) => {this.handleError("Ya existe un usuario con ese nick");}
    })
  }  
    
  private handleError(err: any): void {
    this.isCorrect = false;
    this.isError = true;
    this.alertMessage = err;
  }

  private showAlert(message: string): void {
    this.isError = false;
    this.alertMessage = message;
    this.isCorrect = true;
  }
}

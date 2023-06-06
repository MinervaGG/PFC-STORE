import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/userLogin.model';

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
}

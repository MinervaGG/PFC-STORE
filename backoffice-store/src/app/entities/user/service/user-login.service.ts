import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  userChange: EventEmitter<string|null> = new EventEmitter<string|null>();

  getNickUser(): string | null{
    return localStorage.getItem('userNick');
  }

  getIdUser(): string | null{
    return localStorage.getItem('userID');
  }

  setIdUser (userId: string): void {
    localStorage.setItem('userID', userId);
  }

  setNickUser (userNick: string): void {
    localStorage.setItem('userNick', userNick);
    this.userChange.emit(userNick);
  }

  removeUser(): void {
    localStorage.removeItem('userID');
    localStorage.removeItem('userNick');
    this.userChange.emit(null);
  }
}

import { Item } from "../../item/model/item.model";

export class User{
    id: number | undefined;
    nick: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    favorites?: Item[];
    telephone?: string;

  constructor(
    id: number | undefined, 
    nick: string,
    name: string, 
    surname: string,    
    email: string,
    password: string,
    favorites?: Item[],
    telephone?: string
) {
    this.id = id
    this.nick = nick
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.favorites = favorites
    this.telephone = telephone
  }    
}
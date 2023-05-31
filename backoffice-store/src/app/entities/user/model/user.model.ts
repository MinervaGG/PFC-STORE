export class User{
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    telephone?: string;

  constructor(
    id: string, 
    name: string, 
    surname: string,    
    email: string,
    password: string,
    telephone?: string
) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.telephone = telephone
  }    
}
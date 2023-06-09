import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../model/item.model';
import { UserService } from '../../user/service/user.service';
import { UserLoginService } from '../../user/service/user-login.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit{

  categoryId?: number;
  title: string = "";
  items: Item[] = [];

  page: number = 0;
  size: number = 25;
  sort: string = "name,asc";

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;

  nameFilter?: string;
  priceFilter?: number;

  itemIdToDelete?: number;

  alertMessage?: string;
  isCorrect: boolean = false;

  userId?: string | null;

  constructor(private route: ActivatedRoute,
              private itemService: ItemService,
              private userService: UserService,
              private userLoginService: UserLoginService){}

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get("categoryId")){
      this.categoryId = +this.route.snapshot.paramMap.get("categoryId")!;
      this.title = "Articulos de la categoria " + this.categoryId;
    } else {
      this.title = "Lista de articulos";      
    }
    this.getAllItems();

    this.userId = this.userLoginService.getIdUser();
    console.log("Favoritos: " + this.userId);

  }



  public nextPage(): void{
    this.page = this.page + 1;
    this.getAllItems();
  }

  public previousPage(): void{
    this.page = this.page - 1;
    this.getAllItems();
  }

  public searchByFilters():void{
    this.getAllItems();
  }

  public prepareItemToDelete(itemId: number): void{
    this.itemIdToDelete = itemId;
  }

  public deleteItem():void{
    if (this.itemIdToDelete){
      this.itemService.deleteItem(this.itemIdToDelete!).subscribe({
      next: (data) => {
        this.getAllItems();
      },
      error: (err) => {this.handleError(err)}
      })
    }    
  }

  private buildFilters(): string | undefined{
    const filters: string[] = [];

    if (this.categoryId){
      filters.push("category.id:EQUAL:" + this.categoryId);
    }

    if(this.nameFilter){
      filters.push("name:MATCH:" + this.nameFilter);
    }

    if(this.priceFilter){
      filters.push("price:LESS_THAN_EQUAL:" + this.priceFilter);
    }

    if (filters.length > 0){
      
      let globalFilters: string = "";
      for ( let filter of filters){
        globalFilters = globalFilters + filter + ",";
      }
      globalFilters = globalFilters.substring(0, globalFilters.length - 1);
      return globalFilters;
    } else {
      return undefined;
    }
  }

  private getAllItems(): void{

    const filters: string | undefined = this.buildFilters();

    this.itemService.getAllItems(this.page, this.size, this.sort, filters).subscribe({
      next: (data: any) => {
        this.items = data.content;
        this.first = data.first;
        this.last = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        
        this.items.forEach(element => {
          this.setItemFavorite(element.id!);
        });
        
      },
      error: (err) => {this.handleError(err);}
    })
  }

  addFavorite(itemId: number) {
    // primera linea se puede quitar si ya se accede solo cuadno el usuario esta registrado
    if (this.userLoginService.getIdUser() != null){
      var userId = this.userLoginService.getIdUser();
      this.userService.addItemToFavorite(userId!, itemId).subscribe({
        next: (data: any) => {
          console.log(data);
          this.showAlert("Añadido a favotitos");
          this.setItemFavorite(itemId);
        },
        error: (err) => {this.handleError(err);}
      })
    }
  }
    
  deleteFavorite(itemId: number) {
    if (this.userLoginService.getIdUser() != null){
      var userId = this.userLoginService.getIdUser();
      this.userService.removeItemFromFavorite(userId!, itemId).subscribe({
        next: (data: any) => {
          console.log(data);
          this.showAlert("Eliminado correctamente");
          this.setItemFavorite(itemId);
        },
        error: (err: any) => {this.handleError(err);}
      })
    }
  }

  setItemFavorite(itemId: number): void {
    if (this.userId == undefined)
    {
      return;
    }

    this.userService.isItemFavorite(this.userId!, itemId).subscribe({
      next: (data: boolean) => {
        this.items.forEach(element => {
          if (element.id == itemId){
            element.favorite = data;
          }
        });
      },
      error: (err: any) => {
        this.handleError(err);
      }
    })
  }

  private handleError(error: any): void{
    console.log(error);
  }

  private showAlert(message: string): void {
    this.alertMessage = message;
    this.isCorrect = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{
  categories: Category[] = [];
  categoryIdToDelete?: number;

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void{
    this.categoryService.getAllCategories().subscribe({
      next: (categoriesRequest) => {this.categories = categoriesRequest; },
      error: (err) => {this.handleError(err);}
    })
  }

  private handleError(error: any): void{
    console.log(error);
  }

  public prepareItemToDelete(categoryId: number): void{
    this.categoryIdToDelete = categoryId;
  }
  
  public deleteItem():void{
    if (this.categoryIdToDelete){
      this.categoryService.deleteCategory(this.categoryIdToDelete!).subscribe({
      next: (data) => {
        this.getCategories();
      },
      error: (err:any) => {this.handleError(err)}
      })
    }    
  }  
}
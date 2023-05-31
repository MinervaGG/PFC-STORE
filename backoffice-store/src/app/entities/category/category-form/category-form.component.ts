import { Component } from '@angular/core';
import { Category } from '../model/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  mode: "NEW" | "UPDATE" = "NEW";
  categoryId?: number;
  category?: Category;
  selectedCategory?: Category;
  categories: Category[] = [];

  isError: boolean = false;
  alertMessage?: string;
  isCorrect: boolean = false;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService){}

  ngOnInit(): void {

    const entryParam: string = this.route.snapshot.paramMap.get("categoryId") ?? "new";

    if (entryParam !== "new"){
      this.categoryId = +this.route.snapshot.paramMap.get("categoryId")!;
      this.mode = "UPDATE";
      this.getCategoryById(this.categoryId!);
    } else {
      this.mode = "NEW";
      this.initializeCategory();
    }
  }

  public getAllCategories(event?: any): void{
    let categorySearch: string | undefined;
    if ( event?.query){
      categorySearch = event.query;
    }
    this.categoryService.getAllCategories(categorySearch).subscribe({
      next: (categoriesFiltered) => {this.categories = categoriesFiltered; },
      error: (err) => {this.handleError(err);}
    })
  }

  public saveCategory(): void{
    if (this.mode === "NEW"){
      this.insertCategory();
    }
    
    if (this.mode === "UPDATE"){
      this.updateCategory();
    }
  }

  public includeImageInCategory(event: any): void {
    const inputFile = event.target as HTMLInputElement;
    const file: File | null = inputFile.files?.item(0) ?? null;

    this.readFileAsString(file!).then(
      (result) => {
        const imageType: string = this.getImageType(result);
        console.log(imageType);
        const imageBase64: string = this.getImageBase64(result);
        console.log(imageBase64);

        this.category!.image = imageBase64;
      },
      (error) => {
        console.log("No se pudo cargar la imagen")
      }
    )
  }

  private getImageType(imageString: string): string {
    const imageStringParts: string[] = imageString.split(",");
    if (imageStringParts.length == 2){
      return imageStringParts[0];
    } else {
      return "";
    }
  }

  private getImageBase64(imageString: string): string {
    const imageStringParts: string[] = imageString.split("/9j/");
    if (imageStringParts.length == 2){
      return imageStringParts[1];
    } else {
      return "";
    }
  }

  private readFileAsString(file: File){
    return new Promise<string>(function(resolve, reject){
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        resolve(this.result as string)
      }
    })
  }

  private insertCategory(): void{
    this.categoryService.insert(this.category!).subscribe({
      next: (categoryInserted) => {
        console.log("Insertado correctamente");
        console.log(categoryInserted);
        this.showAlert("Insertado correctamente")
      },
      error: (err) => {this.handleError(err);}
    })
  }

  private updateCategory(): void {
    this.categoryService.update(this.category!).subscribe({
      next: (categoryUpdated) => {
        console.log("Modificado correctamente");
        console.log(categoryUpdated);
        this.showAlert("Modificado correctamente")
      },
      error: (err) => {this.handleError(err);}
    })
  }

  private getCategoryById(categoryId: number){
    this.categoryService.getCategoryId(categoryId).subscribe({
      next: (categoryRequest) => {
        this.category = categoryRequest;
        this.selectedCategory = new Category(categoryRequest.id!, categoryRequest.name!, categoryRequest.description, categoryRequest.image);
      },
      error: (err) => {this.handleError(err);}
    })
  }

  private initializeCategory(): void {
    this.category = new Category (undefined, "" );
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

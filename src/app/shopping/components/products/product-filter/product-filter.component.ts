import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
    categories$! : Observable<any[]>;
    @Input('category') category!: string | null;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
   }

  ngOnInit(): void {
  }

}

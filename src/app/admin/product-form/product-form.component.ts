import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: any;
  product : any = {};
  id:string | null;  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private producdService: ProductService) { 
    this.categories$ =  categoryService.getCategories();
     this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
       this.producdService.get(this.id).pipe(take(1))
        .subscribe(p => {
            this.product = p
        })
    } 
  }

  ngOnInit(): void {
  }

  save(product:any){
    if(this.id){
        this.producdService.update(this.id, this.product);
    }else{
        this.producdService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete the product?')) return;
    if(this.id){
        this.producdService.delete(this.id);
        this.router.navigate(['/admin/products']);
    }
  }
}
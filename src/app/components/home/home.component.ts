import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../templates/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { SearchService } from '../../services/search.service';
import { debounceTime, distinctUntilChanged, startWith, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  products: Array<IProduct> = new Array<IProduct>();
  filteredBy: string = '';
  private subscription: Subscription = new Subscription();


  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {

  }


  /**
   * intially fetch all the product on the page load but if the search term is provided then filter the products based on the search term
   */
  ngOnInit(): void {
    this.subscription.add(
      this.searchService.searchText$.pipe(
        startWith(''),
        switchMap((term: string) => {
          if (term.trim() === '') {
            return this.productService.getProducts();
          } else {
            this.filteredBy = term;
            return this.productService.filterProducts('name', term);
          }
        })
      ).subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        }
      })
    );
  }


  /**
   * 
   * @param term search term to filter the products
   */
  fetchProducts(term: string): void {
    this.productService.filterProducts('name', term).subscribe(products => {
      this.products = products;
    });
  }


  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

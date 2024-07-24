import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrderListModule } from 'primeng/orderlist';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, OrderListModule, CurrencyFormatPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  searchControl = new FormControl();
  products: Array<IProduct> = new Array<IProduct>();

  /**
   * 
   * tracks the change in search input value and filters the product to list in the dropdown of the search bar
   */
  constructor(
    private router: Router,
    private productService: ProductService,
    private searchService: SearchService
  ) {
    this.searchControl.valueChanges.pipe(
      filter(query => query !== null),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        return this.productService.filterProducts('name', query)
      })
    ).subscribe((results: Array<IProduct>) => {
      this.products = results;
    });
  }


  /**
   * emits the search term to the search service and navigates to the products page if the current route is not products page
   */
  emitSearchTerm() {
    if (this.router.url !== '/products' && this.router.url !== '/') {
      this.router.navigate(['/products/']);
    }
    setTimeout(() => {
      if (this.searchControl.value) {
        this.searchService.emitSearchTerm(this.searchControl.value);
        this.searchControl.reset();
      }
    }, 0);
  }


  /**
   * 
   * @param product product id whose details is to be shown in the details page
   * navigate to product details page when the user double clicks on the dropdown item in the search bar
   */
  navigateToProductDetails(product: IProduct) {
    this.searchControl.reset();
    this.router.navigate(['/products', product.id]);
  }



}

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

  isExpanded: boolean = false;
  searchControl = new FormControl();
  products: Array<IProduct> = new Array<IProduct>();

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


  navigateToProductDetails(product: IProduct) {
    this.searchControl.reset();
    this.router.navigate(['/products', product.id]);
  }


  toggleSearch() {
    this.isExpanded = true;
  }

  collapseSearch() {
    this.isExpanded = false;
  }
}

import { Component } from '@angular/core';
import { ProductCardComponent } from '../../templates/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: Array<IProduct> = new Array<IProduct>();
  constructor(private productService : ProductService) {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
   }

}

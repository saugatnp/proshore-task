import { Component, Input, input } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Router } from '@angular/router';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CardModule, ButtonModule , CurrencyFormatPipe, HighlightDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  constructor(
    private router: Router
  ) { }

  navigateToProductDetails(id : number){
    this.router.navigate(['/products', this.product.id]);
  }

}

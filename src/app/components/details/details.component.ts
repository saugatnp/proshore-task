import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule,CurrencyFormatPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  productId!: string;
  product!: IProduct;


  private subscription: Subscription = new Subscription();


  /**
   * gets id from the parameter and fetches the product details based on the id
   * subscription is added to the subscription array
   */
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.subscription.add(
      this.route.paramMap.pipe(
        switchMap(params => {
          this.productId = params.get('id')!;
          return this.fetchProductDetails(parseInt(this.productId));
        })
      ).subscribe({
        next: (product: IProduct) => {
          this.product = product;
        },
        error: (error) => {
          console.error(error);
        }
      })
    )
  }



  /**
   * 
   * @param id id of the product whose data is to be fetched
   * @returns details of the product
   */
  fetchProductDetails(id: number): Observable<IProduct> {
    return this.productService.getProductById(id);
  }




  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: IProduct[] | null = null;

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<any> {
    if (this.products) {
      return of(this.products);
    } 
    else {
      return this.http.get<IProduct[]>('products').pipe(
        tap(products => this.products = products)
      );
    }
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`products/${id}`);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`products/${product.id}`, product);
  }

  filterProducts(type: string = 'name' , filter : string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`products?${type}_like=${filter}`);
  }
}

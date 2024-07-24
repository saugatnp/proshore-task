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

  /**
   * 
   * @returns all the products from the server if the local variable products is null else returns the local variable products
   */
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


  /**
   * 
   * @param id id of the product whose details are to be fetched
   * @returns details of the product
   */
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`products/${id}`);
  }


  /**
   * 
   * @param product product to be added to the server
   */
  addProduct(product: IProduct): Observable<IProduct> {
    this.products = null;
    return this.http.post<IProduct>('products', product);
  }


  /**
   * 
   * @param product product to be added to the server
   * @returns the product added to the server
   */
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`products/${product.id}`, product);
  }






  // TODO: add different type of filter parameters


  /**
   * 
   * @param type the parameter through with data is to be filtered
   * @param filter the value through which data is to be filtered
   * @returns list of filtered products
   */
  filterProducts(type: string = 'name', filter: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`products?${type}_like=${filter}`);
  }
}

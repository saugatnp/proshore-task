import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchText = new Subject<string>();

  //observable
  searchText$ = this.searchText.asObservable();

  /**
   * 
   * @param term the text entered by user which is used to filter the products
   */
  emitSearchTerm(term: string): void {
    this.searchText.next(term);
  }
}

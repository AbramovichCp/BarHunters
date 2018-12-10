import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private searchResultHeaderSource = new BehaviorSubject<boolean>(false);
  currentsearchResultHeader = this.searchResultHeaderSource.asObservable();

  constructor() {}

  changesearchResultHeader(searchResultHeader: boolean) {
    this.searchResultHeaderSource.next(searchResultHeader);
  }
}

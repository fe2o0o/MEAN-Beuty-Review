import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  isLoad:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isLoad$ = this.isLoad.asObservable()
  hide() {
    this.isLoad.next(false)
  }

  show() {
    this.isLoad.next(true)
  }

}

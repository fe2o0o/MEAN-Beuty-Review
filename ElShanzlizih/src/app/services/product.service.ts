import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) { }
  userToken:any = localStorage.getItem('userToken')
  getAllProduct():Observable<any> {
    return this._HttpClient.get('http://localhost:4000/api/v1/products/allProducts')
  }


  getSpacificProduct(id: any): Observable<any>{
    return this._HttpClient.get(`http://localhost:4000/api/v1/products/product/${id}`)
  }

  addComment(data: any): Observable<any>{
    return this._HttpClient.post('http://localhost:4000/api/v1/comments/', data, {
      headers: {
        token: `${localStorage.getItem('userToken')}`
      }
    })
  }


  addToCart(data:any): Observable<any>{
    return this._HttpClient.post('http://localhost:4000/api/v1/cart/addToCart', data, {
      headers: {
        token:`${localStorage.getItem('userToken')}`
      }
    })
  }

  getUserCart(): Observable<any>{
    return this._HttpClient.get('http://localhost:4000/api/v1/cart/', {
      headers: {
        token:`${localStorage.getItem('userToken')}`
      }
    })
  }

  updateUserCart(data: any): Observable<any>{
    return this._HttpClient.put('http://localhost:4000/api/v1/cart/updateCart', data, {
      headers: {
        token:`${localStorage.getItem('userToken')}`
      }
    })
  }

}

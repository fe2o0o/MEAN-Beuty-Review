import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _Router:Router ,  private _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken') != null) {
      this.isLogin()
      this._Router.navigate(['/home'])
    }
  }

  userData = new BehaviorSubject<any>(null)


  isLogin() {
    const inCoded = JSON.stringify(localStorage.getItem('userToken'))
    const decoded = jwtDecode(inCoded)
    this.userData.next(decoded)
  }

  logOut() {
    localStorage.clear();
    this.userData.next(null)
    this._Router.navigate(['/account'])
  }

  signup(data:any):Observable<any> {
    return this._HttpClient.post('http://localhost:4000/api/v1/auth/signup',data)
  }

  login(data:any): Observable<any>{
      return this._HttpClient.post('http://localhost:4000/api/v1/auth/login',data)
  }
}

import { Injectable } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private _LoaderService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._LoaderService.show()
    return next.handle(request).pipe(
      finalize(()=>{setTimeout(()=>{this._LoaderService.hide()},100)})
    );
  }
}

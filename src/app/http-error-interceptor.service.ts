import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
 } from '@angular/common/http';
 import { Observable, throwError } from 'rxjs';
 import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)

     .pipe(

       retry(1),

       catchError((error: HttpErrorResponse) => {

         let errorMessage = '';

         if (error.error instanceof ErrorEvent) {

           // client-side error

           errorMessage = `Clientseitiger Fehler\nError: ${error.error.message}`;

         } else {

           // server-side error

           errorMessage = `Serverseitiger Fehler\nError Code: ${error.status}\nMessage: ${error.message}`;

         }

         window.alert(errorMessage);

         return throwError(errorMessage);

       })

     )
  }
}

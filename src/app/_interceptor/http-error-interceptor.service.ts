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

  /*
  * Method for catching any component-wide error and displyaing error code to user with popup
  * Used in app.module in the providers section
  */
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

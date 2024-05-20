import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators'; // Import the timeout operator

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Set the timeout value (in milliseconds)
    const timeoutValue = 10000; // Adjust the timeout value as needed

    // Intercept the request and apply the timeout operator
    return next.handle(request).pipe(
      timeout(timeoutValue)
    );
  }
}

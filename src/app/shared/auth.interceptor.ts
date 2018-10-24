import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.appendAuthParam(req.params)
      .pipe(switchMap((params) => {
        const reqWithAuth = req.clone({ params });
        return next.handle(reqWithAuth);
      }));
  }

  private appendAuthParam(params: HttpParams): Observable<HttpParams> {
    return from(this.authService.getToken())
      .pipe(map(authToken => params.append('auth', authToken)));
  }
}

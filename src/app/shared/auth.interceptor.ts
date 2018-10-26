import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.appendAuthParam(req.params)
      .pipe(switchMap((params) => {
        const reqWithAuth = req.clone({ params });
        return next.handle(reqWithAuth);
      }));
  }

  private appendAuthParam(params: HttpParams): Observable<HttpParams> {
    return this.store.select('auth')
      .pipe(
        take(1),
        map(authState => params.append('auth', authState.token))
      );
  }
}

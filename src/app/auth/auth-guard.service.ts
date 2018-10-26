import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<AppState>) { }

  canActivate(): Observable<boolean> {
    return this.store
      .select('auth')
      .pipe(
        take(1),
        map(authState => authState.isAuthenticated),
      );
  }
}

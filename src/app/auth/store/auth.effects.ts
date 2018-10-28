import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';

import * as authApi from '../auth-api-gateway';

import {
  TrySignup,
  TRY_SIGNUP,
  TRY_SIGNIN,
  SET_TOKEN,
  SIGNUP,
  SIGNIN,
  LOGOUT,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup$ = this.actions$
    .ofType(TRY_SIGNUP)
    .pipe(
      map((action: TrySignup) => action.payload),
      switchMap(authApi.createUser),
      switchMap(authApi.getToken),
      tap(() => this.router.navigate(['/'])),
      mergeMap((token: string) => [
        { type: SIGNUP },
        { type: SET_TOKEN, payload: token },
      ]),
    );

  @Effect()
  authSignin$ = this.actions$
    .ofType(TRY_SIGNIN)
    .pipe(
      map((action: TrySignup) => action.payload),
      switchMap(authApi.signin),
      switchMap(authApi.getToken),
      tap(() => this.router.navigate(['/'])),
      mergeMap((token: string) => [
        { type: SIGNIN },
        { type: SET_TOKEN, payload: token },
      ]),
    );

  @Effect({ dispatch: false })
  authLogout$ = this.actions$
    .ofType(LOGOUT)
    .pipe(
      map(authApi.logout),
      tap(() => this.router.navigate(['/']),
    ));

  constructor(private actions$: Actions, private router: Router) { }
}

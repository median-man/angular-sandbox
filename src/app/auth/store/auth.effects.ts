import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import {
  TrySignup,
  TRY_SIGNUP,
  TRY_SIGNIN,
  SET_TOKEN,
  SIGNUP,
  SIGNIN,
  LOGOUT,
} from './auth.actions';

const fbAuth = {
  createUser: ({email, password}) => from(
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
  ),

  signin: ({email, password}) => from(
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
  ),

  getToken: () => from(firebase.auth().currentUser.getIdToken()),

  logout: () => from(firebase.auth().signOut()),
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup$ = this.actions$
    .ofType(TRY_SIGNUP)
    .pipe(
      map((action: TrySignup) => action.payload),
      switchMap(fbAuth.createUser),
      switchMap(fbAuth.getToken),
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
      switchMap(fbAuth.signin),
      switchMap(fbAuth.getToken),
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
      map(fbAuth.logout),
      tap(() => this.router.navigate(['/']),
    ));

  constructor(private actions$: Actions, private router: Router) { }
}

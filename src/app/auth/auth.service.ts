import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '';

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.getToken())
      .catch(console.log);
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.getToken())
      .catch(console.log);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token);
    return this.token;
  }
}

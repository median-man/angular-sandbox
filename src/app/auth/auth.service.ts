import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(console.log);
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/']))
      .catch(console.log);
  }

  getToken(): Promise<string> {
    return firebase.auth().currentUser.getIdToken();
  }

  isAuthenticated() {
    return firebase.auth().currentUser ? true : false;
  }

  logout() {
    return firebase.auth().signOut();
  }
}

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { from, Observable } from 'rxjs';

const config = {
  apiKey: 'AIzaSyAUo2z0lamzjTOHYMyxTw2dAFTox8qzWYc',
  authDomain: 'angular-sandbox-5fd45.firebaseapp.com',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export const createUser = ({email, password}): Observable<any> => from(
  firebase.auth().createUserWithEmailAndPassword(email, password)
);

export const signin = ({email, password}): Observable<any> => from(
  firebase.auth().signInWithEmailAndPassword(email, password)
);

export const getToken = (): Observable<string> => from(firebase.auth().currentUser.getIdToken());

export const logout = (): Observable<void> => from(firebase.auth().signOut());

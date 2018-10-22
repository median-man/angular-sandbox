import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAUo2z0lamzjTOHYMyxTw2dAFTox8qzWYc',
      authDomain: 'angular-sandbox-5fd45.firebaseapp.com',
    });
  }
}

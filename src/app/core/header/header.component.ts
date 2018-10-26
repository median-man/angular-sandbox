import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from 'src/app/store/app.reducers';
import { Logout } from 'src/app/auth/store/auth.actions';
import { FetchRecipes, SaveRecipes } from 'src/app/recipes/store/recipe.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated = this.store
      .select('auth')
      .pipe(map(({ isAuthenticated }) => isAuthenticated));
  }

  onSaveData = () => this.store.dispatch(new SaveRecipes());

  onFetchData = () => this.store.dispatch(new FetchRecipes());

  onSignout = () => this.store.dispatch(new Logout());
}

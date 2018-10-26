import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store/app.reducers';
import { Logout } from 'src/app/auth/store/auth.actions';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private dataStorageSvc: DataStorageService,
  ) {
    this.isAuthenticated = this.store
      .select('auth')
      .pipe(map(({ isAuthenticated }) => isAuthenticated));
  }

  onSaveData = () => this.dataStorageSvc
    .storeRecipes()
    .subscribe(
      (data) => console.log(data)
    )

  onFetchData = () => this.dataStorageSvc
    .getRecipes()
    .subscribe(
      (data) => console.log(data)
    )

  onSignout = () => this.store.dispatch(new Logout());
}

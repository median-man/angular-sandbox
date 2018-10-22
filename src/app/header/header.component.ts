import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dataStorageSvc: DataStorageService) { }

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
}

import { Component, Output, EventEmitter } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() goToPage = new EventEmitter<string>();

  navClick(pageName: string) {
    this.goToPage.emit(pageName);
  }
}

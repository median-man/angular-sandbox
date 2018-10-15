import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  constructor(private el: ElementRef) {
  }

  @HostListener('click') onclick() {
    this.isOpen = !this.isOpen;
  }
}

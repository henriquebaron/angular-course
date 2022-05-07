import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') open = false;

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event']) toggleOpen(eventData: Event): void {
    /* Enables the dropdown to be closed by clicking elsewhere on the page. Now the listener
    listens to clicks on the document (not on the element) and checks if the click was on the element. */
    this.open = this.elementRef.nativeElement.contains(eventData.target) ? !this.open : false;
  }

}

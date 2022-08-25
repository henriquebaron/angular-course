import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  // The ViewContainerRef provides the reference to the "place" in the DOM where the element calling the directive is placed
  constructor(public viewContainerRef: ViewContainerRef) {}
}

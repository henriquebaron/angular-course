import { Directive, ElementRef } from '@angular/core';

@Directive({
  /* Converted the directive to standalone. For this reason, the
   * SharedModule has been deleted altogether. The only element it
   * contained was the HighlightDirective. */
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = '#5f5aee';
    this.element.nativeElement.style.color = 'black';
    this.element.nativeElement.style.padding = '0.5rem';
  }
}

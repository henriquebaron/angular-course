import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    /* Acessing the element directly, as used in the other directive, is not a good practice.
    Using the renderer is the best way to access the DOM. In some cases, like services, for example,
    acessing the element directly would not even work. */
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }

}

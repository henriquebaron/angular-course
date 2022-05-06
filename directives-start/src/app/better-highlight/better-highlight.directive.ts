import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  // The HostBinding decorator binds to a property of the element using the directive.
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    /* Acessing the element directly, as used in the other directive, is not a good practice.
    Using the renderer is the best way to access the DOM. In some cases, like services, for example,
    acessing the element directly would not even work. */
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }

  // The HostListener decorator listents to an event from the element using the directive.
  @HostListener('mouseenter') mouseHover(eventData: Event) { 
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = 'transparent';
  }

}

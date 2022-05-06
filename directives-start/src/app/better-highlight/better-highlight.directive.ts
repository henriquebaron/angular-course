import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { defaultCoreCipherList } from 'constants';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  /* It is possible to give a property a name (or alias, like in the example) equal to the name of the directive.
  This will "simplify" the way of calling the directive. See the HTML code. */
  @Input('appBetterHighlight') highlightColor: string = 'blue';
  // The HostBinding decorator binds to a property of the element using the directive.
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    /* Acessing the element directly, as used in the other directive, is not a good practice.
    Using the renderer is the best way to access the DOM. In some cases, like services, for example,
    acessing the element directly would not even work. */
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
  }

  // The HostListener decorator listents to an event from the element using the directive.
  @HostListener('mouseenter') mouseHover(eventData: Event) { 
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }

}

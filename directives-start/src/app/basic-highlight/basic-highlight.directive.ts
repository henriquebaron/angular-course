import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
	// Declaring the selector IN square brackets allows it to be used OUTSIDE square brackets in the template code
	selector: '[appBasicHighlight]'
})

export class BasicHighlightDirective implements OnInit {
	/* Using the access modifier keyword (i.e. private) in the constructor automatically declares the
	constructor argument as a new property of the class */
	constructor(private elementRef: ElementRef) { }

	ngOnInit(): void {
		this.elementRef.nativeElement.style.backgroundColor = 'green';
	}
}
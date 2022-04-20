import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  /* The view encapsulation behavior explained on the CSS file of this component
  can be changed by using the property below, which is an enum with three values:
  Emulated: is the default behavior (unnecessary as used below). Angular encapsulates views with attributes on
    the HTML elements of the component.
  None: No encapsulation at all. This means that all entries on the component CSS file will be global!
  ShadowDom: Encapsulates views with the Shadow DOM technology, so that no automatic attributes are added, though
    retaining the encapsulation function. Shadow DOM is not supported on every browser, though. */
  encapsulation: ViewEncapsulation.Emulated
})

/* It is a good practice to always declare which interfaces are being used, even though the
code would work if OnChanges were not declared, for example */
export class ServerElementComponent implements OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  // The @Input() decorator is necessary to expose a property of the component to other components
  // An alias can be given between the parentheses
  @Input('srvElement') element: { type: string, name: string, content: string };
  /* The object "element" has been replaced by a primitive type (a string) to allow to test the 
  ngOnChanges method. This way it is possible to see te differences in the value of the property on the console. */
  @Input() name: string;
  /* The reference to the HTML tag here was created to show the content of the HTML elements at 
  each point in time. See the console logs on ngOnInit and ngAfterViewInit, for example. */
  @ViewChild('heading', {static: true}) header: ElementRef;

  constructor() {
    console.log('Constructor called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('Text content: ' + this.header.nativeElement.textContent);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInitCalled');
  }
  
  ngAfterContentChecked(): void {
    console.log('ngAfterContentCheckedCalled');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInitCalled');
    console.log('Text content: ' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewCheckedCalled');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }

}

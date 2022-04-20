import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

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
export class ServerElementComponent implements OnInit {
  // The @Input() decorator is necessary to expose a property of the component to other components
  // An alias can be given between the parentheses
  @Input('srvElement') element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }

}

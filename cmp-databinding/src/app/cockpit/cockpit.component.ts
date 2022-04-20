import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // Using the @Output() decorator and the EventEmitter class enables the creation of custom events for a component
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  // newServerContent = '';
  
  /* When referencing an element from the template directly on the TS code (with the @ViewChild decorator)
  the object type is ElementRef, and not the type of the HTML element like seen on the example of the argument
  of the method onAddServer. */
  @ViewChild('serverContentInput', { static: true }) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  /* Since the two-way databinding was replaced with an HTML tag, the server name is passed as 
  whole HTML object. */
  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      // The property ElementRef.nativeElement returns the referenced HTML element, i.e. HTMLInputElement
      /* IT IS NOT recommended to WRITE elements on the DOM this way (here I'm only reading). For writing,
      string interpolation or property binding are more suitable ways. */
      serverContent: this.serverContentInput.nativeElement.value})
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value})
  }
}

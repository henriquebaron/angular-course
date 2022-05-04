import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navigated = new EventEmitter<string>();
  collapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onNavigate(page: string): void {
    this.navigated.emit(page);
  }

}

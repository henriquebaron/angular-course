import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServer(id: number): void {
    // Doing some task, to later navigate away
    /* The "navigationExtras" object can inlude the "queryParams" and "fragment" properties as well, which
    also resolves to the address /servers/<id>/edit?allowEdit=1#loading */
    this.router.navigate(['/servers', id, 'edit'], {queryParams: { allowEdit: '1'}, fragment: 'loading'});
  }

}

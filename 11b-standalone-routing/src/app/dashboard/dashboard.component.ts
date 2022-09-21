import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  /* RouterModule has to be imported here, since standalone
   * components are totally decoupled from any modules (which
   * would centralize necessary imports).
   * The template code of this component uses the routerLink
   * directive, contained in the RouterModule */
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}

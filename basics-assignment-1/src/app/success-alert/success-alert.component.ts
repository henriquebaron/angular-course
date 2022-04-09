import { Component } from "@angular/core";

@Component({
	selector: 'app-success-alert',
	template: '<h3>This is a success message</h3>',
	styles: [`
		h3 {
			color: darkgreen;
			background-color: #232323;
		}
	`]
})

export class SuccessAlertComponent {

}
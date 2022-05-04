import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', { static: false }) nameInput: ElementRef | undefined;
  @ViewChild('amountInput', { static: false }) amountInput: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(): void {
    const name: string = this.nameInput?.nativeElement.value;
    const amount: number = this.amountInput?.nativeElement.value;
    this.ingredientAdded.emit(new Ingredient(name, amount));
  }

}

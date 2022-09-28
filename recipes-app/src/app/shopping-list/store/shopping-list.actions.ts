import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

/* Important thing about reducers: every action is dispatched through ALL REDUCERS
 * of the application. For example, actions dispacthed to the Auth reducer also pass
 * by here.
 * For this reason, the value of the Action type, defined by these constants, must be
 * unique in the application. So, it is a good practice to create these constants with
 * a "feature prefix", to avoid type identifier clashes. */
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient'
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient implements Action {
  readonly type: string = ADD_INGREDIENT;

  constructor(public payload: Ingredient) { }
}

export class AddIngredients implements Action {
  readonly type: string = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) { }
}

export class UpdateIngredient implements Action {
  readonly type: string = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient ) { }
}

export class DeleteIngredient implements Action {
  readonly type: string = DELETE_INGREDIENT;

  constructor(public payload: any = null) { }
}

export class StartEdit implements Action {
  readonly type: string = START_EDIT;

  constructor(public payload: number) { }
}

export class StopEdit implements Action {
  readonly type: string = STOP_EDIT;

  constructor(public payload: any = null) { }
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;

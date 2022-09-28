import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shoppint-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
};

/* In the Redux pattern, the state is immutable (read-only), and changes are made
 * with pure functions only -- functions that receive input and produce output *without
 * changing the inputs*.
 * That is why a new object is returned, and the spread operator is used in the returned
 * object to include a copy of the previous state. */
export function shoppingListReducer(state: { ingredients: Ingredient[] } = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT: // By convention, action types are written uppercase
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    default:
      return state;
  }
}

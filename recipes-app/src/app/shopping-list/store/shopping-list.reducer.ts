import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

/* In the Redux pattern, the state is immutable (read-only), and changes are made
 * with pure functions only -- functions that receive input and produce output *without
 * changing the inputs*.
 * That is why a new object is returned, and the spread operator is used in the returned
 * object to include a copy of the previous state. */
export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT: // By convention, action types are written uppercase
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...(action.payload as Ingredient[])]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex] // Fetches the ingredient to be updated
      const updatedIngredient = { // Immutable pattern: Creates a copy of the ingredient to change...
        ...ingredient,            // ...spreading the current properties
        ...action.payload // ...and then spreading the properties of the new object
      };
      // Immutable pattern: don't change the ingredients array, but rather create a copy from the object
      const updatedIngredients = [...state.ingredients];
      // On the newly copied array, change the element to the new ingredient (also a copied object)
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        // Immutable pattern: the "filter" function always returns a copy of the array.
        // The arrow function inside will include in the returned array the elements for which the
        // expression returns "true".
        ingredients: state.ingredients.filter((ing, index) => {
          return index !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}

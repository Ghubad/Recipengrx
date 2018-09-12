import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
	recipes: State;
}

export interface State {
	recipes: Recipe[];
}

const initialState: State = {
	recipes: [
		new Recipe(
			'Raghavendra Vada Pav',
			'Super tasty! Miss loads',
			'https://upload.wikimedia.org/wikipedia/commons/1/15/Vada_Paav-The_Mumbai_Burger.jpg',
			[ new Ingredient('Potato', 1), new Ingredient('Pav', 20) ]
		),
		new Recipe(
			'Pani Puri',
			'Thelewala near Avadhoot.. Yummy!!!!!',
			'https://c1.staticflickr.com/9/8585/16646268480_c7894e1149_b.jpg',
			[ new Ingredient('Puri', 2), new Ingredient('White peas', 1) ]
		)
	]
};
export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
	switch (action.type) {
		case RecipeActions.SET_RECIPES:
			return {
				...state,
				recipes: [ ...action.payload ]
			};
		case RecipeActions.ADD_RECIPE:
			return {
				...state,
				recipes: [ ...state.recipes, action.payload ]
			};
		case RecipeActions.UPDATE_RECIPE:
			const recipe = state.recipes[action.payload.index];
			const updatedRecipe = {
				...recipe,
				...action.payload.updatedRecipe
			};
			const recipes = [ ...state.recipes ];
			recipes[action.payload.index] = updatedRecipe;
			return {
				...state,
				recipes: recipes
			};
		case RecipeActions.DELETE_RECIPE:
			const delrecipes = [ ...state.recipes ];
			delrecipes.splice(action.payload, 1);
			return {
				...state,
				recipes: delrecipes
			};
		default:
			return state;
	}
}

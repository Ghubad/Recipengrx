import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class RecipeService { 
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'Raghavendra Vada Pav',
            'Super tasty! Miss loads',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Vada_Paav-The_Mumbai_Burger.jpg',
            [
                new Ingredient('Potato', 1),
                new Ingredient('Pav', 20)
            ]
        ),
        new Recipe(
            'Pani Puri',
            'Thelewala near Avadhoot.. Yummy!!!!!',
            'https://c1.staticflickr.com/9/8585/16646268480_c7894e1149_b.jpg',
            [
                new Ingredient('Puri', 2),
                new Ingredient('White peas', 1)
            ]
        ),
    ];
    

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}

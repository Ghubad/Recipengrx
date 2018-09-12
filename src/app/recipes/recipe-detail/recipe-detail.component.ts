import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Observable } from 'rxjs';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipeState: Observable<fromRecipe.State>;
    index: number;
    
    constructor(private store: Store<fromRecipe.FeatureState>,
        private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.index = +params['index'];
                this.recipeState = this.store.select('recipes');
            });
  }
    
    logNewIngredients() {
        this.store.select('recipes').
            pipe(take(1))
            .subscribe((recipeState: fromRecipe.State) => {
                this.store.dispatch(new ShoppingListActions.AddIngredients(
                    recipeState.recipes[this.index].ingredients));
            })
        
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onDeleteRecipe() {
        this.store.dispatch(new RecipeActions.DeleteRecipe(this.index));
        this.router.navigate(['/recipes']);
    }

}

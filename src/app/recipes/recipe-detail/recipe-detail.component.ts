import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipedetail: Recipe;
    index: number;
    
    constructor(private store: Store<fromApp.AppState>,
        private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router) { }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.index = +params['index'];
                this.recipedetail = this.recipeService.getRecipe(this.index);
            });
  }
    
    logNewIngredients() {
        this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipedetail.ingredients));
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.index);
        this.router.navigate(['/recipes']);
    }

}

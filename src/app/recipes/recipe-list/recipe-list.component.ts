import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: [ './recipe-list.component.css' ]
})
    
    
export class RecipeListComponent implements OnInit {

    subscription: Subscription;
    recipeState: Observable<fromRecipe.State>; 
    
    constructor(private store: Store<fromRecipe.FeatureState>) {
    }

    ngOnInit() {
        this.recipeState = this.store.select('recipes');
     }
    
  
  
}

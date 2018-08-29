import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
    private authService: AuthService) { }

    storeRecipes() {
        // const token = this.authService.getToken();

        // firebase doesnt accept authorization headers thats why commented here
        // const headers = new HttpHeaders().set('Authorization','kjdfhjsjfsfjn');
        // const params = new HttpParams().set('auth', token);

        const req = new HttpRequest('PUT', 'https://ghubad-ng-recipe-book.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            reportProgress: true
            // params: params
        });
        return this.httpClient.request(req);

		// return this.httpClient.put(
		// 	'https://ghubad-ng-recipe-book.firebaseio.com/recipes.json',
        //     this.recipeService.getRecipes(), {
        //         observe: 'body',
        //         params: params
        //         // headers: headers
        //     }
		// );
	}

    getRecipes() {
        // const token = this.authService.getToken();

		this.httpClient
            .get<Recipe[]>('https://ghubad-ng-recipe-book.firebaseio.com/recipes.json', {
                observe: 'body',
                responseType: 'json'
            })
			.pipe(
            map((recipes) => {
                console.log(recipes);
					for (let recipe of recipes) {
						if (!recipe['ingredients']) {
							recipe['ingredients'] = [];
						}
					}
                    return recipes;
				})
			)
			.subscribe((recipes: Recipe[]) => {
				this.recipeService.setRecipes(recipes);
			});
	}
}

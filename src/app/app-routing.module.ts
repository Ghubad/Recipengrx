import { NgModule } from "../../node_modules/@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "../../node_modules/@angular/router";
import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes = [
    // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}
   
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
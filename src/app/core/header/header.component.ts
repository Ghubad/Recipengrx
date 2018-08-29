import { Component } from "@angular/core";
import { Response } from "@angular/http";

import { DataStorageService } from "../../shared/data-storage.service";
import { AuthService } from "../../auth/auth.service";
import { HttpEvent } from "@angular/common/http";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService) { }
    
    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe(
                (value: HttpEvent<any>) => {
                    // console.log('Header component response: ', value);
                }
            );
    }
    
    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
      }
}
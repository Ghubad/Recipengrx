import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	title = 'app';

	ngOnInit() {
		firebase.initializeApp({
			apiKey: 'AIzaSyA3Wb9FrJOISrGitgxzapAy7cijTGSIR90',
			authDomain: 'ghubad-ng-recipe-book.firebaseapp.com'
		});
	}
}

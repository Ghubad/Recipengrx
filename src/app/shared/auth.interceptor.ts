import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpProgressEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        console.log('Intercepted!' + req);
        const copiedReq = req.clone({
            // headers: req.headers.set('', ''),
            params: req.params.set('auth', this.authService.getToken()),
            // reportProgress: req.reportProgress
        });
        return next.handle(req);
    }
}
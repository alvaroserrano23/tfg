import { Injectable } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http'
import {UserAuthenticationService} from './userAuthentication.service'


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private userAuthenticationService: UserAuthenticationService) { }

  intercept(req, next) {
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userAuthenticationService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }

}
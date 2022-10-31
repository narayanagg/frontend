import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private toastr: ToastrService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const authToken = `Bearer ${this._auth.getToken()}`;
    if (authToken != null) {
      req = req.clone({
        setHeaders: {
          Authorization: authToken,
        },
      });
    }
    return next.handle(req).pipe(
      tap(
        () => {
          console.log('success handler');
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err, 'err');

            if (err.status === 401 || err.status === 403) {
              this._auth.logout();
              this._router.navigate(['/login']);
            }
          }
        }
      )
    );
  }
}

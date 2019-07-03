import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likersParams = 'Likers';
    constructor(private userService: UserService, private route: Router, private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null , this.likersParams).pipe(
            catchError(error => {
                this.alertify.error('problem in retriving data');
                // tslint:disable-next-line: no-unused-expression
                this.route.navigate['/home'];
                return of(null);
            })
        );
    }
}

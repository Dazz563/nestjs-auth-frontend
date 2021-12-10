import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export class UserModel {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirm?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private snackbar: MatSnackBar,

    ) { }



    register(newUser: UserModel) {
        this.http.post<UserModel>('http://localhost:3000/api/auth/register', newUser)
            .subscribe({
                next: (userRes: UserModel) => {
                    console.log(userRes);
                    if (userRes) {
                        this.snackbar.open('Welcome', `${userRes.first_name} ${userRes.last_name}`, {
                            duration: 4000,
                            verticalPosition: 'bottom'
                        });

                        this.router.navigateByUrl('/dashboard');
                    }
                },
                error: (error) => {
                    if (error) {
                        this.snackbar.open('Problem', `${error.error.message}`, {
                            duration: 4000,
                            verticalPosition: 'bottom'
                        });

                        return;
                    }
                }
            })
    }

    login(newUser: UserModel) {
        this.http.post<UserModel>('http://localhost:3000/api/auth/login', newUser)
            .subscribe({
                next: (userRes: UserModel) => {
                    console.log(userRes);
                    if (userRes) {
                        this.snackbar.open('Welcome back', `${userRes.first_name} ${userRes.last_name}`, {
                            duration: 4000,
                            verticalPosition: 'bottom'
                        });

                        this.router.navigateByUrl('/dashboard');
                    }
                },
                error: (error) => {
                    if (error) {
                        this.snackbar.open('Problem', `${error.error.message}`, {
                            duration: 4000,
                            verticalPosition: 'bottom'
                        });

                        return;
                    }
                }
            })
    }

    logout() {
        this.http.post<UserModel>('http://localhost:3000/api/auth/logout', {})
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/login');

                },
                error: (error) => {

                }
            })
    }


}
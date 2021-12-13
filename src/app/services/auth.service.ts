import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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
    private isLoggedin = new BehaviorSubject(false);

    constructor(
        private http: HttpClient,
        private router: Router,
        private snackbar: MatSnackBar,
    ) { }

    isAuthenticated() {
        return this.isLoggedin.asObservable();
    }

    register(newUser: UserModel) {
        // this.http.post<UserModel>('http://localhost:3000/api/auth/register', newUser)
        this.http.post<UserModel>('/api/auth/register', newUser)
            .subscribe({
                next: (userRes: UserModel) => {
                    console.log(userRes);
                    if (userRes) {
                        this.snackbar.open('Success', `You have registered successfully`, {
                            duration: 4000,
                            verticalPosition: 'bottom'
                        });

                        this.router.navigateByUrl('/login');
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
        // this.http.post<UserModel>('http://localhost:3000/api/auth/login', newUser)
        this.http.post<UserModel>('/api/auth/login', newUser)
            .subscribe({
                next: (userRes: UserModel) => {
                    console.log(userRes);
                    if (userRes) {
                        this.snackbar.open('Welcome back', `${userRes.first_name} ${userRes.last_name}`, {
                            duration: 4000,
                            verticalPosition: 'bottom'
                        });

                        this.isLoggedin.next(true);

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
        // this.http.post<UserModel>('http://localhost:3000/api/auth/logout', {})
        this.http.post<UserModel>('/api/auth/logout', {})
            .subscribe({
                next: () => {
                    this.isLoggedin.next(false);

                    this.router.navigateByUrl('/login');

                },
                error: (error) => {

                }
            })
    }

    forgotPassword(email: string) {
        // this.http.post<UserModel>('http://localhost:3000/api/auth/logout', email)
        this.http.post('/api/reset-password/forgot-password', email)
            .subscribe({
                next: () => {
                    this.snackbar.open('Success', `An email has been sent`, {
                        duration: 4000,
                        verticalPosition: 'bottom'
                    });
                },
                error: (error) => {
                    this.snackbar.open('Problem', `This email does not exist!`, {
                        duration: 4000,
                        verticalPosition: 'bottom'
                    });
                }
            })
    }

    restPassword(resetData: any) {
        // this.http.post<UserModel>('http://localhost:3000/api/auth/logout', email)
        this.http.post('/api/reset-password', resetData)
            .subscribe({
                next: () => {
                    this.snackbar.open('Success', `Your password was updated`, {
                        duration: 4000,
                        verticalPosition: 'bottom'
                    });

                    this.router.navigateByUrl('/login');
                },
                error: (error) => {
                    this.snackbar.open('Problem', `Something went wrong!`, {
                        duration: 4000,
                        verticalPosition: 'bottom'
                    });
                }
            })
    }


}
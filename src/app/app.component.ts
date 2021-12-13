import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: ((isAuth: boolean) => {
        console.log('Am I logged in: ', isAuth); // testing auth can be used to show hide things in the DOM
      }),
      error: () => { }
    });
  }
}

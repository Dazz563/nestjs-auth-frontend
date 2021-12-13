import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const email: string = this.forgotForm.value;

    this.authService.forgotPassword(email);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  token: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      password_confirm: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.token = this.route.snapshot.params['token'];

    let data = {
      password: this.resetForm.value.password,
      password_confirm: this.resetForm.value.password_confirm,
      token: this.token
    }

    this.authService.restPassword(data);
  }

}

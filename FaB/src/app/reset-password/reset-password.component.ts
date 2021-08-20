import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';
import { AuthenticationService } from '../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted = false;
  loading: boolean = false;
  token:any;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, public router: Router, public toastrService: ToastrService, private route: ActivatedRoute) {
    this.createForm();
  }

  createForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      this.loading = false;
      return;
    }
    this.resetPasswordForm.value['token'] = this.token;
    this.authenticationService.resetPassword(this.resetPasswordForm.value).subscribe(result => {
      if (result.message) this.toastrService.success(result.message);
      var redirectUrl;
      redirectUrl = "/login";
      this.router.navigate([redirectUrl]);
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
      this.toastrService.error(err.error.message);
    });
  }

  verifyToken() {
    this.token = this.route.snapshot.params['token'];
    const body = { token: this.token };
    this.authenticationService.checkTokenIsValid(body).subscribe(result => {
    }, err => {
      if (err.error.message) this.toastrService.error(err.error.message);
      this.router.navigate(['/forgot']);
    });
  }
  ngOnInit() {
    this.verifyToken();
  }

}

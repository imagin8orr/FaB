import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  fogotForm: FormGroup;
  submitted = false;
  loading: boolean = false;
  showMessage: boolean = false;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, public router: Router, public toastrService: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.fogotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() { return this.fogotForm.controls; }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.fogotForm.invalid) {
      this.loading = false;
      return;
    }
    this.authenticationService.forgotPassword(this.fogotForm.value).subscribe(result => {
      if (result.message) this.toastrService.success(result.message);
      this.showMessage = true;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
      this.toastrService.error(err.error.message);
    });
  }


}

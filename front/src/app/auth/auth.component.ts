import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css',
],
encapsulation: ViewEncapsulation.ShadowDom,
})
export class AuthComponent implements OnInit {

  user: User = new User();
  userLogin: User = new User();
  errorMessage: string = '';
  errorMessageLogin: string = '';
  mailcheck: string = '';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/login']);
      return;
    }
  }

  login() {
    this.authenticationService.login(this.userLogin).subscribe(
      (data) => {
        if (data.enabled == false) {
          this.errorMessageLogin = 'check your data';
        }
        if (data.role === 'USER') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      (err) => {
        if (err?.status === 409) {
          this.errorMessageLogin = 'account is not verified';
        } else {
          this.errorMessageLogin = 'account is not verified: ';
          console.log(err);
        }
      }
    );
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html', 
  styleUrls: ['./sign-up.component.css',
  '../../../assets/sign/fonts/material-icon/css/material-design-iconic-font.min.css',
  '../../../assets/sign/css/style.css',
],
encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {

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
      this.router.navigate(['/sign']);
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe(
      (data) => {
        //this.router.navigate(['/login']);
        this.mailcheck = 'Please verify your email CHECK YOUR EMAIL';
      },
      (err) => {
        if (err?.status === 409) {
          this.errorMessage = 'Username alrady exist';
        } else {
          this.errorMessage = 'Unxpected error. Erro is: ' + err?.errorMessage;
          console.log(err);
        }
      }
    );
  }

}

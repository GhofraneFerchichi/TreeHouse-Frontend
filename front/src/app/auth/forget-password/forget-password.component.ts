import { ResetServiceService } from 'src/app/services/reset-service.service';

import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { ResetPass } from 'src/app/models/reset-pass';

@Component({
  selector: 'app-reset-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css',]
})
export class ResetPasswordComponents implements OnInit {
  resetpass: ResetPass =  new ResetPass();
  //token!:string

  constructor(private ResetServiceService: ResetServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
      let token = params['token'];
      console.log(token);
      this.resetpass.token = token
      // Print the parameter to the console.
  });
    console.log(this.resetpass.token)
  }

  resetPassword(){
    this.ResetServiceService.postResetPassword(this.resetpass.password).subscribe((data) => {
      this.router.navigate(['/auth'])
    })

  }
  checkPasswordMatch(fieldConfirmPassword:any) {
    if (fieldConfirmPassword.value != $("#password").val()) {
        fieldConfirmPassword.setCustomValidity("Passwords do not match!");
    } else {
        fieldConfirmPassword.setCustomValidity("");
    }
}



}

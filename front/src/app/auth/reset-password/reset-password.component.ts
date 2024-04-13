
import { ResetServiceService } from 'src/app/services/reset-service.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css',

],
encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit {

  constructor(private ResetServiceService: ResetServiceService) { }
  Useremail: string = ""
  ngOnInit(): void {

  }

  ForgetPassword(){
    this.ResetServiceService.forgetPassword(this.Useremail).subscribe((data) => {
    })
    }
}

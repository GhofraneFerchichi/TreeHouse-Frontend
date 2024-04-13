import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  '../../../assets/front/css/style.css',
  '../../../assets/front/css/slick.css',
  '../../../assets/front/css/responsive.css',
  '../../../assets/front/css/nice-select.css',
  '../../../assets/front/css/magnific-popup.css',
  '../../../assets/front/css/jquery.nice-number.min.css',
  '../../../assets/front/css/font-awesome.min.css',
  '../../../assets/front/css/default.css',
  '../../../assets/front/css/bootstrap.min.css',
  '../../../assets/front/css/animate.css'
],
encapsulation: ViewEncapsulation.ShadowDom,
})
export class HomeComponent implements OnInit {
  currentUser : User = new User();

  constructor(private authenticationService :AuthenticationService, private router: Router,private route: ActivatedRoute, private toastr: ToastrService ) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data
    })
  }

  isAdmin(){
    return this.currentUser?.role === Role.ADMIN
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login'])
  }

 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const showToast = params['showToast'];
      if (showToast === 'true') {
        this.toastr.success('Votre Commande est Confirmée');
      }
    });
  }
}



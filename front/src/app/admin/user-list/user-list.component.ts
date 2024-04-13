import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css',
    '../../../assets/fournitures/css/bootstrap.min.css',
    '../../../assets/fournitures/css/tiny-slider.css' ,
    '../../../assets/fournitures/css/style.css',
    '../../../assets/fournitures/css/stylecard.scss',
],
encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit {

  usersList: Array<User> = [];

  p: number=1;
  constructor(public userService: AuthenticationService) {}
  ngOnInit(): void {
    return this.getUsersList();
  }

  getUsersList(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.usersList = data;
    });
  }


  onDelete(user: User) {}



}

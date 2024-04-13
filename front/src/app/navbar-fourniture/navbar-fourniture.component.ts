import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-fourniture',
  templateUrl: './navbar-fourniture.component.html',
  styleUrls: ['./navbar-fourniture.component.css']
})
export class NavbarFournitureComponent implements OnInit {
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    // Assign currentUser$ to the Observable returned by authService.currentUser
    this.currentUser$ = this.authService.currentUser;
  }

  logOut(): void {
    // Call the logout method of the authentication service
    this.authService.logOut();
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://172.173.184.146:9010/api/authentication';
  private baseupdateurl = 'http://172.173.184.146:9010/user';

  storageUserAsStr: any = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '{}')
    : null;

  public currentUser!: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }
    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/sign-in', user).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(this.baseupdateurl + '/register', user);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseupdateurl + '/getUsers');
  }

  updateUser(user: User): Observable<any> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.storageUserAsStr.token}`,
      },
    };
    return this.http.put(this.baseupdateurl + '/update', user, config);
  }

}


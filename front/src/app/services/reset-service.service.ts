import { HttpClient } from '@angular/common/http';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetServiceService {

  constructor(private httpClient: HttpClient) { }

  forgetPassword(email:string):Observable<any>{
    return this.httpClient.post<any>('http://172.171.81.145:9010/api/reset/forgot_password?email='+email, {})
  }

  getResetPassword(token:string):Observable<any>{
    return this.httpClient.get<any>('http://172.171.81.145:9010/api/reset/reset_password?token='+token)
  }

  postResetPassword(reset: String):Observable<any>{
    return this.httpClient.post<any>('http://172.171.81.145:9010/api/reset/reset_password', reset)
  }

}
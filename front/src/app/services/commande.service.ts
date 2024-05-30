import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = 'http://172.173.184.146:9009/api/v1/mcommandes'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  validerCommande(panierId: number, userId: number, prixTotal: number, adresse: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/validercommande/${panierId}?userId=${userId}&prixTotal=${prixTotal}&adresse=${adresse}`, {});
  }

  getCommandesWithProducts(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/commandes`);
  }

}
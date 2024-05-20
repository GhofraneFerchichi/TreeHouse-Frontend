import { BehaviorSubject, Observable, map, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { Panier } from '../models/panier';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  // Get the current user's ID

  baseUrl = 'http://51.8.66.238:9904/api/v1/mproduits';
  panierUrl = 'http://51.8.67.167:9005/api/v1/mpanier';
  private apiUrl = 'http://51.8.66.92:9009/api/v1/mcommandes'; // Update with your backend URL

  product: Product = new Product(0, '', '', '', 0, 0, new Panier());
  panier: Panier = new Panier();
  
  dataForm: FormGroup; // Declare dataForm property
  storageUserAsStr: any = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '{}')
    : null;
    

  public currentUser!: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  private cartProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private httpClient: HttpClient) {
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

  setDataForm(form: FormGroup) {
    this.dataForm = form;
  }
  getCartProducts(panierId: number): Observable<Product[]> {
    // Make the HTTP GET request to fetch cart products
    return this.httpClient.get<Product[]>(`${this.panierUrl}/paniers/${panierId}/products`).pipe(
      map((products: Product[]) => {
        // Create a new Panier object with default values
        const defaultPanier: Panier = {
          id: panierId,
          quantite: 1,
          prixTotale: 0,
          products: [],
          user: new User() // Set to null or provide a default user object if needed
        };
  
        // Iterate through each product and set the panier property
        return products.map(product => {
          product.panier = defaultPanier;
          if (typeof product.quantite === 'undefined') {
            product.quantite = 1; // Initialize with a default value
          }
          return product;
        });
      })
    );
  }
  
  
  // Method to remove a product from the cart in the backend
  removeProductFromCart(productId: number): Observable<any> {
    // Get the current user's ID
    const userId = this.currentUserValue ? this.currentUserValue.id : null;
  
    // Retrieve the panierId associated with the current user
    return this.getPanierId().pipe(
      switchMap((panierId: any) => {
        // Check if panierId is in the expected format
      
        // Make the HTTP DELETE request to remove the product from the cart
        return this.httpClient.delete<any>(
          `${this.panierUrl}/remove/1/${productId}?userId=${userId}`
        );
      })
    );
  }
  


  // Other methods like addProductToPanier, ajouterPanier, getProductList, etc. remain unchanged

 

  addProduct(formData: FormData): Observable<any> {
    // Get the current user's ID
    const userId = this.currentUserValue ? this.currentUserValue.id : null;

    // Append the user ID to the FormData
    formData.append('userId', userId!.toString());

    // Set headers
    let headers = new HttpHeaders();

    // Make the HTTP POST request
    return this.httpClient.post<any>(
      `${this.baseUrl}/produits`,
      formData,
      { headers: headers, reportProgress: true, observe: 'events' }
    );
  }
  ajouterPanier(): Observable<any> {
    // Get the current user's ID
    const userId = this.currentUserValue ? this.currentUserValue.id : null;
    return this.httpClient.post<any>(
      `${this.panierUrl}/paniers?userId=${userId}`,
      null
    );
  }
  

  addProductToPanier(productId: number): Observable<any> {
    const userId = this.currentUserValue ? this.currentUserValue.id : null;
    // Check if the user has a cart (panier)
    return this.httpClient.get<any>(`${this.panierUrl}/paniers?userId=${userId}`).pipe(
      switchMap((paniers: any[]) => {
        // If the user doesn't have a cart, create one
        if (paniers.length === 0) {
          return this.ajouterPanier().pipe(
            switchMap((createdPanier: any) => {
              // After creating the cart, add the product to the cart
              return this.addProductToCreatedPanier(createdPanier.id, productId);
            })
          );
        } else {
          // If the user already has a cart, add the product to the existing cart
          const panierId = paniers[0].id;
          return this.addProductToCreatedPanier(panierId, productId);
        }
      })
    );
  }
  
  updateProductQuantity(panierId: number, productId: number, newQuantity: number): Observable<any> {
    // Get the current user's ID
    const userId = this.currentUserValue ? this.currentUserValue.id : null;
  
    // Make the HTTP PUT request to update the product quantity in the cart
    return this.httpClient.put<any>(
      `${this.panierUrl}/updateQuantity/${panierId}/${productId}?newQuantity=${newQuantity}&userId=${userId}`,
      {}
    );
  }
  
  private addProductToCreatedPanier(panierId: number, productId: number): Observable<any> {
    const userId = this.currentUserValue ? this.currentUserValue.id : null;
    return this.httpClient.post<any>(
      `${this.panierUrl}/add/${panierId}/${productId}?userId=${userId}`,
      null
    );
  }
  

 // Method to fetch panierId associated with the current user
 getPanierId(): Observable<any> {
  const userId = this.currentUserValue ? this.currentUserValue.id : null;
  return this.httpClient.get<any>(`${this.panierUrl}/panier?userId=${userId}`);
}


getTotalPrice(): Observable<any> {
  // Make the HTTP GET request to fetch the total price of the cart
  return this.httpClient.get<any>(`${this.apiUrl}/paniers/1/totalPrice`);
}


  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/produits`);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/produits/${id}`);
  }

  updateProduct(formData: FormData): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/produits`, formData);
  }

  deleteProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/delete/${product.id}`;
    return this.httpClient.delete<Product>(url);
  }

  validerCommande(formData: any, userId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/validercommande/1?userId=${userId}`, formData);
  }
  

}
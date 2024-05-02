import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../models/role';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  user: User = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    adresse: '',
    token: '',
    role: Role.USER,
    enabled: true
  };
  paymentType: string = 'cash';
  totalPrice: number = 0;
  adresse: string = '';
  commandeForm: FormGroup;

constructor(
  private productService: ProductService,
  private authService: AuthenticationService,
  private formBuilder: FormBuilder,
  private router: Router,
  private toastr: ToastrService
) { }

  ngOnInit(): void {
    this.commandeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      paymentType: ['cash', Validators.required],
      totalPrice: ['', Validators.required]
    });

    this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        this.commandeForm.patchValue({
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          address: user.adresse
        });
      },
      (error: any) => {
        console.error('Error fetching user information:', error);
      }
    );

    this.productService.getTotalPrice().subscribe(
      (totalPrice: number) => {
        this.totalPrice = totalPrice;
        this.commandeForm.patchValue({
          totalPrice: totalPrice
        });
      },
      (error: any) => {
        console.error('Error fetching total price:', error);
      }
    );
  }
  onSubmit() {
    if (this.commandeForm.invalid) {
      return;
    }
  
    const formData = {
      ...this.commandeForm.value,
      adresse: this.commandeForm.value.address
    };
  
    const userId = this.authService.currentUserValue.id;
    const confirmSubmission = window.confirm('Are you sure you want to create this command?');
    if (confirmSubmission) {
  
    this.productService.validerCommande(formData, userId).subscribe(
      (response: any) => {
        console.log('Commande created successfully:', response);
        // Navigate to home page
        this.router.navigate(['/home']);
        this.showConfirmationMessage();
      },
      (error: any) => {
        console.error('Error creating command:', error);
        // Handle error
      }
    );
  }}
  
  showConfirmationMessage() {
    const confirmationDiv = document.createElement('div');
    confirmationDiv.textContent = 'Command created successfully!';
    confirmationDiv.style.backgroundColor = 'lightgreen';
    confirmationDiv.style.color = 'black';
    confirmationDiv.style.padding = '10px';
    confirmationDiv.style.position = 'fixed';
    confirmationDiv.style.top = '27%';
    confirmationDiv.style.left = '50%';
    confirmationDiv.style.transform = 'translate(-50%, -50%)';
    confirmationDiv.style.zIndex = '9999';
    confirmationDiv.style.borderRadius = '5px';
    confirmationDiv.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    
    document.body.appendChild(confirmationDiv);
  
    setTimeout(() => {
      confirmationDiv.remove();
    }, 3000); // Remove the confirmation message after 3 seconds
  }
}  
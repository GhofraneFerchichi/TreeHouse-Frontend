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

    this.productService.validerCommande(formData, userId).subscribe(
      (response: any) => {
        console.log('Commande created successfully:', response);
        localStorage.setItem('showToast', 'true');
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Error creating command:', error);
        // Handle error
      }
    );
  }
}

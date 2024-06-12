import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [
    './add-aproduct.component.css',
    '../../assets/fournitures/css/style.css',
    '../../assets/fournitures/css/bootstrap.min.css',
    '../../assets/fournitures/css/stylecard.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      quantite: [0, [Validators.required, Validators.min(0)]],
      image: [null, [Validators.required]], // Assuming image is required
    });
  }

  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedFileName = file.name;
      // Update the form control value
      this.productForm.get('image')?.setValue(file);
    } else {
      this.selectedFileName = null;
      // Clear the form control value
      this.productForm.get('image')?.setValue(null);
    }
  }

  addProduct() {
    const formData = new FormData();
  
    // Get the file from the form control
    const imageControl = this.productForm.get('image');
    if (imageControl && imageControl.value instanceof File) {
      formData.append('file', imageControl.value);
    } else {
      console.error('No file selected.');
      return;
    }
  
    // Get other form values and ensure they are not null or undefined
    const title = this.productForm.get('title')?.value || '';
    const description = this.productForm.get('description')?.value || '';
    const price = this.productForm.get('price')?.value;
    const quantite = this.productForm.get('quantite')?.value;
  
    // Ensure all required values are available
    if (title.trim() === '' || description.trim() === '' || price == null || quantite == null) {
      console.error('Missing form values.');
      return;
    }
  
    // Adjust the property names to match the backend
    const productData = {
      titre: title.toString(),
      description: description.toString(),
      prix: price.toString(),
      quantite: quantite.toString()
    };
  
    formData.append('product', JSON.stringify(productData));
  
    this.productService.addProduct(formData).subscribe(
      (data) => {
        const navigationExtras: NavigationExtras = {
          skipLocationChange: true,
        };
        this.router.navigate(['/home'], navigationExtras);
      },
      (error) => {
        console.error('Error adding product:', error);
        // Optionally display an error message to the user using ToastrService or similar
      }
    );
  }
  
}

import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService} from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product} from 'src/app/models/product';

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
    this.productService.setDataForm(this.productForm); // Initialize dataForm
  }

  
  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedFileName = file.name;
      // You can also update the form control value if needed
      this.productForm.get('image')?.setValue(file);
    } else {
      this.selectedFileName = null;
      // You may also want to clear the form control value here if needed
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
  
    // Adjust the property names to match the backend
    const productData = {
      titre: this.productForm.get('title')!.value,
      description: this.productForm.get('description')!.value,
      prix: this.productForm.get('price')!.value,
      quantite: this.productForm.get('quantite')!.value
    };
  
    formData.append('product', JSON.stringify(productData));
  
    this.productService.addProduct(formData).subscribe(
      (data) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle error
        console.error('Error adding product:', error);
        // You can also display an error message to the user using ToastrService or similar
      }
    );
  }
  
}
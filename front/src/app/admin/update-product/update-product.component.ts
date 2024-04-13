import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService} from 'src/app/services/product.service';
import { Product} from 'src/app/models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css',
    '../../../assets/fournitures/css/bootstrap.min.css',
    '../../../assets/fournitures/css/tiny-slider.css' ,
    '../../../assets/fournitures/css/style.css',
    '../../../assets/fournitures/css/stylecard.scss',
],
encapsulation: ViewEncapsulation.None,
})
export class UpdateProductComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /*id!: number;
  selectedFiles!: FileList;
  product: Product = new Product();
  errorMessage: string = '';
  userFile: any;
  public imagePath: any;
  imgURL: any;
  files: string[] = [];
  images: string[] = [];
  file!: string;


  constructor(
    public productService: ProductService ,
    private router: Router,
    public toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe((data) => {
      this.product = data;
    });

    this.infoForm();
    console.log(this.product);
  }

  infoForm() {
    this.productService.dataForm = this.fb.group({
      title: [this.product.title, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      quantity: [this.product.quantite, [Validators.required]],
      description: [this.product.description, [Validators.required]],

    });
  }

  addProduct() {
    const formData = new FormData();

    //const product = this.productService.dataForm.value;
    // formData.append('article', JSON.stringify(product));
   formData.append('product', JSON.stringify(product));

    this.productService.updateProduct(formData).subscribe((data) => {
      this.router.navigate(['/shop']);
    });
  }

*/
}


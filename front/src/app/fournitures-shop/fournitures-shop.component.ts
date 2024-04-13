import { Component, Input, OnInit } from '@angular/core';
import { Product } from "../models/product";
import { ProductService } from "../services/product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-fournitures-shop',
  templateUrl: './fournitures-shop.component.html',
  styleUrls: ['./fournitures-shop.component.css',
    '../../assets/fournitures/css/bootstrap.min.css',
    '../../assets/fournitures/css/tiny-slider.css',
    '../../assets/fournitures/css/style.css',
    '../../assets/fournitures/css/stylecard.scss'],

})
export class FournituresShopComponent implements OnInit {

  @Input() products: Product[] = [];
  files: any = [];
  id!: number;
  p: number = 1;
  status = false;
  userId: number | undefined;
  panierId: number ;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.listApartments();
    this.productService.getProductList().subscribe((data: Product[]) => {
      this.products = data.map(product => ({
        ...product,
        image: this.base64ToArrayBuffer(product.imageBase64)
      }));
    });
    // Fetch panierId on component initialization
    this.getPanierId();
  }

  listApartments() {
    this.productService.getProductList().subscribe((data) => {
      this.products = data.map(product => ({
        ...product,
        image: this.base64ToArrayBuffer(product.imageBase64)
      }));
    });
  }

  addToggle() {
    this.status = !this.status;
  }

  addToCart(product: Product) {
    this.productService.addProductToPanier(product.id).subscribe(
      () => {
        // Handle success, maybe show a success message
        console.log('Product added to cart successfully!');
      },
      (error) => {
        // Handle error, maybe show an error message
        console.error('Error adding product to cart:', error);
      }
    );
  }
  

  base64ToArrayBuffer(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  // Function to fetch panierId
  getPanierId() {
    // Implement logic to fetch panierId, possibly from localStorage or from service
    // For demonstration purposes, assuming panierId is fetched from a service method
    this.productService.getPanierId().subscribe((response) => {
      this.panierId = response.id;
    });
  }
}

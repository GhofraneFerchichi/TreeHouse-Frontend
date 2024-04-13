import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css',
    '../../assets/fournitures/css/style.css',
    '../../assets/fournitures/css/bootstrap.min.css',
    '../../assets/fournitures/css/stylecard.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ViewcartComponent implements OnInit {
  cartProducts: Product[] = [];
  panierId: number = 1; // Set your panier ID here

  constructor(private productService: ProductService, private router: Router ) { }

ngOnInit(): void {
  this.productService.getCartProducts(this.panierId).subscribe(
    (products: Product[]) => {
      this.cartProducts = products.map(product => ({
        ...product,
        image: this.base64ToArrayBuffer(product.imageBase64)
      }));
    },
    (error) => {
      console.error('Error fetching cart products:', error);
    }
  );
}
loadCartProducts() {
  // Assuming you have a method to get cart products from ProductService
  // Update cartProducts array with products fetched from ProductService
  this.productService.getCartProducts(this.panierId).subscribe(products => {
    this.cartProducts = products;
  });
}

removeFromCart(productId: number): void {
  this.productService.removeProductFromCart( productId).subscribe(
    () => {
      // Remove the product from the cartProducts array
      this.cartProducts = this.cartProducts.filter(product => product.id !== productId);
    },
    (error: any) => {
      console.error('Error removing product from cart:', error);
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
  updateQuantity(product: Product, newQuantity: number) {
    // Check if newQuantity is a valid number
    if (isNaN(newQuantity) || newQuantity <= 0) {
      console.error('Invalid quantity value:', newQuantity);
      return;
    }
  
    console.log('Updating quantity for product:', product);
    console.log('New quantity:', newQuantity);
    
    // Check if product.panier exists and has a valid id
    if (!product.panier || !product.panier.id) {
      console.error('Product panier is missing or invalid.');
      return;
    }
  
    // Calculate new total price
    const totalPrice = product.prix * newQuantity;
  
    console.log('New total price:', totalPrice);
  
    // Calculate the difference in quantity to update the panier quantity
    const quantityDifference = newQuantity - product.quantite;
  
    // Update panier quantity locally
    product.panier.quantite += quantityDifference;
  
    // Update product quantity locally
    product.quantite = newQuantity;
  
    // Call the ProductService method to update quantity and total price in the backend
    this.productService.updateProductQuantity(product.panier.id, product.id, newQuantity)
      .subscribe(() => {
        // Quantity updated successfully
        console.log('Quantity updated successfully.');
      }, error => {
        // Handle error
        console.error('Error updating quantity:', error);
        // Reload cart products to revert changes
        this.loadCartProducts();
      });
  }

  passerCommande() {
    this.router.navigate(['/commande']);
}


}  
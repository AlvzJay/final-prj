import { Injectable } from '@angular/core';
import { HousingLocationInfo } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: HousingLocationInfo[] = [];

  addToCart(rose: HousingLocationInfo): void {
    this.cart.push(rose);
  }

  getCart(): HousingLocationInfo[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
  }

  getCartCount(): number {
    return this.cart.length;
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }
}


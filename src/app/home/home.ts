import {Component, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HousingLocation} from '../housing-location/housing-location';
import {HousingLocationInfo} from '../housinglocation';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocation, RouterModule, CommonModule],
  template: `
    <section class="search-bar">
      <img class="search-logo" src="Rlogo.png" alt="Rose logo" />
      <form class="search-form">
        <input 
          type="text" 
          placeholder="Filter by rose name" 
          #filter
          (input)="filterResults(filter.value)"
        />
        <button class="primary" type="button">Search</button>
      </form>
      <a class="about-button" routerLink="/about">About Us</a>
    </section>
    
    <!-- Cart Section -->
    <section class="cart-section" *ngIf="cartService.getCart().length > 0">
      <div class="cart-header">
        <h2>Your Cart ({{ cartService.getCartCount() }})</h2>
      </div>
      <div class="cart-items">
        @for(rose of cartService.getCart(); track $index; let i = $index) {
          <div class="cart-item">
            <img [src]="rose.photo" [alt]="rose.name" class="cart-image" />
            <div class="cart-info">
              <h3>{{ rose.name }}</h3>
            </div>
            <button class="remove-btn" (click)="removeFromCart(i)">×</button>
          </div>
        }
      </div>
      <div class="cart-footer">
        <button class="order-all-btn" (click)="orderAll()">Order Now</button>
      </div>
    </section>

    <section class="results">
      @for(housingLocation of filteredLocationList; track $index) {
        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  cartService = inject(CartService);
  filteredLocationList: HousingLocationInfo[] = [];

  housingLocationList: HousingLocationInfo[] = [
    {
      id: 0,
      name: 'Hybrid Tea Rose',
      city: 'Chicago',
      state: 'IL',
      photo: 'hybrid_tea_rose.jpg',
      availableUnits: 4,
      wifi: true,
      laundry: true,
    },
    {
      id: 1,
      name: 'Grandiflora Rose',
      city: 'Santa Monica',
      state: 'CA',
      photo: 'grandiflora_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: true,
    },
    {
      id: 2,
      name: 'Floribunda Rose',
      city: 'Juneau',
      state: 'AK',
      photo: 'floribunda_rose.jpg',
      availableUnits: 1,
      wifi: false,
      laundry: false,
    },
    {
      id: 3,
      name: 'Climbing Rose',
      city: 'Chicago',
      state: 'IL',
      photo: 'climbing_rose.jpg',
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: 4,
      name: 'Miniature Rose',
      city: 'Gary',
      state: 'IN',
      photo: 'miniature_rose.jpg',
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: 5,
      name: 'Shrub Rose',
      city: 'Oakland',
      state: 'CA',
      photo: 'shrub_rose.jpg',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: 6,
      name: 'English Rose',
      city: 'Oakland',
      state: 'CA',
      photo: 'english_rose.jpg',
      availableUnits: 5,
      wifi: true,
      laundry: true,
    },
    {
      id: 7,
      name: 'Wild Rose',
      city: 'Oakland',
      state: 'CA',
      photo: 'wild_rose.jpg',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: 8,
      name: 'Damask Rose',
      city: 'Oakland',
      state: 'CA',
      photo: 'damask_rose.jpg',
      availableUnits: 10,
      wifi: false,
      laundry: false,
    },
    {
      id: 9,
      name: 'Tea Rose',
      city: 'Portland',
      state: 'OR',
      photo: 'tea_rose.jpg',
      availableUnits: 6,
      wifi: true,
      laundry: true,
    },
    {
      id: 10,
      name: 'Polyantha Rose',
      city: '',
      state: '',
      photo: 'polyantha_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 11,
      name: 'Bourbon Rose',
      city: '',
      state: '',
      photo: 'bourbon_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 12,
      name: 'China Rose',
      city: '',
      state: '',
      photo: 'china_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 13,
      name: 'Gallica Rose',
      city: '',
      state: '',
      photo: 'gallica_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 14,
      name: 'Moss Rose',
      city: '',
      state: '',
      photo: 'moss_rose.jpeg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 15,
      name: 'Rambler Rose',
      city: '',
      state: '',
      photo: 'rambler_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 16,
      name: 'Groundcover Rose',
      city: '',
      state: '',
      photo: 'ground_cover_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 17,
      name: 'Patio Rose',
      city: '',
      state: '',
      photo: 'patio_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 18,
      name: 'Alba Rose',
      city: '',
      state: '',
      photo: 'alba_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 19,
      name: 'Centifolia Rose',
      city: '',
      state: '',
      photo: 'centi_folia_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 20,
      name: 'Rugosa Rose',
      city: '',
      state: '',
      photo: 'rugosa_rose.jpeg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 21,
      name: 'Noisette Rose',
      city: '',
      state: '',
      photo: 'noisette_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 22,
      name: 'Portland Rose',
      city: '',
      state: '',
      photo: 'portland_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 23,
      name: 'Hybrid Perpetual Rose',
      city: '',
      state: '',
      photo: 'hybrid_perpetual_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
    {
      id: 24,
      name: 'Landscape Rose',
      city: '',
      state: '',
      photo: 'landscape_rose.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: false,
    },
  ];

  constructor() {
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => 
        housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  orderAll(): void {
    if (this.cartService.getCart().length > 0) {
      alert('Order placed successfully! Your cart has been cleared.');
      this.cartService.clearCart();
    }
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }
}

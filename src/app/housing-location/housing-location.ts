import {Component, input} from '@angular/core';
import {HousingLocationInfo} from '../housinglocation';
import {Router} from '@angular/router';

@Component({
  selector: 'app-housing-location',
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation().photo"
        alt="Exterior photo of {{ housingLocation().name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation().name }}</h2>
      <a class="read-more-link" (click)="navigateToDetails()">Read more</a>
    </section>
  `,
  styleUrls: ['./housing-location.css'],
})
export class HousingLocation {
  housingLocation = input.required<HousingLocationInfo>();
  
  constructor(private router: Router) {}
  
  navigateToDetails() {
    this.router.navigate(['/details', this.housingLocation().id]);
  }
}

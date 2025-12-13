import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="about">
      <div class="about-header">
        <h1>About Us</h1>
        <a class="home-btn" routerLink="/">Return Home</a>
      </div>
      <p class="lede">
        A short introduction about the creators of this project.
      </p>

      <div class="team">
        <div class="card">
          <img src="Person1.jpg" alt="Person One" class="avatar" />
          <h2>Jaygee Alvez</h2>
          <p>Role: Developer / Designer / Tambay / Waiter / Waitress / Cook / Bartender / Server / Barista / Cashier / Host / Soldier / Farmer / Chef / Baker </p>
          <p>Contact: alvezjaygee@gmail.com</p>
          <p>Bio: Professional Tambay who accidentally learned how to code. I can design your app, cook your dinner, and serve your drinks, but I'd rather just hang out. 🤷‍♂️</p>
        </div>
        <div class="card">
          <img src="person2.jpg" alt="Person Two" class="avatar" />
          <h2>Ken Chin Baras</h2>
          <p>2 years experience front end developer
          <br> 5 years culinary experience
          <br> 3 years novel reader 
          <br> 6 years nag Grade 6
          <br> 6 years anime 
          <br> 6 years manga eater
          </p>
          <p>Contact: kenchinbaras@gmail.com</p>
          <p>Bio: My plans never fail.
Because I never make any.
Zero expectations = zero disappointments. </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      padding: 32px;
      max-width: 900px;
      margin: 0 auto;
      color: #1f2937;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    }
    .about-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    h1 {
      margin: 0 0 12px 0;
      font-size: 2rem;
      color: #c2185b;
    }
    .home-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 16px;
      border-radius: 10px;
      border: 1px solid rgba(233, 30, 99, 0.4);
      background: linear-gradient(135deg, #f06292, #ec407a);
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
      transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
    }
    .home-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16);
      filter: brightness(1.04);
    }
    .lede {
      margin: 0 0 24px 0;
      line-height: 1.6;
    }
    .team {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    .card {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(233, 30, 99, 0.25);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(4px);
      text-align: center;
    }
    .card h2 {
      margin: 0 0 8px 0;
      font-size: 1.2rem;
      color: #8b5cf6;
    }
    .card p {
      margin: 4px 0;
      line-height: 1.5;
    }
    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      margin-bottom: 12px;
      border: 3px solid rgba(233, 30, 99, 0.25);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
      background: #fce4ec;
    }
  `],
})
export class About {}


import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
frequentCurrencies = Array.from({ length: 9 }, (_, i) => i + 1);
}

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  darkMode = false;

  constructor() {
    const saved = localStorage.getItem('dark_mode');
    if (saved === 'true') {
      this.darkMode = true;
      document.body.classList.add('dark');
    }
  }

  toggleNightMode() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('dark_mode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('dark_mode', 'false');
    }
  }
}
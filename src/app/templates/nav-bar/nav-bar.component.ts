import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isExpanded: boolean = false;

  toggleSearch() {
    this.isExpanded = true;
  }

  collapseSearch() {
      this.isExpanded = false;
  }
}

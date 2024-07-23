import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './templates/footer/footer.component';
import { NavBarComponent } from './templates/nav-bar/nav-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { baseUrlInterceptor } from './interceptor/base.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavBarComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useValue: baseUrlInterceptor,
      multi: true
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proshore-task';
}

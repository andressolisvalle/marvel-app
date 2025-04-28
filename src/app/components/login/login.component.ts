import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;
  showLogin: boolean = true;

  toggleView(): void {
    this.showLogin = !this.showLogin;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  

  login(): void {
    this.isLoading = true;
    
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        const token = response.token; 
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'No se recibió un token válido.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = error.error?.error ;
        } else {
          this.errorMessage = 'Error al iniciar sesión.';
        }
        this.isLoading = false;
      }
    });
  }

}

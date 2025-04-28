import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComicListComponent } from '../comic-list/comic-list.component';
import { FavoriteListComponent } from '../favorite-list/favorite-list.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ComicService } from '../../services/comic.service';
import { FavoriteService } from '../../services/favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ComicListComponent, FavoriteListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLoading: boolean = false;

  comics: any[] = [];
  favorites: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  token: string | null = null;
  showLogin: boolean = true;
  activeSection: 'comics' | 'favorites' = 'comics'; 

  constructor(
    private comicService: ComicService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.loadComics();
      this.loadFavorites();
    }
  }

  toggleView(): void {
    this.showLogin = !this.showLogin;
  }

  scrollToComics(): void {
    this.activeSection = 'comics';
    const comicsSection = document.getElementById('comicsSection');
    comicsSection?.scrollIntoView({ behavior: 'smooth' });
  }
  
  scrollToFavorites(): void {
    this.activeSection = 'favorites';
    const favoritesSection = document.getElementById('favoritesSection');
    favoritesSection?.scrollIntoView({ behavior: 'smooth' });
  }
  


  loadComics(): void {
    this.isLoading = true;
    this.comicService.getComics().subscribe({
      next: (response) => {
        this.comics = response.data; 
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando cómics:', error);
        this.isLoading = false;
      }
    });
  }

  addComicToFavorites(comic: any): void {
    this.comicService.addToFavorites(comic).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = null;
        this.loadFavorites();
        this.clearMessagesAfterDelay();
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = error.error?.error ;
        } else {
          this.errorMessage = 'Error agregando cómic a favoritos.';
        }
        this.successMessage = null;
        this.clearMessagesAfterDelay();
      }
    });
  }
  
  

  loadFavorites(): void {
    this.isLoading = true;
    this.favoriteService.getFavorites().subscribe({
      next: (response) => {
        this.favorites = response.data; 
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando favoritos:', error);
        this.isLoading = false;
      }
    });
  }

  deleteFavorite(id: string): void {
    this.favoriteService.deleteFavorite(id).subscribe({
      next: () => {
        this.successMessage = 'Favorito eliminado exitosamente.';
        this.errorMessage = null;
        this.loadFavorites();
        this.clearMessagesAfterDelay();
      },
      error: (error) => {
        this.errorMessage = 'Error eliminando favorito.';
        this.successMessage = null;
        console.error('Error eliminando favorito:', error);
        this.clearMessagesAfterDelay();
      }
    });
  }
  
  
  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);

  }
  

  clearMessagesAfterDelay(): void {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 3000); 
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-list',
  imports: [CommonModule],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent {
  @Input() favorites: any[] = [];
  @Output() deleteFavorite = new EventEmitter<string>();

  onDeleteFavorite(id: string) {
    this.deleteFavorite.emit(id);
  }
}

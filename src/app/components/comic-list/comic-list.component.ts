import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comic-list',
  imports: [CommonModule],
  templateUrl: './comic-list.component.html',
  styleUrl: './comic-list.component.css'
})
export class ComicListComponent {

  @Input() comics: any[] = [];
  @Output() addFavorite = new EventEmitter<any>();

  onAddToFavorites(comic: any) {
    this.addFavorite.emit(comic);
  }
}

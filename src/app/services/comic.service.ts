import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';

@Injectable({
  providedIn: 'root'
})

export class ComicService {
  private apiUrl = `${environment.apiUrl}/comic`;
  constructor(private http: HttpClient) {}

  getComics(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getComicById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addToFavorites(comic: any): Observable<any> {
    const body = {
      comicId: comic.id,
      title: comic.title,
      imageUrl: comic.imageUrl
    };
  
    return this.http.post<any>(`${this.apiUrl}/favorite`, body);

  }
  
}

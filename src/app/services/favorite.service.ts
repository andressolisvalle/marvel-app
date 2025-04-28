import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/comic/favorite`;


  constructor(private http: HttpClient) {}

  getFavorites(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteFavorite(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
}

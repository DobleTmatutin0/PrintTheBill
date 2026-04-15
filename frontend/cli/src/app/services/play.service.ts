import { Injectable } from '@angular/core';
import { Play } from '../models/play';
import { Observable } from 'rxjs';
import { DataPackage } from '../dataPackage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayService {
    private playsUrl = 'rest/plays';
    
    constructor(
        private http: HttpClient
    ) { }

    all(): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.playsUrl);
    }

    get(code: string): Observable<DataPackage> {
        return this.http.get<DataPackage>(`${this.playsUrl}/code/${code}`);
    }

    byPage(page: number, size: number): Observable<DataPackage> {
        return this.http.get<DataPackage>(`${this.playsUrl}/page?page=${page-1}&size=${size}`);
    }

    search(term: string): Observable<DataPackage> {
        return this.http.get<DataPackage>(`${this.playsUrl}/search/${term}`);
    }

    save(play: Play): Observable<DataPackage> {
        return play.id 
        ? this.http.put<DataPackage>(`${this.playsUrl}/${play.id}`, play)
        : this.http.post<DataPackage>(this.playsUrl, play);
    }

    remove(id: number): Observable<DataPackage> {
        return this.http.delete<DataPackage>(`${this.playsUrl}/${id}`)
    }
}

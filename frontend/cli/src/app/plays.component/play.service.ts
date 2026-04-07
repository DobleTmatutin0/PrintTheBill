import { Injectable } from '@angular/core';
import { Play } from '../models/play';
import { Observable, of } from 'rxjs';
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

    save(play: Play): Observable<Play> {
        let formerPlay = <Play>{};
        Object.assign(formerPlay, play);
        return of(formerPlay);
    }
}

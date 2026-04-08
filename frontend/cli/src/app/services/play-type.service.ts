import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPackage } from '../dataPackage';

@Injectable({
  providedIn: 'root',
})
export class PlayTypeService {
    private playTypeUrl = 'rest/playtype';

    constructor(
        private http: HttpClient
    ) { }

    all(): Observable<DataPackage> {
        return this.http.get<DataPackage>(this.playTypeUrl);
    }
}

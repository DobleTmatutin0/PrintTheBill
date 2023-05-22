import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Play } from "./play";
import { DataPackage } from "../data-package";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PlayService {
  private playsUrl = "rest/plays"; // URL to web api

  constructor(private http: HttpClient) {}

  get(code: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.playsUrl}/${code}`);
  }

  save(play: Play): Observable<DataPackage> {
    return this.http[play.id ? "put" : "post"]<DataPackage>(
      this.playsUrl,
      play
    );
  }

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.playsUrl);
  }

  delete(aPlay: Play): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.playsUrl}/${aPlay.code}`);
  }

  byPage(page: number, cant: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.playsUrl}?page=${page}&cant=${cant}`
    );
  }

  searchTypes(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.playsUrl}/types/${text}`);
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.playsUrl}/search/${text}`);
  }
}

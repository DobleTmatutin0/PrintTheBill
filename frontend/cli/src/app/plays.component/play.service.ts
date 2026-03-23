import { Injectable } from '@angular/core';
import { Play } from './play';
import { MOCK_PLAYS } from './mock-plays';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayService {
    constructor() { }

    get(id: number): Observable<Play> {
        return of(MOCK_PLAYS.find(play => play.id === id)!);
    }

    save(play: Play): Observable<Play> {
        let formerPlay = MOCK_PLAYS.find((formerPlay) => formerPlay.id === play.id)!;
        Object.assign(formerPlay, play);
        return of(formerPlay);
    }
}

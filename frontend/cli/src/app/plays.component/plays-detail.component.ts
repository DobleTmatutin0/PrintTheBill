import { CommonModule, Location, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Play } from './play';
import { ActivatedRoute } from '@angular/router';
import { PlayService } from './play.service';

@Component({
    selector: 'app-plays-detail.component',
    imports: [
        CommonModule,
        UpperCasePipe,
        FormsModule
    ],
    template: ` 
        <div *ngIf="play">
            <h2>{{ play.name | uppercase }}</h2>
            <form #form="ngForm">
                <div class="form-group">
                    <label for="code">Codigo:</label>
                    <input name="code" placeholder="Codigo" class="form-control" [(ngModel)]="play.code">    
                </div>                
                <div class="form-group">
                    <label for="name">Nombre:</label>
                    <input name="name" placeholder="Nombre" class="form-control" [(ngModel)]="play.name" required #name="ngModel">
                    <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert">
                        <div *ngIf="name.errors?.['required']">
                            El nombre de la obra es obligatorio
                        </div>
                    </div>    
                </div>
                <div class="form-group">
                    <label for="type">Tipo:</label>
                    <select name="type" placeholder="Tipo" class="form-control" [(ngModel)]="play.type">
                        <option value="Comedy">Comedia</option>
                        <option value="Tragedy">Tragedia</option>
                    </select>    
                </div>
                <button class="btn btn-danger" (click)="goBack()">
                    Cancelar
                </button>
                <button class="btn btn-success" (click)="save()" [disabled]="form.invalid">
                    Guardar
                </button> 
            </form>    
        </div>
    `,
    styles: ``,
})
export class PlaysDetailComponent {
    play!: Play;

    constructor(
        private route: ActivatedRoute,
        private playService: PlayService,
        private location: Location
    ) {}

    get(): void {
        const id = +this.route.snapshot.paramMap.get('id')!;
        this.playService.get(id).subscribe(play => this.play = play);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.playService.save(this.play).subscribe(play => {this.play = play; this.goBack()});
    }

    ngOnInit() {
        this.get();
    }
 }

import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Play } from "./play";
import { PlayService } from "./play.service";

@Component({
  selector: "app-detail",
  template: `
    <div *ngIf="play">
      <h2>{{ play.name | uppercase }}</h2>
      <form #form="ngForm">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input
            [(ngModel)]="play.name"
            name="name"
            placeholder="Nombre"
            class="form-control"
            required=""
            #name="ngModel"
          />
          <div
            *ngIf="name.invalid && (name.dirty || name.touched)"
            class="alert"
          >
            <div *ngIf="name.errors?.['required']">
              El Nombre de la obra es requerido.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="name">Código:</label>
          <input
            [(ngModel)]="play.code"
            name="code"
            placeholder="Código"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="type">Tipo</label>
          <select
            [(ngModel)]="play.type"
            class="form-control"
            id="type"
            name="type"
          >
            <option value="comedy">Comedia</option>
            <option value="tragedy">Tragedia</option>
          </select>
        </div>
        <button (click)="goBack()" class="btn btn-danger">Atrás</button>
        &nbsp;
        <button
          (click)="save()"
          [disabled]="form.invalid"
          class="btn btn-success"
        >
          Guardar
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class DetailComponent {
  play!: Play;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private playService: PlayService
  ) {}

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if(id === "new"){
      this.play = <Play>{};
    } else {
      this.playService.get(+id).subscribe((play) => (this.play = play));
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.playService.save(this.play).subscribe((play) => {
      this.play = play;
      this.goBack();
    });
  }
}

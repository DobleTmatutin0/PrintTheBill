import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Location } from "@angular/common";

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";

import { Observable, of, OperatorFunction } from "rxjs";

import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";

import { Bordero } from "../bordero";
import { Customer } from "../customer";
import { Performance } from "../performance";
import { BorderoService } from "../bordero.service";
import { CustomerService } from "../customer.service";
import { PlayService } from "../plays/play.service";
import { ModalService } from "../modal.service";
import { Play } from "../plays/play";
import { DataPackage } from "../data-package";

@Component({
  selector: "app-borderos-detail",
  template: `
    <div *ngIf="bordero">
      <h2>
        {{
          bordero && bordero.id ? "Bordero Nº " + bordero.id : "Nuevo bordero"
        }}
      </h2>
      <form #form="ngForm">
        <div class="form-group inline">
          <label for="date">Fecha:</label>
          <ngb-datepicker name="date" [(ngModel)]="date"></ngb-datepicker>
        </div>
        <div class="form-group">
          <label for="name">Cliente:</label>
          <br />
          <input
            [(ngModel)]="bordero.customer"
            name="customer"
            placeholder="Cliente"
            class="form-control"
            required
            [ngbTypeahead]="searchCustomer"
            [editable]="false"
            [resultFormatter]="resultFormat"
            [inputFormatter]="inputFormat"
            type="text"
          />
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Obra</th>
                <th>Audiencia</th>
                <th>
                  <button (click)="addPerformance()" class="btn btn-success">
                    Agregar
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let performance of bordero.performances; index as i">
                <td>{{ i + 1 }}</td>
                <td>
                  <input
                    [(ngModel)]="performance.play"
                    name="performance{{ i }}"
                    placeholder="Obra"
                    class="form-control"
                    required
                    [ngbTypeahead]="searchPlay"
                    [editable]="false"
                    [resultFormatter]="resultFormat"
                    [inputFormatter]="inputFormat"
                    type="text"
                  />
                </td>
                <td>
                  <input
                    name="audience{{ i }}"
                    [(ngModel)]="performance.audience"
                    class="form-control"
                  />
                </td>
                <td>
                  <button
                    (click)="removePerformance(performance)"
                    class="btn btn-default"
                  >
                    <i class="fa fa-remove"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button (click)="goBack()" class="btn btn-danger">Atrás</button>
        &nbsp;
        <button
          (click)="save()"
          [disabled]="!form.valid"
          class="btn btn-success"
        >
          Guardar
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class BorderosDetailComponent {
  bordero: Bordero = <Bordero>{};
  searching: boolean = false;
  searchFailed: boolean = false;
  date = this.parser.parse("2003-01-02");
  readonly empty = <string[]>[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private borderoService: BorderoService,
    private customerService: CustomerService,
    private playService: PlayService,
    private location: Location,
    private calendar: NgbCalendar,
    private modalService: ModalService,
    private parser: NgbDateParserFormatter
  ) {}

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id === "new") {
      this.bordero = {
        id: 0,
        date: new Date(),
        customer: <Customer>{},
        performances: <Performance[]>[],
      };
      this.date = this.calendar.getToday();
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.bordero.date = this.date
      ? new Date(this.date.year, this.date.month - 1, this.date.day)
      : new Date();
    this.borderoService.save(this.bordero).subscribe((dataPackage) => {
      this.router
        .navigateByUrl("/", {
          skipLocationChange: true,
        })
        .then(() =>
          this.router.navigate(["/borderos/" + (<Bordero>dataPackage.data).id])
        );
    });
  }

  searchCustomer = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.customerService
          .search(term)
          .pipe(map((response) => <Customer[]>response.data))
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          )
      ),
      tap(() => (this.searching = false))
    );

  resultFormat(value: any) {
    return value.name;
  }

  inputFormat(value: any) {
    return value?.name;
  }


  searchPlay = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => (this.searching = true)),
    switchMap((term) =>
        this.playService.search(term).pipe(
            map((response) => <Play[]>response.data),
            tap(() => (this.searchFailed = false)),
            catchError(() => {
                this.searchFailed = true;
                return of([]);
            }),
        ),
    ),
    tap(() => (this.searching = false)),
);

  addPerformance(): void {
    this.bordero.performances.push({ play: <Play>{}, audience: 0 });
  }

  removePerformance(performance: Performance): void {
    this.modalService
      .confirm(
        "Eliminar performance",
        "¿Está seguro de borrar esta performance?",
        "El cambio no se confirmará hasta que no guarde el borderó."
      )
      .then(
        () => {
          let performances = this.bordero.performances;
          performances.splice(performances.indexOf(performance), 1);
        },
        () => {}
      );
  }
}

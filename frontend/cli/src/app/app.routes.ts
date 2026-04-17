import { Routes } from '@angular/router';
import { Home } from './home/home.component';
import { PlaysComponent } from './components/plays.component/plays.component';
import { PlaysDetailComponent } from './components/plays.component/plays-detail.component';
import { BorderoDetailComponent } from './components/bordero-detail.component/bordero-detail.component';
import { CustomersComponent } from './components/customers.component/customers.component';
import { BorderosComponent } from './components/borderos.component/borderos.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'plays', component: PlaysComponent },
    { path: 'plays/:code', component: PlaysDetailComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'borderos', component: BorderosComponent },
    { path: 'borderos/:id', component: BorderoDetailComponent }
];

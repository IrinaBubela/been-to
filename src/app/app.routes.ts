import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        pathMatch: 'full',
        children: [
            { path: '/mylist', component: MapComponent },
            { path: '/login', component: LoginComponent },
            { path: '/signup', component: MapComponent },
        ]
    },
];
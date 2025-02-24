import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StateComponent } from './pages/state/state.component';
import { EntryComponent } from './pages/state/entry/entry.component';
import { PolicyComponent } from './policy/policy.component';
import { EntityComponent } from './policy/entity/entity.component';
import { AllowanceComponent } from './pages/allowance/allowance.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'state',
    children: [
      { path: '', component: StateComponent },
      { path: 'entry/:id', component: EntryComponent },
      { path: 'entry', component: EntryComponent },
    ],
  },
  {
    path: 'policy',
    children: [
      { path: '', component: PolicyComponent },
      { path: 'entity/:id', component: EntityComponent },
      { path: 'entity', component: EntityComponent },
    ],
  },
  { path: 'allowance', component: AllowanceComponent },
];

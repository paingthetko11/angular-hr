import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StateComponent } from './pages/state/state.component';
import { EntryComponent as StateEntryComponent } from './pages/state/entry/entry.component';
import { PolicyComponent } from './policy/policy.component';
import { EntityComponent } from './policy/entity/entity.component';
import { AllowanceComponent } from './pages/allowance/allowance.component';
import { EntryComponent as AllowanceEntryComponent } from './pages/allowance/entry/entry.component';
import { CompanyComponent } from './pages/company/company.component';
import { BranchComponent } from './pages/branch/branch.component';
import { PositionComponent } from './pages/position/position.component';
import { DeductionComponent } from './pages/deduction/deduction.component';
import { EntryComponent as DeductionEntryComponent } from './pages/deduction/entry/entry.component';
import { JobOpeningComponent } from './pages/job-opening/job-opening.component';

import { EntryComponent as JobOpeningEntryComponent } from './pages/job-opening/entry/entry.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  {
    path: 'state',
    children: [
      { path: '', component: StateComponent },
      { path: 'entry/:id', component: StateEntryComponent },
      { path: 'entry', component: StateEntryComponent },
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

  {
    path: 'allowance',
    children: [
      { path: '', component: AllowanceComponent },
      { path: 'entry/:id', component: AllowanceEntryComponent },
      { path: 'entry', component: AllowanceEntryComponent },
      { path: 'allowance/entry', component: AllowanceEntryComponent },
      { path: '', redirectTo: 'allowance', pathMatch: 'full' },
    ],
  },

  { path: 'company', component: CompanyComponent },
  { path: 'branch', component: BranchComponent },
  { path: 'position', component: PositionComponent },
  {
    path: 'JobOpens',
    children: [
      { path: '', component: JobOpeningComponent },
      { path: 'entry/:id', component: JobOpeningEntryComponent },
      { path: 'entry', component: JobOpeningEntryComponent },
      { path: 'JobOpens/entry', component: JobOpeningComponent },
      { path: '', redirectTo: 'JobOpens', pathMatch: 'full' },
    ],
  },

  {
    path: 'deduction',
    children: [
      { path: '', component: DeductionComponent },
      { path: 'entry/:id', component: DeductionEntryComponent },
      { path: 'entry', component: DeductionEntryComponent },
      { path: 'deduction/entry', component: DeductionComponent },
      { path: '', redirectTo: 'deduction', pathMatch: 'full' },
    ],
  },
];

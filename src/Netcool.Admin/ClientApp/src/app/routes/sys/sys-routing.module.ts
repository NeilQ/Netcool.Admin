import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysAppConfigComponent } from './app-config/app-config.component';
import { SysOrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  {path: 'app-configuration', component: SysAppConfigComponent},
  {path: 'organization', component: SysOrganizationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule {
}

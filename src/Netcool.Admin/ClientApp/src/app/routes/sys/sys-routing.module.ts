import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysAppConfigComponent } from './app-config/app-config.component';

const routes: Routes = [

  {
    path: '',
    component: SysAppConfigComponent,
    children: [
      {path: 'app-configuration', component: SysAppConfigComponent}
    ],
  },
  //{path: 'app-configuration', component: SysAppConfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule {
}

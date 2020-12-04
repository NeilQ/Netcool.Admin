import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { SysAppConfigComponent } from './app-config/app-config.component';
import { SysAppConfigEditComponent } from "./app-config/edit/edit.component";

const COMPONENTS = [
  SysAppConfigComponent
];
const COMPONENTS_NOROUNT = [SysAppConfigEditComponent];

@NgModule({
  imports: [
    SharedModule,
    SysRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SysModule {
}

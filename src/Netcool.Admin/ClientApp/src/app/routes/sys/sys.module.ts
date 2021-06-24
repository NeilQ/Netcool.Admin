import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { SysAppConfigComponent } from './app-config/app-config.component';
import { SysAppConfigEditComponent } from "./app-config/edit/edit.component";
import { SysOrganizationComponent } from './organization/organization.component';
import { SysOrganizationEditComponent } from './organization/edit/edit.component';
import { SysAnnouncementComponent } from './announcement/announcement.component';

const COMPONENTS = [
  SysAppConfigComponent,
  SysOrganizationComponent,
  SysOrganizationEditComponent,
  SysAnnouncementComponent];
const COMPONENTS_NOROUNT = [SysAppConfigEditComponent, SysOrganizationEditComponent];

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

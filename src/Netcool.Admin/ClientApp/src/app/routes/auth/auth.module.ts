import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthRoleComponent } from './role/role.component';
import { AuthRoleEditComponent } from './role/edit/edit.component';

const COMPONENTS = [
  AuthRoleComponent
];
const COMPONENTS_NOROUNT = [
  AuthRoleEditComponent,
];

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AuthModule {
}

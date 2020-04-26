import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthRoleComponent } from './role/role.component';
import { AuthRoleEditComponent } from './role/edit/edit.component';
import { AuthUserComponent } from "./user/user.component";
import { AuthUserEditComponent } from "./user/edit/edit.component";
import { AuthUserRoleEditComponent } from "./user/edit-role/edit-role.component";

const COMPONENTS = [
  AuthRoleComponent,
  AuthUserComponent
];
const COMPONENTS_NOROUNT = [
  AuthRoleEditComponent,
  AuthUserEditComponent,
  AuthUserRoleEditComponent
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

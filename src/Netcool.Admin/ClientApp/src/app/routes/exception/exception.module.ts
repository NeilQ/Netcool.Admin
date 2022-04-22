import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ExceptionModule as DelonExceptionModule } from '@delon/abc/exception';
import { ExceptionRoutingModule } from './exception-routing.module';

import { Exception403Component } from './403.component';
import { Exception404Component } from './404.component';
import { Exception500Component } from './500.component';
import { ExceptionTriggerComponent } from './trigger.component';

const COMPONENTS = [Exception403Component, Exception404Component, Exception500Component, ExceptionTriggerComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, DelonExceptionModule, ExceptionRoutingModule],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT]
})
export class ExceptionModule {
}

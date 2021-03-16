// tslint:disable: no-duplicate-imports
import { NgModule, LOCALE_ID, APP_INITIALIZER  } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// #region default language
// Reference: https://ng-alain.com/docs/i18n
import { default as ngLang } from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd/i18n';
import { DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';

const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  delon: delonLang,
};
// register angular
//import { registerLocaleData } from '@angular/common';
//registerLocaleData(LANG.ng, LANG.abbr);

const LANG_PROVIDES = [
  {provide: LOCALE_ID, useValue: LANG.abbr},
  {provide: NZ_I18N, useValue: LANG.zorro},
  {provide: DELON_LOCALE, useValue: LANG.delon}
];
// #endregion

// #region JSON Schema form (using @delon/form)
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';

const FORM_MODULES = [JsonSchemaModule];
// #endregion


// #region Http Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {  DefaultInterceptor } from '@core';


const INTERCEPTOR_PROVIDES = [
  {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true}
];
// #endregion

// #region global third module
const GLOBAL_THIRD_MODULES = [];
// #endregion

// #region Startup Service
import { StartupService } from '@core';

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
];
// #endregion

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { JWTInterceptor } from "@delon/auth";
import { GlobalConfigModule } from "./global-config.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GlobalConfigModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    ...FORM_MODULES,
    ...GLOBAL_THIRD_MODULES
  ],
  providers: [
    ...LANG_PROVIDES,
    ...INTERCEPTOR_PROVIDES,
    ...APPINIT_PROVIDES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

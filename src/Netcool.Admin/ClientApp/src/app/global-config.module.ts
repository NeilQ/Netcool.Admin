import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '@core';
import { DelonMockModule } from '@delon/mock';
import { AlainThemeModule } from '@delon/theme';

import { ACLCanType, DelonACLModule } from '@delon/acl';
import { AlainConfig, ALAIN_CONFIG } from '@delon/util';
// Please refer to: https://ng-alain.com/docs/global-config
// #region NG-ALAIN Config


const alainConfig: AlainConfig = {
  st: {modal: {size: 'lg'}},
  sf: {
    ui: {
      spanLabelFixed: 100,
      grid: {span: 12},
    } as SFUISchemaItem
  },
  pageHeader: {home: ''},
  auth: {
    login_url: '/passport/login',
    token_exp_offset: 60
  },
  acl: {
    preCan: (roleOrAbility: ACLCanType) => {
      if (roleOrAbility != null) {
        const str = roleOrAbility.toString();
        return {ability: [str]}
      } else return {ability: [""]};
    }
  },
};

// mock
import { environment } from '@env/environment';
import * as MOCK_DATA from '../../_mock';

if (!environment.production) {
  alainConfig.mock = {data: MOCK_DATA};
}

const alainModules = [AlainThemeModule.forRoot(), DelonACLModule.forRoot(), DelonMockModule.forRoot()];


const alainProvides = [
  {provide: ALAIN_CONFIG, useValue: alainConfig}
];

// #region reuse-tab
/**
 * 若需要[路由复用](https://ng-alain.com/components/reuse-tab)需要：
 * 1、在 `shared-delon.module.ts` 导入 `ReuseTabModule` 模块
 * 2、注册 `RouteReuseStrategy`
 * 3、在 `src/app/layout/default/default.component.html` 修改：
 *  ```html
 *  <section class="alain-default__content">
 *    <reuse-tab #reuseTab></reuse-tab>
 *    <router-outlet (activate)="reuseTab.activate($event)"></router-outlet>
 *  </section>
 *  ```
 */
// import { RouteReuseStrategy } from '@angular/router';
// import { ReuseTabService, ReuseTabStrategy } from '@delon/abc/reuse-tab';
// alainProvides.push({
//   provide: RouteReuseStrategy,
//   useClass: ReuseTabStrategy,
//   deps: [ReuseTabService],
// } as any);

// #endregion

// #endregion

// Please refer to: https://ng.ant.design/docs/global-config/en#how-to-use
// #region NG-ZORRO Config

import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { SFUISchemaItem } from "@delon/form";

const ngZorroConfig: NzConfig = {};

const zorroProvides = [{provide: NZ_CONFIG, useValue: ngZorroConfig}];

// #endregion


@NgModule({
  imports: [...alainModules],
})
export class GlobalConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: GlobalConfigModule) {
    throwIfAlreadyLoaded(parentModule, 'GlobalConfigModule');
  }

  static forRoot(): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: [...alainProvides, ...zorroProvides],
    };
  }
}

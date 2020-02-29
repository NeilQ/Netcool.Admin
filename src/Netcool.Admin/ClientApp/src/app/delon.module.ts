/**
 * 进一步对基础模块的导入提炼
 * 有关模块注册指导原则请参考：https://ng-alain.com/docs/module
 */
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { throwIfAlreadyLoaded } from './core';

import { AlainThemeModule } from '@delon/theme';
import { ACLCanType, DelonACLConfig, DelonACLModule } from '@delon/acl';

// #region mock
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';
import { environment } from '../environments/environment';

const MOCK_MODULES = !environment.production ? [DelonMockModule.forRoot({data: MOCKDATA})] : [];
// #endregion

// #region reuse-tab
/**
 * 若需要[路由复用](https://ng-alain.com/components/reuse-tab)需要：
 * 1、增加 `REUSETAB_PROVIDES`
 * 2、在 `src/app/layout/default/default.component.html` 修改：
 *  ```html
 *  <section class="alain-default__content">
 *    <reuse-tab></reuse-tab>
 *    <router-outlet></router-outlet>
 *  </section>
 *  ```
 */
//import { RouteReuseStrategy } from '@angular/router';
//import { ReuseTabService, ReuseTabStrategy } from '@delon/abc/reuse-tab';

const REUSETAB_PROVIDES = [
  // {
  //   provide: RouteReuseStrategy,
  //   useClass: ReuseTabStrategy,
  //   deps: [ReuseTabService],
  // },
];
// #endregion

// #region global config functions

import { PageHeaderConfig } from '@delon/abc';

export function fnPageHeaderConfig(): PageHeaderConfig {
  return {
    ...new PageHeaderConfig(),
    homeI18n: 'home',
  };
}


// tslint:disable-next-line: no-duplicate-imports
import { STConfig } from '@delon/abc';

export function fnSTConfig(): STConfig {
  return {
    ...new STConfig(),
    modal: {size: 'lg'},
  };
}

import {
  DelonFormConfig,
} from '@delon/form';

export function fnDelonFormConfig(): DelonFormConfig {
  return Object.assign(new DelonFormConfig(), {
    // values
  });
}

import { DelonAuthConfig } from '@delon/auth';

export function fnDelonAuthConfig(): DelonAuthConfig {
  return Object.assign(new DelonAuthConfig(), {
    login_url: '/passport/login',
    token_exp_offset: '60'
  });
}

export function fnDelonACLConfig(): DelonACLConfig {
  return {
    ...new DelonACLConfig(),
    ...{
      preCan: (roleOrAbility: ACLCanType) => {
        const str = roleOrAbility.toString();
        return {ability: [str]}
      }
    } as DelonACLConfig
  };
}




const GLOBAL_CONFIG_PROVIDES = [
  // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `st` 的页码默认为 `20` 行
  {provide: STConfig, useFactory: fnSTConfig},
  {provide: PageHeaderConfig, useFactory: fnPageHeaderConfig},
  {provide: DelonAuthConfig, useFactory: fnDelonAuthConfig},
  {provide: DelonFormConfig, useFactory: fnDelonFormConfig},
  {provide: DelonACLConfig, useFactory: fnDelonACLConfig},
];

// #endregion

@NgModule({
  imports: [AlainThemeModule.forRoot(), DelonACLModule.forRoot(), ...MOCK_MODULES],
})
export class DelonModule {
  constructor(@Optional() @SkipSelf() parentModule: DelonModule) {
    throwIfAlreadyLoaded(parentModule, 'DelonModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [...REUSETAB_PROVIDES, ...GLOBAL_CONFIG_PROVIDES],
    };
  }
}

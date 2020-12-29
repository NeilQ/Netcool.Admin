import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { zip } from "rxjs";
import { EnumService } from "@services";

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private enumService:EnumService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get('assets/tmp/app-data.json')
    ).pipe(
      catchError(([appData]) => {
        resolve(null);
        return [appData];
      })
    ).subscribe(([appData]) => {
        // Application data
        const res: any = appData;
        // Application information: including site name, description, year
        this.settingService.setApp(res.app);
        // User information: including name, avatar, email address
        this.settingService.setUser(res.user);
        // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
        this.aclService.setFull(true);
        // Menu data, https://ng-alain.com/theme/menu
        this.menuService.add(res.menu);
        // Can be set page suffix title, https://ng-alain.com/theme/title
        this.titleService.prefix = res.app.name;
      },
      () => {
      },
      () => {
        resolve(null);
      });
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMock(resolve, reject);


      const app: any = {
        name: `Netcool.Admin`,
        description: `Netcool.Admin front-end.`
      };
      this.settingService.setApp(app);
      this.titleService.prefix = app.name;

      this.enumService.loadEnums();

      let user = this.settingService.user;
      this.aclService.setFull(false)
      this.aclService.setAbility(user.permissionCodes);

      this.httpClient.get(`api/users/${user.id}/menus/tree`)
        .subscribe((tree: any) => {
            let rootMenu = {
              text: '导航',
              group: true,
              children: []
            };
            this.appendChildren(rootMenu, tree);
            this.menuService.add([rootMenu]);
          },
          error => {
            console.error(error);
            resolve(null);
          }, () => {
            resolve(null);
          });
    });
  }

  private appendChildren(parent, tree): void {
    if (tree == null || tree.children == null || tree.children.length == 0) {
      return;
    }
    for (let i = 0; i < tree.children.length; i++) {
      let item = tree.children[i];
      let menu = {
        group: true,
        text: item.displayName,
        link: (parent.link || '') + item.route,
        icon: {type: 'icon', value: item.icon},
        children: []
      };
      parent.children.push(menu);
      if (item.children != null && item.children.length > 0) {
        menu.group = false;
        this.appendChildren(menu, item)
      } else {
        menu.group = true;
      }
    }
  }

}

import { Component } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { UserService } from "@services";
import { AuthUserEditComponent } from "./edit/edit.component";
import { NotificationService } from "@services";
import { CrudTableComponentBase, User } from "@models";
import { AuthUserRoleEditComponent } from "./edit-role/edit-role.component";
import { AuthUserResetPasswordComponent } from "./reset-password/reset-password.component";

@Component({
  selector: 'auth-user',
  templateUrl: './user.component.html',
})
export class AuthUserComponent extends CrudTableComponentBase<User> {

  editComponent = AuthUserEditComponent;

  constructor(protected apiService: UserService,
              protected modal: ModalHelper,
              protected notificationService: NotificationService) {
    super(apiService, modal, notificationService);
    this.columns = [
      {title: 'id', index: 'id', type: 'checkbox'},
      {title: '名称', width: "120px", index: 'name'},
      {title: '昵称', width: "120px", index: 'displayName'},
      {title: '电话', width: "200px", index: 'phone'},
      {title: '邮箱', width: "200px", index: 'email'},
      {title: '性别', width: "80px", index: 'genderDescription'},
      {
        title: '是否启用', width: "80px", index: 'isActive', type: 'badge',
        badge: {
          true: {text: '启用', color: 'success'},
          false: {text: '禁用', color: 'default'},
        },
      },
      {title: '角色', width: "200px", index: 'roles', format: item => item.roles.map(t => (t.name)).join(', ')},
      {
        title: '操作', width: "200px", buttons: [
          {
            text: '编辑', icon: 'edit', type: 'modal',
            modal: {component: this.editComponent, params: (record) => Object},
            click: () => this.onSaveSuccess()
          },
          {
            text: '角色', icon: 'edit', type: 'modal',
            modal: {component: AuthUserRoleEditComponent, params: (record) => Object},
            click: () => this.onSaveSuccess()
          },
          {
            text: '重置密码', icon: 'edit', type: 'modal',
            modal: {component: AuthUserResetPasswordComponent, params: (record) => Object}
          },
        ]
      }
    ];
  }

}

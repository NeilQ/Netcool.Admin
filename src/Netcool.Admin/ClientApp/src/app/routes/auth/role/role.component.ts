import { Component } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { RoleService } from "@services";
import { AuthRoleEditComponent } from "./edit/edit.component";
import { NotificationService } from "@services";
import { CrudTableComponentBase } from "@models";
import { Role } from "@models";

@Component({
  selector: 'auth-role',
  templateUrl: './role.component.html',
})
export class AuthRoleComponent extends CrudTableComponentBase<Role> {

  constructor(protected apiService: RoleService,
              protected modal: ModalHelper,
              protected notificationService: NotificationService) {
    super(apiService, modal, notificationService);
    this.deleteConfirmMessage = '删除角色将移除与用户的关联，是否继续？';
    this.editComponent = AuthRoleEditComponent;
    this.columns = [
      {title: 'id', index: 'id', type: 'checkbox'},
      {title: '名称', width: "200px", index: 'name'},
      {title: '备注', index: 'notes'},
      {
        title: '操作', width: "200px",
        buttons: this.buttons
      }
    ];
  }

}

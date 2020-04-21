import { Component, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STColumn } from '@delon/abc';
import { RoleService } from "@services";
import { AuthRoleEditComponent } from "./edit/edit.component";
import { NotificationService } from "@services";
import { TableComponentBase } from "@models";
import { Role } from "@models";

@Component({
  selector: 'app-auth-role',
  templateUrl: './role.component.html',
})
export class AuthRoleComponent extends TableComponentBase<Role> {

  columns: STColumn[] = [
    {title: 'id', index: 'id', type: 'checkbox'},
    {title: '名称', width: "200px", index: 'name'},
    {title: '备注', index: 'notes'},
    {
      title: '操作', width: "200px",
      buttons: [
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {component: AuthRoleEditComponent, params: (record) => Object},
          click: 'reload'
        },
      ]
    }
  ];

  constructor(protected apiService: RoleService,
              private modal: ModalHelper,
              private notificationService: NotificationService) {
    super(apiService)
  }

  add() {
    this.modal
      .createStatic(AuthRoleEditComponent)
      .subscribe(() => this.loadData());
  }

  delete() {
    if (this.selectedItems == null || this.selectedItems.length == 0) {
      this.notificationService.errorMessage("请选择");
      return;
    }

    this.notificationService.confirmModal('删除角色将移除与用户的关联，是否继续？', () => {
      this.apiService.delete(this.selectedItems.map(t => t.id))
        .subscribe(() => {
          this.notificationService.successMessage("删除成功");
          this.loadData();
        });
    });
  }

}

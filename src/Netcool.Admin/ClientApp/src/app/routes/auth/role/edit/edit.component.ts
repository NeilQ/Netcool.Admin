import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { RoleService } from "@services";
import { NotificationService } from "@services";
import { Role } from "@models";

@Component({
  selector: 'auth-role-edit',
  templateUrl: './edit.component.html',
})
export class AuthRoleEditComponent implements OnInit {
  title = '角色';
  record: any = {};
  entity: any;
  schema: SFSchema = {
    properties: {
      name: {type: 'string', title: '名称', maxLength: 32},
      notes: {type: 'string', title: '备注', maxLength: 256},
    },
    required: ['name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: {span: 12},
    }
  };

  constructor(
    private modal: NzModalRef,
    private notificationService: NotificationService,
    private roleService: RoleService) {
  }

  ngOnInit(): void {
    if (this.record.id > 0)
      this.roleService.get(this.record.id).subscribe(role => this.entity = role);
    else
      this.entity = new Role();
  }

  save(value: any) {
    if (this.record.id > 0) {
      this.roleService.update(this.record.id, value).subscribe(() => {
        this.modal.close(true);
      });
    } else {
      this.roleService.add(value).subscribe(() => {
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}

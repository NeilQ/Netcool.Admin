import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { SFSchema, SFSchemaEnumType, SFTransferWidgetSchema, SFUISchema } from '@delon/form';
import { EnumService, RoleService, UserService } from "@services";
import { NotificationService } from "@services";
import { Role } from "@models";
import { map, tap } from "rxjs/operators";

@Component({
  selector: 'auth-user-role-edit',
  templateUrl: './edit-role.component.html',
})
export class AuthUserRoleEditComponent implements OnInit {
  loading = true;
  title = '用户角色';
  record: any = {};
  schema: SFSchema = {
    properties: {
      roleIds: {
        type: 'number',
        title: '角色',
        ui: {
          widget: 'transfer',
          titles: ['未拥有', '已拥有'],
          asyncData: () => this.roleService.list()
            .pipe(map<Role[], SFSchemaEnumType[]>(val => val.map(t => ({
                title: t.name,
                value: t.id
              } as SFSchemaEnumType)))
            )
        } as SFTransferWidgetSchema,
        default: [11, 12],
      }
    }
  };

  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: {span: 24},
    }
  };

  constructor(
    private modal: NzModalRef,
    private notificationService: NotificationService,
    private enumService: EnumService,
    private roleService: RoleService,
    private apiService: UserService) {
  }

  ngOnInit(): void {
    if (this.record && this.record.id > 0) {
      this.loading = true;
      this.apiService.getRoles(this.record.id)
        .pipe(tap(() => {
          this.loading = false
        }))
        .subscribe(roles => {
          if (roles) {
            this.schema.properties.roleIds.default = roles.map(t => t.id);
          }
        });
    } else {
      this.notificationService.errorMessage("未选择用户");
    }
  }

  save(value: any) {
    let roleIds = value.roleIds || []
    this.apiService.setRoles(this.record.id, roleIds).subscribe(() => {
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}

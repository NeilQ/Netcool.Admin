import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { EnumService, UserService } from "@services";
import { NotificationService } from "@services";
import { User } from "@models";

@Component({
  selector: 'auth-user-edit',
  templateUrl: './edit.component.html',
})
export class AuthUserEditComponent implements OnInit {
  title = '用户';
  record: any = {};
  entity: any;
  schema: SFSchema = {
    properties: {
      name: {type: 'string', title: '账号名称', maxLength: 32},
      displayName: {type: 'string', title: '昵称', maxLength: 256},
      isActive: {
        type: 'boolean', title: '是否启用',
        ui: {
          widget: 'checkbox',
        }
      },
      gender: {
        type: 'number', title: '性别',
        ui: {
          widget: 'select',
        },
        enum: this.enumService.getEnum('gender').map(t => ({label: t.name, value: t.value}))
      },
      email: {type: 'string', title: '邮箱', maxLength: 256},
      phone: {type: 'string', title: '电话', maxLength: 64},
    },
    required: ['name', 'gender'],
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
    private enumService: EnumService,
    private apiService: UserService,) {
  }

  ngOnInit(): void {
    if (this.record.id > 0)
      this.apiService.get(this.record.id).subscribe(data => this.entity = data);
    else
      this.entity = new User();
  }

  save(value: any) {
    if (this.record.id > 0) {
      this.apiService.update(this.record.id, value).subscribe(() => {
        this.modal.close(true);
      });
    } else {
      this.apiService.add(value).subscribe(() => {
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}

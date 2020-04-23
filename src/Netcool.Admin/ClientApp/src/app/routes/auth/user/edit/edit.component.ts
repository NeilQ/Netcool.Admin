import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {  UserService } from "@services";
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
      name: {type: 'string', title: '名称', maxLength: 32},
      notes: {type: 'string', title: '备注', maxLength: 256},
    },
    required: ['name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: {span: 12},
    },
    $name: {
      widget: 'string'
    },
    $notes: {
      widget: 'string',
    }
  };

  constructor(
    private modal: NzModalRef,
    private notificationService: NotificationService,
    private apiService: UserService,
    public http: _HttpClient,
  ) {
  }

  ngOnInit(): void {
    if (this.record.id > 0)
      this.apiService.get(this.record.id).subscribe(role => this.entity = role);
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

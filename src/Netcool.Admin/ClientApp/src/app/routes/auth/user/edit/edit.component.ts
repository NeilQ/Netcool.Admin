import {  Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFComponent, SFSchema, SFSelectWidgetSchema, SFUISchema } from '@delon/form';
import { EnumService, UserService } from "@services";
import { NotificationService } from "@services";
import { User } from "@models";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: 'auth-user-edit',
  templateUrl: './edit.component.html',
})
export class AuthUserEditComponent implements OnInit {
  title = '用户';
  record: any = {};
  entity: any;
  @ViewChild('sf', { static: false } ) private sf: SFComponent;
  schema: SFSchema = {
    properties: {
      name: {type: 'string', title: '账号名称', maxLength: 32},
      displayName: {type: 'string', title: '昵称', maxLength: 256},
      gender: {
        type: 'number', title: '性别',
        ui: {
          widget: 'select',
          asyncData: () =>
            of([
              {label: '待支付', value: 'WAIT_BUYER_PAY'},
              {label: '已支付', value: 'TRADE_SUCCESS'},
              {label: '交易完成', value: 'TRADE_FINISHED'},
            ]).pipe(delay(1200)),
        } as SFSelectWidgetSchema,
          enum: [
            {label: '待支付', value: 'WAIT_BUYER_PAY'},
            {label: '已支付', value: 'TRADE_SUCCESS'},
            {label: '交易完成', value: 'TRADE_FINISHED'},
          ]

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
    private apiService: UserService,
    public http: _HttpClient,
  ) {
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

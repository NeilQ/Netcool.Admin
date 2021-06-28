import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper } from '@delon/theme';
import { Announcement, CrudTableComponentBase } from "@models";
import { AnnouncementService, EnumService, NotificationService } from "@services";
import { SysAnnouncementEditComponent } from "./edit/edit.component";

@Component({
  selector: 'sys-announcement',
  templateUrl: './announcement.component.html',
})
export class SysAnnouncementComponent extends CrudTableComponentBase<Announcement> implements OnInit {

  searchSchema: SFSchema = {
    properties: {
      title: {type: 'string', title: '标题', maxLength: 32},
      status: {
        type: 'number', title: '状态',
        ui: {
          widget: 'select',
          allowClear: true
        },
        enum: this.enumService.getEnum('announcementStatus').map(t => ({
          label: t.name,
          value: t.value
        }))
      },
    }
  };

  constructor(protected apiService: AnnouncementService,
              protected modal: ModalHelper,
              protected notificationService: NotificationService,
              private enumService: EnumService) {
    super(apiService, modal, notificationService)
    this.editComponent = SysAnnouncementEditComponent;
    this.columns = [
      {title: "id", index: "id", type: "checkbox"},
      {title: '标题', index: 'title'},
      {title: '状态', index: 'statusDescription', width: '120px'},
      {title: '通知对象', index: 'notifyTargetTypeDescription', width: '120px'},
      {
        title: "操作", width: "200px",
        buttons: [
          {
            text: "编辑", icon: "edit", type: "modal",
            modal: {component: this.editComponent, params: (record) => Object, modalOptions: {nzKeyboard: false}},
            acl: this.permissions.configUpdate,
            click: () => this.onSaveSuccess()
          }
        ]
      }
    ];
  }


}

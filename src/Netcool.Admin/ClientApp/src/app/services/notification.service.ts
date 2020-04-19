import { Injectable } from '@angular/core';
import { NzMessageService, NzModalService, NzNotificationService } from "ng-zorro-antd";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private modalService: NzModalService,
              private message: NzMessageService,
              private notification: NzNotificationService) {
  }

  successMessage(content?: string) {
    this.message.success(content);
  }

  errorNotification(title: string, content?: string, type?: string) {
    if (type != null && type === 'message') {
      this.message.error(content);
      return;
    }

    this.notification.create('error', title, content);
  }

  infoNotification(title: string, content?: string) {
    this.notification.create('info', title, content);
  }

  warningNotification(title: string, content?: string) {
    this.notification.create('warning', title, content);
  }

  confirmDeleteModal(onOk: Function) {
    this.modalService.confirm({
      nzTitle: '确定要删除该记录吗？',
      nzContent: '',
      nzOkType: 'danger',
      nzOnOk: () => onOk(),
    });
  }

  confirmModal(message: string, onOk: Function) {
    this.modalService.confirm({
      nzTitle: message,
      nzContent: '',
      nzOkType: 'danger',
      nzOnOk: () => onOk(),
    });
  }
}

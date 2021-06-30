import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AnnouncementService, NotificationService } from "@services";

@Component({
  selector: 'sys-announcement-view',
  templateUrl: './view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SysAnnouncementViewComponent implements OnInit {
  id: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    private notificationService: NotificationService,
    private apiService: AnnouncementService
  ) {
  }

  ngOnInit(): void {
    this.apiService.get(this.id).subscribe(anno => {
      this.i = anno;
    })
  }

  close(): void {
    this.modal.destroy();
  }
}

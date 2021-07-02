import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AnnouncementService, NotificationService, UserAnnouncementService } from "@services";
import { switchMap } from "rxjs/operators";
import { SettingsService } from "@delon/theme";
import { UserAnnouncement } from "@models";
import { of } from "rxjs";

@Component({
  selector: 'sys-announcement-view',
  templateUrl: './view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SysAnnouncementViewComponent implements OnInit {
  id: any = {};
  isRead: false;
  i: any;

  constructor(
    private modal: NzModalRef,
    private notificationService: NotificationService,
    private apiService: AnnouncementService,
    private uaService: UserAnnouncementService,
    private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.apiService.get(this.id)
      .pipe(switchMap((announcement) => {
        this.i = announcement;
        if (this.isRead) return of();
        let input = {userId: this.settingsService.user.id, announcementIds: [this.id]};
        return this.uaService.read(input);
      }))
      .subscribe(() => {
        this.uaService.read$.next(this.id);
      })
  }

  close(): void {
    this.modal.destroy();
  }
}

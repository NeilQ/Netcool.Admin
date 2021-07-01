import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationService, UserAnnouncementService } from "@services";
import { ModalHelper, SettingsService } from "@delon/theme";
import { PagedResult, UserAnnouncement } from "@models";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { NzDrawerRef } from "ng-zorro-antd/drawer";
import { SysAnnouncementViewComponent } from "../view/view.component";

@Component({
  selector: 'sys-user-announcement',
  templateUrl: './user-announcement.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SysUserAnnouncementComponent implements OnInit {

  constructor(
    private drawer: NzDrawerRef,
    private modal: ModalHelper,
    private notificationService: NotificationService,
    private settingsService: SettingsService,
    private apiService: UserAnnouncementService) {
  }

  ds: UserAnnouncement[] = [];

  loading: boolean = false;
  total: number = 0;
  pageIndex: number = 1;
  pageSize: number = 30;

  userId: number;

  ngOnInit(): void {
    this.userId = this.settingsService.user.id;
    this.loadMore();
  }

  loadMore(): void {
    this.loading = true;
    setTimeout(() => {
      this.loadData()
        .pipe(tap(() => {
          this.loading = false;
        }))
        .subscribe(data => {
          if (data) {
            this.ds = [...this.ds, ...data.items];
            this.total = data.total;
          }
          this.pageIndex++;
        })
    }, 10);
  }

  loadData(): Observable<PagedResult<UserAnnouncement>> {
    return this.apiService.page(this.pageIndex, this.pageSize, {userId: this.userId});
  }

  select(announcementId): void {
    this.modal
      .create(SysAnnouncementViewComponent, {id: announcementId}, {
        modalOptions: {
          nzMaskClosable: false,
          nzKeyboard: false
        }
      })
      .subscribe(() => {
      });
  }

  close() {
    this.drawer.close();
  }

}

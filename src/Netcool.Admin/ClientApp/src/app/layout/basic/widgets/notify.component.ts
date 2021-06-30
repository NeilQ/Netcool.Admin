import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NoticeIconList, NoticeIconSelect, NoticeItem } from '@delon/abc/notice-icon';
import parse from 'date-fns/parse';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserAnnouncementService } from "@services";
import { format } from "date-fns";
import { ModalHelper, SettingsService } from "@delon/theme";
import { SysAnnouncementViewComponent } from "../../../routes/sys/announcement/view/view.component";

@Component({
  selector: 'header-notify',
  template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="alain-default__nav-item"
      btnIconClass="alain-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
    ></notice-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNotifyComponent implements OnInit {
  data: NoticeItem[] = [
    {
      title: '公告',
      list: [],
      emptyText: '你已查看所有公告',
      //emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
      clearText: '查看所有',
    },
    {
      title: '消息',
      list: [],
      emptyText: '您已读完所有消息',
      //emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg',
      clearText: '清空消息',
    }
  ];
  count = 0;
  loading = false;
  userId: number;

  constructor(private msg: NzMessageService,
              private nzI18n: NzI18nService,
              private modal: ModalHelper,
              private settingsService: SettingsService,
              private cdr: ChangeDetectorRef,
              private userAnnouncementService: UserAnnouncementService) {
  }

  ngOnInit() {
    this.userId = this.settingsService.user.id;
    this.loadData();
  }

  private updateNoticeData(notices: NoticeIconList[]): NoticeItem[] {
    const data = this.data.slice();
    data.forEach((i) => (i.list = []));

    notices.forEach((item) => {
      const newItem = {...item} as NoticeIconList;
      if (typeof newItem.datetime === 'string') {
        newItem.datetime = parse(newItem.datetime, 'yyyy-MM-dd', new Date());
      }
      if (newItem.datetime) {
        newItem.datetime = format(newItem.datetime, 'yyyy-MM-dd HH:mm');
      }
      if (newItem.extra && newItem.status) {
        newItem.color = ({
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        } as { [key: string]: string | undefined })[newItem.status];
      }
      data.find((w) => w.title === newItem.type)!.list.push(newItem);
    });
    return data;
  }

  loadData(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    let notifyList = [];
    this.userAnnouncementService.page(1, 50, {userId: this.userId, isRead: false})
      .subscribe((data) => {
        data.items.forEach(item => {
          notifyList.push({
            id: item.announcement.id,
            title: item.announcement.title,
            datetime: item.announcement.updateTime,
            type: '公告',
          })
        })
        this.count = data.items.length;
        this.data = this.updateNoticeData(notifyList);
        //this.cdr.detectChanges();
        this.loading = false;
      });
  }

  clear(type: string): void {
    //this.msg.success(`清空了 ${type}`);
  }

  select(res: NoticeIconSelect): void {
    let id = res.item['id'];
    //let type = res.item['type'];

    this.modal
      .createStatic(SysAnnouncementViewComponent, {id: id, userId: this.userId}, {
        modalOptions: {
          nzMaskClosable: false,
          nzKeyboard: false
        }
      })
      .subscribe(() => {
      });
  }
}

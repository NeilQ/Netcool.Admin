import { Component, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STChange, STColumn, STData, STPage } from '@delon/abc';
import { Role } from "@models";
import { RoleService } from "@services";
import { AuthRoleEditComponent } from "./edit/edit.component";
import { tap } from "rxjs/operators";
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: 'app-auth-role',
  templateUrl: './role.component.html',
})
export class AuthRoleComponent implements OnInit {
  data: STData[] = [];
  loading: boolean = false;
  total: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  selectedItems: STData[] = [];

  page: STPage = {
    front: false,
    showSize: true
  };

  columns: STColumn[] = [
    {title: 'id', index: 'id', type: 'checkbox'},
    {title: '名称', width: "200px", index: 'name'},
    {title: '备注', index: 'notes'},
    {
      title: '操作', width: "200px",
      buttons: [
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {component: AuthRoleEditComponent, params: (record) => Object},
          click: 'reload'
        },
      ]
    }
  ];

  constructor(private apiService: RoleService,
              private modal: ModalHelper,
              private notificationService: NotificationService) {
  }

  loadData() {
    this.loading = true;
    this.apiService.page(this.pageIndex, this.pageSize)
      .pipe(tap(() => {
        this.loading = false;
      }))
      .subscribe(data => {
        this.data = data.items;
        this.total = data.total;
      });
  }

  search() {
    this.pageIndex = 1;
    this.loadData()
  }

  ngOnInit() {
    this.loadData();
  }

  onStChange(e: STChange) {
    if (e.type == 'pi' || e.type == 'ps') {
      this.pageIndex = e.pi;
      this.pageSize = e.ps;
      this.loadData();
    } else if (e.type == 'checkbox') {
      this.selectedItems = e.checkbox;
    }
  }

  add() {
    this.modal
      .createStatic(AuthRoleEditComponent)
      .subscribe(() => this.loadData());
  }

  delete() {
    if (this.selectedItems == null || this.selectedItems.length == 0) {
      this.notificationService.errorMessage("请选择");
      return;
    }

    this.notificationService.confirmModal('删除角色将移除与用户的关联，是否继续？', () => {
      this.apiService.delete(this.selectedItems.map(t => t.id))
        .subscribe(() => {
          this.notificationService.successMessage("删除成功");
          this.loadData();
        });
    });
  }

}

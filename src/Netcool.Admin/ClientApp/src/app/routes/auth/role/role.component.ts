import { Component, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STChange, STColumn, STPage } from '@delon/abc';
import { Role } from "@models";
import { RoleService } from "@services";
import { AuthRoleEditComponent } from "./edit/edit.component";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-auth-role',
  templateUrl: './role.component.html',
})
export class AuthRoleComponent implements OnInit {
  data: Role[] = [];
  loading: boolean = false;
  total: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;

  page: STPage = {
    front: false,
    showSize: true
  };

  columns: STColumn[] = [
    {title: '名称', width: "200px", index: 'name'},
    {title: '备注', index: 'notes'},
    {
      title: '操作', width: "200px",
      buttons: [
        {
          text: '编辑',
          type: 'static',
          modal: {component: AuthRoleEditComponent, params: (record) => Object},
          click: 'reload'
        },
      ]
    }
  ];

  constructor(private apiService: RoleService, private modal: ModalHelper) {
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

  changePage(e: STChange) {
    if (e.type == 'pi' || e.type == 'ps') {
      this.pageIndex = e.pi;
      this.pageSize = e.ps;
      this.loadData();
    }
  }

  add() {
    console.log('e')
    this.modal
      .createStatic(AuthRoleEditComponent)
      .subscribe(() => this.loadData());
  }

}

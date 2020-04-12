import { Component, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STChange, STColumn, STPage } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Role } from "@models";
import { RoleService } from "@services";
import { AuthRoleEditComponent } from "./edit/edit.component";

@Component({
  selector: 'app-auth-role',
  templateUrl: './role.component.html',
})
export class AuthRoleComponent implements OnInit {
  data: Role[] = [];

  total: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;

  page: STPage = {
    front: false,
    showSize: true
  };

  searchSchema: SFSchema = {
    properties: {}
  };

  columns: STColumn[] = [
    {title: '名称', width: "200px", index: 'name'},
    {title: '备注', index: 'notes'},
    {
      title: '',
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
    this.apiService.page(this.pageIndex, this.pageSize).subscribe(data => {
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
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}

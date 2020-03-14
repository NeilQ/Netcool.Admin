import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { AppConfigService } from "../../../services/app-config.service";
import { AppConfig } from "@models";

@Component({
  selector: 'app-sys-app-config',
  templateUrl: './app-config.component.html',
})
export class SysAppConfigComponent implements OnInit {
  data: AppConfig[] = [];
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
  @ViewChild('st', {static: false}) st: STComponent;
  columns: STColumn[] = [
    {title: '名称', index: 'name'},
    {title: '值', index: 'value'},
    {title: '说明', index: 'description'},
  ];

  constructor(private apiService: AppConfigService, private modal: ModalHelper) {
  }

  loadData() {
    this.apiService.page(this.pageIndex, this.pageSize).subscribe(data => {
      this.data = data.items;
      this.total = data.total;
      console.log(this.total)
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


}

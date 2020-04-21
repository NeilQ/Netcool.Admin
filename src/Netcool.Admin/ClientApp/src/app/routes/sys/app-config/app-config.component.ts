import { Component } from '@angular/core';
import { STColumn } from '@delon/abc';
import { AppConfigService } from "@services";
import { AppConfig, TableComponentBase } from "@models";

@Component({
  selector: 'app-sys-app-config',
  templateUrl: './app-config.component.html',
})
export class SysAppConfigComponent extends TableComponentBase<AppConfig> {

  columns: STColumn[] = [
    {title: '名称', index: 'name', width: "200px"},
    {title: '值', index: 'value', width: "200px"},
    {title: '说明', index: 'description'},
  ];

  constructor(protected apiService: AppConfigService) {
    super(apiService)
  }


}

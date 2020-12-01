import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from "ng-zorro-antd";
import { MenuService } from "@services";
import { Menu } from "@models";

@Component({
  selector: 'auth-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class AuthMenuComponent implements OnInit {

  nodes: NzTreeNodeOptions[] = [];
  nzSelectedKeys = [];
  currentMenu: Menu;

  @ViewChild('st', {static: false}) st: STComponent;
  columns: STColumn[] = [
    {title: '权限名称', index: 'name'},
    {title: '权限代码', index: 'code'},
    {title: '类型', index: 'typeDescription'},
    {title: '描述',  index: 'notes'},
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.loadTree();
  }

  loadTree() {
    this.menuService.list({sort: "level,order"}).subscribe(data => {
      let root = {
        title: '全部菜单',
        key: 'root',
        expanded: true,
        children: [],
        isLeaf: false,
      };
      let map = new Map<number, NzTreeNodeOptions>();
      data.forEach((value, i) => {
        if (value.parentId == null || value.parentId <= 0) {
          let node = {
            title: value.displayName,
            key: value.id.toString(),
            expanded: true,
            children: [],
            isLeaf: true,
            data: value
          }
          map.set(value.id, node);
          root.children.push(node);
        } else {
          let node = {
            title: value.displayName,
            key: value.id.toString(),
            expanded: true,
            children: [],
            isLeaf: true,
            icon: value.icon,
            data: value
          }
          let parentNode = map.get(value.parentId);
          if (parentNode != null) {
            parentNode.isLeaf = false;
            parentNode.children.push(node);
          }
          map.set(value.id, node);
        }
      });
      this.nodes = [root];
      if (root.children.length > 0) {
        this.nzSelectedKeys = [root.children[0].key];
        this.showInfo(root.children[0].data);
      }
    })
  }

  activeNode(data: NzFormatEmitEvent) {
    if (data == null || data.node.key == 'root') {
      this.currentMenu = null;
      return;
    }
    this.showInfo(data.node!.origin.data)
  }

  showInfo(menu: Menu) {
    console.log(menu)
    this.currentMenu = menu
  }

  expendNode(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }


}

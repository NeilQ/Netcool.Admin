import { OnDestroy, OnInit } from "@angular/core";
import { STChange, STColumn, STData, STPage } from "@delon/abc";
import { CrudRestServiceBase } from "@services";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { PagedResult } from "./dto.common";

export abstract class TableComponentBase<TEntity = any> implements OnInit, OnDestroy {

  data: STData[] = [];
  loading: boolean = false;
  total: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  selectedItems: STData[] = [];

  query: any;

  page: STPage = {
    front: false,
    showSize: true
  };

  columns: STColumn[] = [];

  constructor(protected apiService: CrudRestServiceBase<TEntity>) {
  }

  ngOnInit(): void {
    this.loadLazy()
  }

  ngOnDestroy(): void {
  }

  loadData(): Observable<PagedResult<TEntity>> {
    return this.apiService.page(this.pageIndex, this.pageSize, this.query)
  }

  loadLazy(): void {
    this.loading = true;
    setTimeout(() => {
      this.loadData()
        .pipe(tap(() => {
          this.loading = false;
          this.refreshStatus();
        }))
        .subscribe(data => {
          if (data) {
            this.data = data.items;
            this.total = data.total;
          } else {
            this.data = [];
            this.total = 0;
          }
        })
    }, 100);
  }

  search() {
    this.pageIndex = 1;
    this.loadLazy();
  }

  refreshStatus(): void {
    this.selectedItems = [];
  }

  onStChange(e: STChange) {
    if (e.type == 'pi') {
      this.pageIndex = e.pi;
      this.pageSize = e.ps;
      this.loadLazy();
    } else if (e.type == 'ps') {
      this.pageIndex = 1;
      this.pageSize = e.ps;
      this.loadLazy();
    } else if (e.type == 'checkbox') {
      this.selectedItems = e.checkbox;
    }
  }


}

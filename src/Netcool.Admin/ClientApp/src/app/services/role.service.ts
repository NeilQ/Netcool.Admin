import { CrudRestServiceBase } from "./crud-rest.service";
import { Role, } from "@models";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RoleService extends CrudRestServiceBase<Role> {
  constructor(protected http: HttpClient) {
    super("api/roles", http);
  }

}

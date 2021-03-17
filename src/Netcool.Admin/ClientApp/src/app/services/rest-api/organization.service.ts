import { CrudRestServiceBase } from "./crud-rest.service";
import { Organization } from "@models";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrganizationService extends CrudRestServiceBase<Organization> {
  constructor(protected http: HttpClient) {
    super("api/organizations", http);
  }
}

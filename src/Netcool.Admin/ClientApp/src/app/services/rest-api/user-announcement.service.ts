import { CrudRestServiceBase } from "./crud-rest.service";
import { UserAnnouncement } from "@models";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserAnnouncementService extends CrudRestServiceBase<UserAnnouncement> {
  constructor(protected http: HttpClient) {
    super("api/user-announcements", http);
  }
}

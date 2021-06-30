import { CrudRestServiceBase } from "./crud-rest.service";
import { UserAnnouncement } from "@models";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserAnnouncementService extends CrudRestServiceBase<UserAnnouncement> {
  constructor(protected http: HttpClient) {
    super("api/user-announcements", http);
  }

  publish(id: number): Observable<any> {
    return this.http.put(`${this.apiPrefix}/${id}/publish`, {})
  }

  getUserAnnouncements(userId: number): Observable<UserAnnouncement[]> {
    return this.http.get<UserAnnouncement[]>(`${this.apiPrefix}/user/${userId}`);
  }

}

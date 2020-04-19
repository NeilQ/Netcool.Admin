import { CrudRestServiceBase } from "./crud-rest.service";
import { LoginResult, User } from "@models";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService extends CrudRestServiceBase<User> {
  constructor(protected http: HttpClient) {
    super("api/users", http);
  }

  login(body: { name: string, password: string }): Observable<LoginResult> {
    return this.http.post<LoginResult>("api/account/authenticate?_allow_anonymous=true", body);
  }
}

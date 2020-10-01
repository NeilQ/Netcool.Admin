import { CrudRestServiceBase } from "./crud-rest.service";
import { LoginResult, Role, User } from "@models";
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

  getRoles(id: number): Observable<Role[]> {
    return this.http.get<Role[]>(`api/users/${id}/roles`)
  }

  setRoles(id: number, roleIds: number[]): Observable<any> {
    return this.http.post(`api/users/${id}/roles`, roleIds || [])
  }

  resetPassword(id: number, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`api/users/${id}/password/reset`, {new: newPassword, confirm: confirmPassword});
  }
}

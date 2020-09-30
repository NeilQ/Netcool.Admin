export class PagedResult<T> {
  total: number;
  items: T[]
}

export class NameValue<T> {
  name: string;
  value: T;
}

export class Role {
  id: number;
  name: string;
  notes: string;
}

export class User {
  id: string;
  name: string;
  displayName: string;
  gender: number = 1;
  email: string;
  phone: string;
  isActive: boolean = true;
  genderDescription: string;

  roles: Role[]

  [key: string]: any
}

export interface LoginResult {
  user: User;
  accessToken: string;
  expiryAt: Date;
  permissionCodes: string[]
}

export class AppConfig {
  id: number;
  name: string;
  value: string;
  description: string;
  type: number;
}

export class Menu {
  id: number;
  parentId: number;
  name: string;
  displayName: string;
  type: number;
  route: string;
  icon: string;
  level: number;
  order: number;
  path: string;
  notes: string;
  permissions: Permission[]

  [key: string]: any;
}

export class Permission {
  id: number;
  menuId: number;
  name: number;
  code: number;
  notes: string;
  type: number;

  [key: string]: any;
}

export enum PermissionType {
  Menu,
  Function
}

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
  gender: string;
  email: string;
  phone: string;
  isActive: string;
  genderDescription: string;

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

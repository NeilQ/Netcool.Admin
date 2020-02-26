export class PagedResult<T> {
  total: number;
  items: T[]
}

export class User {
  id: string;
  name: string;
  displayName: string;
  gender: string;
  email: string;
  phone: string;
  isActive: string;

  [key: string]: any
}

export interface LoginResult {
  user: User;
  accessToken: string;
  expiryAt: Date;
  permissionCodes: string[]
}

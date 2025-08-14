export enum Role {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  RIDER = 'rider',
  DRIVER = 'driver'
}


export interface IAuthProvider {
  provider: 'google' | 'credentials';
  providerId?: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role?: Role;
  isBlocked?: boolean;
  isApproved?: boolean;
  isActive?: IsActive;
  vehicleInfo?: string;
  totalEarnings?: number;
  createdAt?: Date;
  updatedAt?: Date;
  auths?: IAuthProvider[];
  isOnline?: boolean;
}

export interface IDriverExtra {
  isApproved: boolean;
  isOnline: boolean;
  vehicleInfo: string;
  totalEarnings?: number;
}

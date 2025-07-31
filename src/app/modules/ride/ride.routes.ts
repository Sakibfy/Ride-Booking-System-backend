// User roles
export type UserRole = 'admin' | 'rider' | 'driver';

// Common for all users
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked?: boolean; // Admin can block/unblock
  createdAt?: Date;
  updatedAt?: Date;
}

// Additional driver-specific fields
export interface IDriverExtra {
  isApproved: boolean;     // Admin must approve
  isOnline: boolean;       // Driver availability status
  vehicleInfo: string;     // Vehicle description
  totalEarnings?: number;  // Optional
}

import { Types } from "mongoose";

export interface ILocation {
  lat: number;
  lng: number;
}

export type RideStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'picked_up';


export interface IRide {
  pickupLocation: Location;
  destinationLocation: Location;
  rider: Types.ObjectId;
  driver?: Types.ObjectId | null;
  status: RideStatus;
  timestamps?: {
    pickedUpAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
  };
}


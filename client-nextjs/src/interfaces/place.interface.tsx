import { OwnerInterface } from "./owner.interface";

export interface PlaceInterface {
  slug: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  itinerary: string;
  owner: OwnerInterface;
}

export interface PlaceCreateInterface {
  name: string;
  description: string;
  itinerary: string;
}

export const PlaceDefaultValues: PlaceCreateInterface = {
  name: "",
  description: "",
  itinerary: "",
};

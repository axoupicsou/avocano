import { ItineraryInterface } from "./itinerary.interface";
import { OwnerInterface } from "./owner.interface";

export interface RoadMapInterface {
  id: string;
  slug: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  itinerary: ItineraryInterface[];
  owner: OwnerInterface;
}

export interface RoadMapCreateInterface {
  name: string;
  description: string;
  is_public: boolean;
}

export const RoadMapDefaultValues: RoadMapCreateInterface = {
  name: "",
  description: "",
  is_public: false,
};

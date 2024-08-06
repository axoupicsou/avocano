import { OwnerInterface } from "./owner.interface";
import { PlaceInterface } from "./place.interface";

export interface ItineraryInterface {
  id: string;
  slug: string;
  road_map: string;
  name: string;
  description: string;
  budget: string;
  continent: string;
  climat: string;
  duration: string;
  things_to_do: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  place: PlaceInterface[];
  owner: OwnerInterface;
}

export interface ItineraryCreateInterface {
  road_map: string;
  name: string;
  description: string;
  budget: string;
  continent: string;
  climat: string;
  duration: string;
  things_to_do: string;
  start_date: string;
  end_date: string;
}

export const ItineraryDefaultValues: ItineraryCreateInterface = {
  road_map: "",
  name: "",
  description: "",
  budget: "all",
  continent: "all",
  climat: "all",
  duration: "all",
  things_to_do: "all",
  start_date: "2024-06-01",
  end_date: "2024-06-01",
};

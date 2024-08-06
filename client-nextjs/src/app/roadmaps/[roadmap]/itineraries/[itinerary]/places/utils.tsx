import { api } from "@/app/fetcher";
import {
  PlaceCreateInterface,
  PlaceInterface,
} from "@/interfaces/place.interface";

const deletePlace = async ({ id }: { id: string }) => {
  return api().delete(`/places/${id}/`);
};

const getPlace = async ({ id }: { id: string }): Promise<PlaceInterface> => {
  return api().get(`/places/${id}/`).json();
};

const getPlaces = async ({
  page = 1,
  itinerary,
}: {
  page?: number;
  itinerary: string;
}): Promise<PlaceInterface[]> => {
  return api().get(`/places/?page=${page}&itinerary=${itinerary}`).json();
};

const createPlace = async ({
  data,
}: {
  data: PlaceCreateInterface;
}): Promise<PlaceInterface> => {
  return api().post(data, "/places/").json();
};

const putPlace = async ({
  place,
  data,
}: {
  place: PlaceInterface;
  data: PlaceCreateInterface;
}): Promise<PlaceInterface> => {
  return api().put(data, `/places/${place.slug}/`).json();
};

export const PlacesActions = () => {
  return {
    createPlace,
    deletePlace,
    getPlace,
    getPlaces,
    putPlace,
  };
};

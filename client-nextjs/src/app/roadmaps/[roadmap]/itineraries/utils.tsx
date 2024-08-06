import { api } from "@/app/fetcher";
import {
  ItineraryCreateInterface,
  ItineraryInterface,
} from "@/interfaces/itinerary.interface";

const deleteItinerary = async ({ id }: { id: string }) => {
  return api().delete(`/itineraries/${id}/`);
};

const getItinerary = async ({
  id,
}: {
  id: string;
}): Promise<ItineraryInterface> => {
  return api().get(`/itineraries/${id}/`).json();
};

const getItineraries = async ({
  page = 1,
  road_map,
}: {
  page?: number;
  road_map: string;
}): Promise<ItineraryInterface[]> => {
  return api().get(`/itineraries/?page=${page}&road_map=${road_map}`).json();
};

const createItinerary = async ({
  data,
}: {
  data: ItineraryCreateInterface;
}): Promise<ItineraryInterface> => {
  return api().post(data, "/itineraries/").json();
};

const putItinerary = async ({
  itinerary,
  data,
}: {
  itinerary: ItineraryInterface;
  data: ItineraryCreateInterface;
}): Promise<ItineraryInterface> => {
  return api().put(data, `/itineraries/${itinerary.slug}/`).json();
};

export const ItinerariesActions = () => {
  return {
    createItinerary,
    deleteItinerary,
    getItinerary,
    getItineraries,
    putItinerary,
  };
};

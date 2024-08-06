import {
  RoadMapCreateInterface,
  RoadMapInterface,
} from "@/interfaces/roadmap.interfaces";
import { api } from "../fetcher";

const deleteRoadMap = async ({ id }: { id: string }) => {
  return api().delete(`/roadmaps/${id}/`);
};

const getRoadMap = async ({
  id,
}: {
  id: string;
}): Promise<RoadMapInterface> => {
  return api().get(`/roadmaps/${id}/`).json();
};

const getRoadMaps = async ({
  page = 1,
}: {
  page?: number;
}): Promise<RoadMapInterface[]> => {
  return api().get(`/roadmaps/?page=${page}`).json();
};

const createRoadMap = async ({
  data,
}: {
  data: RoadMapCreateInterface;
}): Promise<RoadMapInterface> => {
  return api().post(data, "/roadmaps/").json();
};

const putRoadMap = async ({
  roadMap,
  data,
}: {
  roadMap: RoadMapInterface;
  data: RoadMapCreateInterface;
}): Promise<RoadMapInterface> => {
  return api().put(data, `/roadmaps/${roadMap.slug}/`).json();
};

export const RoadMapsActions = () => {
  return {
    createRoadMap,
    deleteRoadMap,
    getRoadMap,
    getRoadMaps,
    putRoadMap,
  };
};

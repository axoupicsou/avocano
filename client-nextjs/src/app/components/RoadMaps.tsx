import React, { useEffect } from "react";
import Link from "next/link";
import { RoadMapsActions } from "../roadmaps/utils";
import { RoadMapInterface } from "@/interfaces/roadmap.interfaces";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";

const RoadMaps = ({ currentPage }: { currentPage: number }) => {
  const { getRoadMaps, deleteRoadMap } = RoadMapsActions();
  // const [roadMaps, setRoadMaps] = React.useState<RoadMapInterface[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(0);

  const dispatch = useAppDispatch();
  const roadMaps = useAppSelector((state) => state.roadmaps.roadmaps);
  console.log(roadMaps);

  useEffect(() => {
    if (roadMaps.length > 0) return;
    async function callApiAsync() {
      await getRoadMaps({ page: currentPage }).then((response: any) => {
        setTotalPages(Math.round(response.count / 10));
        // setRoadMaps(response.results);
        dispatch({
          type: "roadmaps/getRoadmapsState",
          payload: response.results,
        });
      });
    }
    callApiAsync();
  }, [currentPage, getRoadMaps]);

  const handleDelete = async (id: string) => {
    await deleteRoadMap({ id }).then(() => {
      dispatch({
        type: "roadmaps/deleteRoadMapState",
        payload: id,
      });
    });
  };

  return (
    <div className="flex items-center justify-center flex-wrap bg-gray-100">
      {roadMaps &&
        roadMaps.map((roadMap: RoadMapInterface) => (
          <Link href={`/roadmaps/${roadMap.slug}`} key={roadMap.slug}>
            <div className="flex items-center justify-between p-4 mt-4 border rounded-md cursor-pointer hover:bg-gray-200">
              <div>
                <h3 className="text-xl font-semibold">{roadMap.name}</h3>
                <p className="text-sm">{roadMap.description}</p>
              </div>
              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    handleDelete(roadMap.slug);
                  }}
                  className="px-4 py-2 text-white bg-red-600 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </Link>
        ))}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default RoadMaps;

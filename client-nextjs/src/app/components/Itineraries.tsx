import React, { useEffect } from "react";
import Link from "next/link";
import { RoadMapInterface } from "@/interfaces/roadmap.interfaces";
import Pagination from "./Pagination";
import { ItinerariesActions } from "@/app/roadmaps/[roadmap]/itineraries/utils";
import { ItineraryInterface } from "@/interfaces/itinerary.interface";

const Itineraries = ({
  currentPage,
  road_map,
}: {
  currentPage: number;
  road_map: string;
}) => {
  const { getItineraries, deleteItinerary } = ItinerariesActions();
  const [itineraries, setItineraries] = React.useState<ItineraryInterface[]>(
    []
  );
  const [totalPages, setTotalPages] = React.useState<number>(0);

  useEffect(() => {
    async function callApiAsync() {
      await getItineraries({ page: currentPage, road_map }).then(
        (response: any) => {
          setTotalPages(Math.round(response.count / 10));
          setItineraries(response.results);
        }
      );
    }
    callApiAsync();
  }, [currentPage, getItineraries, road_map]);

  const handleDelete = async (id: string) => {
    await deleteItinerary({ id }).then(() => {
      getItineraries({ page: currentPage, road_map }).then((response: any) => {
        setTotalPages(Math.round(response.count / 10));
        setItineraries(response.results);
      });
    });
  };

  return (
    <div className="flex items-center justify-center flex-wrap bg-gray-100">
      {itineraries &&
        itineraries.map((itinerary: ItineraryInterface) => (
          <Link href={`itineraries/${itinerary.slug}`} key={itinerary.slug}>
            <div className="flex items-center justify-between p-4 mt-4 border rounded-md cursor-pointer hover:bg-gray-200">
              <div>
                <h3 className="text-xl font-semibold">{itinerary.name}</h3>
                <p className="text-sm">{itinerary.description}</p>
              </div>
              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    handleDelete(itinerary.slug);
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

export default Itineraries;

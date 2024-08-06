import React, { useEffect } from "react";
import Link from "next/link";
import { RoadMapInterface } from "@/interfaces/roadmap.interfaces";
import Pagination from "./Pagination";
import { PlacesActions } from "../roadmaps/[roadmap]/itineraries/[itinerary]/places/utils";

const Places = ({
  currentPage,
  itinerary,
}: {
  currentPage: number;
  itinerary: string;
}) => {
  const { getPlaces, deletePlace } = PlacesActions();
  const [places, setPlaces] = React.useState<RoadMapInterface[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(0);

  useEffect(() => {
    async function callApiAsync() {
      await getPlaces({ page: currentPage, itinerary }).then(
        (response: any) => {
          setTotalPages(Math.round(response.count / 10));
          setPlaces(response.results);
        }
      );
    }
    callApiAsync();
  }, [currentPage, getPlaces, itinerary]);

  const handleDelete = async (id: string) => {
    await deletePlace({ id }).then(() => {
      getPlaces({ page: currentPage, itinerary }).then((response: any) => {
        setTotalPages(Math.round(response.count / 10));
        setPlaces(response.results);
      });
    });
  };

  return (
    <div className="flex items-center justify-center flex-wrap bg-gray-100">
      {places &&
        places.map((itinerary: RoadMapInterface) => (
          <Link href={`places/${itinerary.slug}`} key={itinerary.slug}>
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

export default Places;

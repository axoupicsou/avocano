import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import InputForm from "./InputForm";
import { ItineraryDefaultValues } from "@/interfaces/itinerary.interface";
import { PlacesActions } from "../roadmaps/[roadmap]/itineraries/[itinerary]/places/utils";
import {
  PlaceCreateInterface,
  PlaceInterface,
} from "@/interfaces/place.interface";

type FormData = PlaceCreateInterface;

const Place = ({ place_id }: { place_id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormData>({
    defaultValues: ItineraryDefaultValues,
  });

  const router = useRouter();

  const [place, setPlace] = React.useState<PlaceInterface | null>(null);
  const { getPlace, putPlace, deletePlace } = PlacesActions();

  useEffect(() => {
    async function callApiAsync() {
      await getPlace({ id: place_id }).then((response: PlaceInterface) => {
        setPlace(response);
        reset({
          name: response.name,
          description: response.description,
        });
      });
    }
    callApiAsync();
  }, [getPlace, place_id, reset]);

  const onSubmit = async (data: FormData) => {
    if (!data || !place) {
      return;
    }
    await putPlace({ place, data })
      .then((response: PlaceInterface) => {
        setPlace(response);
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  const handleItineraryDelete = async () => {
    if (!place) {
      return;
    }
    await deletePlace({ id: place.slug })
      .then(() => {
        router.push(`/places`);
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold">Here your Place</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <InputForm
            text={place?.name || ""}
            registerOption="name"
            register={register}
            errors={errors}
            required
          />
          <InputForm
            text={place?.description || ""}
            registerOption="description"
            register={register}
            errors={errors}
          />
          <div className="flex items-center justify-between mt-4">
            <button className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Edit
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                handleItineraryDelete();
              }}
              className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Delete
            </button>
          </div>
          {errors.root && (
            <span className="text-xs text-red-600">{errors.root.message}</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Place;

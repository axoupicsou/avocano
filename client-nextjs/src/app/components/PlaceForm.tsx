import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputForm from "./InputForm";
import {
  PlaceCreateInterface,
  PlaceDefaultValues,
  PlaceInterface,
} from "@/interfaces/place.interface";
import { PlacesActions } from "../roadmaps/[roadmap]/itineraries/[itinerary]/places/utils";

type FormData = PlaceCreateInterface;

const PlaceForm = ({
  road_map,
  itinerary,
}: {
  road_map: string;
  itinerary: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: PlaceDefaultValues,
  });

  const router = useRouter();

  const { createPlace } = PlacesActions();

  const onSubmit = async (data: FormData) => {
    data.itinerary = itinerary;
    await createPlace({ data })
      .then((response: PlaceInterface) => {
        router.push(
          `/roadmaps/${road_map}/itineraries/${itinerary}/places/${response.slug}`
        );
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <h3 className="text-2xl font-semibold">Create your Place</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <InputForm
            registerOption="name"
            register={register}
            errors={errors}
            required
          />
          <InputForm
            registerOption="description"
            register={register}
            errors={errors}
          />
          <div className="flex items-center justify-between mt-4">
            <button className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Create
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

export default PlaceForm;

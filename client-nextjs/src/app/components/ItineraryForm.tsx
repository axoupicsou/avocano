import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputForm from "./InputForm";
import {
  ItineraryCreateInterface,
  ItineraryDefaultValues,
  ItineraryInterface,
} from "@/interfaces/itinerary.interface";
import { ItinerariesActions } from "../roadmaps/[roadmap]/itineraries/utils";

type FormData = ItineraryCreateInterface;

const ItineraryForm = ({ road_map }: { road_map: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: ItineraryDefaultValues,
  });

  const router = useRouter();

  const { createItinerary } = ItinerariesActions();

  const onSubmit = async (data: FormData) => {
    data.road_map = road_map;
    await createItinerary({ data })
      .then((response: ItineraryInterface) => {
        router.push(`/roadmaps/${road_map}/itineraries/${response.slug}/`);
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <h3 className="text-2xl font-semibold">Create your Itinerary</h3>
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
          <InputForm
            registerOption="budget"
            register={register}
            errors={errors}
          />
          <InputForm
            registerOption="continent"
            register={register}
            errors={errors}
          />
          <InputForm
            registerOption="climat"
            register={register}
            errors={errors}
          />
          <InputForm
            registerOption="duration"
            register={register}
            errors={errors}
          />
          <InputForm
            registerOption="things_to_do"
            register={register}
            errors={errors}
          />
          <InputForm
            registerOption="start_date"
            register={register}
            errors={errors}
          />
          <InputForm
            registerOption="end_date"
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

export default ItineraryForm;

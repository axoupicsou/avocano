import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import InputForm from "./InputForm";
import {
  ItineraryCreateInterface,
  ItineraryDefaultValues,
  ItineraryInterface,
} from "@/interfaces/itinerary.interface";
import { ItinerariesActions } from "../roadmaps/[roadmap]/itineraries/utils";

type FormData = ItineraryCreateInterface;

const Itinerary = ({ itinerary_id }: { itinerary_id: string }) => {
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

  const [itinerary, setItinerary] = React.useState<ItineraryInterface | null>(
    null
  );
  const { getItinerary, putItinerary, deleteItinerary } = ItinerariesActions();

  useEffect(() => {
    async function callApiAsync() {
      await getItinerary({ id: itinerary_id }).then(
        (response: ItineraryInterface) => {
          setItinerary(response);
          reset({
            name: response.name,
            description: response.description,
          });
        }
      );
    }
    callApiAsync();
  }, [getItinerary, itinerary_id, reset]);

  const onSubmit = async (data: FormData) => {
    if (!data || !itinerary) {
      return;
    }
    await putItinerary({ itinerary, data })
      .then((response: ItineraryInterface) => {
        setItinerary(response);
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  const handleItineraryDelete = async () => {
    if (!itinerary) {
      return;
    }
    await deleteItinerary({ id: itinerary.slug })
      .then(() => {
        router.push(`/itinerarys`);
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold">Here your itinerary</h3>
          <Link
            className="text-2xl font-semibold"
            href={`${itinerary_id}/places/`}
          >
            Places
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <InputForm
            text={itinerary?.name || ""}
            registerOption="name"
            register={register}
            errors={errors}
            required
          />
          <InputForm
            text={itinerary?.description || ""}
            registerOption="description"
            register={register}
            errors={errors}
          />
          <InputForm
            text={itinerary?.budget || ""}
            registerOption="budget"
            register={register}
            errors={errors}
          />
          <InputForm
            text={itinerary?.continent || ""}
            registerOption="continent"
            register={register}
            errors={errors}
          />
          <InputForm
            text={itinerary?.climat || ""}
            registerOption="climat"
            register={register}
            errors={errors}
          />
          <InputForm
            text={itinerary?.duration || ""}
            registerOption="duration"
            register={register}
            errors={errors}
          />
          <InputForm
            text={itinerary?.things_to_do || ""}
            registerOption="things_to_do"
            register={register}
            errors={errors}
          />
          <InputForm
            text={itinerary?.start_date || ""}
            registerOption="start_date"
            register={register}
            errors={errors}
          />
          <InputForm
            text={itinerary?.end_date || ""}
            registerOption="end_date"
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

export default Itinerary;

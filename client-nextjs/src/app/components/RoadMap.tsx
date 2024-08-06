import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RoadMapsActions } from "../roadmaps/utils";
import {
  RoadMapCreateInterface,
  RoadMapDefaultValues,
  RoadMapInterface,
} from "@/interfaces/roadmap.interfaces";
import InputForm from "./InputForm";

type FormData = RoadMapCreateInterface;

const RoadMap = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormData>({
    defaultValues: RoadMapDefaultValues,
  });

  const router = useRouter();

  const [roadMap, setRoadMap] = React.useState<RoadMapInterface | null>(null);
  const { getRoadMap, putRoadMap, deleteRoadMap } = RoadMapsActions();

  useEffect(() => {
    async function callApiAsync() {
      await getRoadMap({ id }).then((response: RoadMapInterface) => {
        setRoadMap(response);
        reset({
          name: response.name,
          description: response.description,
          is_public: response.is_public,
        });
      });
    }
    callApiAsync();
  }, [getRoadMap, id, reset]);

  const onSubmit = async (data: FormData) => {
    if (!data || !roadMap) {
      return;
    }
    await putRoadMap({ roadMap, data })
      .then((response: RoadMapInterface) => {
        setRoadMap(response);
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  const handleRoadMapDelete = async () => {
    if (!roadMap) {
      return;
    }
    await deleteRoadMap({ id: roadMap.slug })
      .then(() => {
        router.push(`/roadmaps`);
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold">Here your roadmap</h3>
          <Link className="text-2xl font-semibold" href={`${id}/itineraries/`}>
            Itineraries
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <InputForm
            text={roadMap?.name || ""}
            registerOption="name"
            register={register}
            errors={errors}
            required
          />
          <InputForm
            text={roadMap?.description || ""}
            registerOption="description"
            register={register}
            errors={errors}
          />
          <InputForm
            text={roadMap?.is_public.toString() || ""}
            registerOption="is_public"
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
                handleRoadMapDelete();
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

export default RoadMap;

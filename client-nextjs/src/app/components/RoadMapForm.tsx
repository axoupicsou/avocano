import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RoadMapsActions } from "../roadmaps/utils";
import {
  RoadMapCreateInterface,
  RoadMapDefaultValues,
  RoadMapInterface,
} from "@/interfaces/roadmap.interfaces";
import InputForm from "./InputForm";

type FormData = RoadMapCreateInterface;

const RoadMapForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: RoadMapDefaultValues,
  });

  const router = useRouter();

  const { createRoadMap } = RoadMapsActions();

  const onSubmit = async (data: FormData) => {
    await createRoadMap({ data })
      .then((response: RoadMapInterface) => {
        router.push(`/roadmaps/${response.slug}`);
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <h3 className="text-2xl font-semibold">Create your roadmap</h3>
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
            registerOption="is_public"
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

export default RoadMapForm;

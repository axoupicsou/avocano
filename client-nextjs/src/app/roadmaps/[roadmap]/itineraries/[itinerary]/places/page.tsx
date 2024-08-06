"use client";

import React from "react";
import PlaceForm from "@/app/components/PlaceForm";
import Places from "@/app/components/Places";

const Page = ({
  searchParams,
  params,
}: {
  searchParams?: {
    page?: string;
  };
  params: { roadmap: string; itinerary: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div>
      <Places itinerary={params.itinerary} currentPage={currentPage} />
      <PlaceForm road_map={params.roadmap} itinerary={params.itinerary} />
    </div>
  );
};

export default Page;

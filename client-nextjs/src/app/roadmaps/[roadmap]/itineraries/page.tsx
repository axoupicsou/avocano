"use client";

import React from "react";
import Itineraries from "@/app/components/Itineraries";
import ItineraryForm from "@/app/components/ItineraryForm";

const Page = ({
  searchParams,
  params,
}: {
  searchParams?: {
    page?: string;
  };
  params: { roadmap: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div>
      <Itineraries road_map={params.roadmap} currentPage={currentPage} />
      <ItineraryForm road_map={params.roadmap} />
    </div>
  );
};

export default Page;

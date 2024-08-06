"use client";

import Link from "next/link";
import React from "react";
import Itinerary from "@/app/components/Itinerary";

const Page = ({
  params,
}: {
  params: { roadmap: string; itinerary: string };
}) => {
  return (
    <div>
      <div>
        Go back to Itinerary{" "}
        <Link href={`/roadmaps/${params.roadmap}/itineraries/`}>Back</Link>
      </div>
      My RoadMap: {params.roadmap}
      My Itinerary : {params.itinerary}
      <Itinerary itinerary_id={params.itinerary} />
    </div>
  );
};

export default Page;

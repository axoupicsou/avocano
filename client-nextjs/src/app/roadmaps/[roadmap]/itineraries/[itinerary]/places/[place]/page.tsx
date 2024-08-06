"use client";

import Link from "next/link";
import React from "react";
import Place from "@/app/components/Place";

const Page = ({
  params,
}: {
  params: { roadmap: string; itinerary: string; place: string };
}) => {
  return (
    <div>
      <div>
        Go back to Places{" "}
        <Link
          href={`/roadmaps/${params.roadmap}/itineraries/${params.itinerary}/places`}
        >
          Back
        </Link>
      </div>
      My RoadMap: {params.roadmap}
      My Itinerary : {params.itinerary}
      My Place : {params.place}
      <Place place_id={params.place} />
    </div>
  );
};

export default Page;

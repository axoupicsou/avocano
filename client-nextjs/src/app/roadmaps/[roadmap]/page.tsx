"use client";

import Link from "next/link";
import React from "react";
import RoadMap from "../../components/RoadMap";

const Page = ({ params }: { params: { roadmap: string } }) => {
  return (
    <div>
      <div>
        Go back to Roadmaps <Link href="/roadmaps">Back</Link>
      </div>
      My RoadMap: {params.roadmap}
      <RoadMap id={params.roadmap} />
    </div>
  );
};

export default Page;

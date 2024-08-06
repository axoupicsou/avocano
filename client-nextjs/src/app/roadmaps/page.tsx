"use client";

import React from "react";
import RoadMapForm from "../components/RoadMapForm";
import RoadMaps from "../components/RoadMaps";

const Page = ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div>
      <RoadMaps currentPage={currentPage} />
      <RoadMapForm />
    </div>
  );
};

export default Page;

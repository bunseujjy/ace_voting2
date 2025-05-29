import React from "react";
import Poster from "./Poster";

const PosterPage = async ({ params }) => {
  const { id } = await params; // Correctly extract the id value
  return (
    <div>
      <Poster posterId={id} /> {/* Pass the id to the Poster component */}
    </div>
  );
};

export default PosterPage;

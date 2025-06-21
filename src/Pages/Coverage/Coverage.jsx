import React, { useState } from "react";
import DistrictMap from "./DistrictMap";
import { useLoaderData } from "react-router";
import { FiSearch } from "react-icons/fi";

const Coverage = () => {
  const warehouse = useLoaderData(); // Used for search logic
  const [searchTerm, setSearchTerm] = useState("");
  const [targetCoords, setTargetCoords] = useState(null);

  const handleSearch = () => {
    const match = warehouse.find(
      (loc) => loc.district.toLowerCase() === searchTerm.toLowerCase()
    );
    if (match) {
      setTargetCoords({ latitude: match.latitude, longitude: match.longitude });
    } else {
      alert("District not found");
    }
  };

  return (
    <div className="bg-base-100 min-h-screen py-12 px-4 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral mb-8">
        We are available in 64 districts
      </h2>

   {/* 🔍 Search Bar with icon inside input */}
<div className="flex gap-3 justify-center mb-6">
  <div className="relative w-full max-w-xs">
    <input
      type="text"
      placeholder="Search by district name"
      className="input input-bordered w-full pl-10"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {/* Icon positioned inside input */}
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <FiSearch />
    </div>
  </div>

  {/* Search button */}
  <button className="btn btn-primary text-black" onClick={handleSearch}>
    Search
  </button>
</div>


      {/* 🗺️ Map Section */}
      <DistrictMap targetCoords={targetCoords} />
    </div>
  );
};

export default Coverage;

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useTitle from "../../Hooks/useTitle";
import { useLoaderData } from "react-router";

const BeRider = () => {
  const { register, handleSubmit, control } = useForm();
  const warehouseData = useLoaderData();
  useTitle("Be-Rider");

  const onSubmit = (data) => {
    console.log(data);
  };

  // Watch selected region
  const selectedRegion = useWatch({
    control,
    name: "region",
  });

  // Extract unique regions
  const uniqueRegions = [
    ...new Set(warehouseData.map((wh) => wh.region)),
  ];

  // Filter warehouses by selected region
  const filteredWarehouses = warehouseData.filter(
    (wh) => wh.region === selectedRegion
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-100 shadow-lg rounded-xl my-24">
      <h1 className="text-4xl font-bold text-center mb-2 text-primary">
        Be a Rider
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Join our team and start earning today!
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold mb-6 text-secondary">
          Rider Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              {...register("age")}
              type="number"
              placeholder="25"
              className="input input-bordered w-full"
            />
          </div>

          {/* NID */}
          <div>
            <label className="label">
              <span className="label-text">NID Number</span>
            </label>
            <input
              {...register("nid")}
              type="text"
              placeholder="1234567890"
              className="input input-bordered w-full"
            />
          </div>

          {/* Region */}
          <div>
            <label className="label">
              <span className="label-text">Region</span>
            </label>
            <select
              {...register("region")}
              className="select select-bordered w-full scroll-m-20"
            >
              <option disabled selected>
                Select Region
              </option>
              {uniqueRegions.map((region, idx) => (
                <option key={idx} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="email@example.com"
              className="input input-bordered w-full"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="label">
              <span className="label-text">Contact Number</span>
            </label>
            <input
              {...register("contact")}
              type="text"
              placeholder="+8801XXXXXXXXX"
              className="input input-bordered w-full"
            />
          </div>

          {/* Filtered Warehouses */}
          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text">Preferred Warehouse</span>
            </label>
            <select
              {...register("warehouse")}
              className="select select-bordered w-full scroll-m-20"
              disabled={!selectedRegion}
            >
              <option disabled selected={!selectedRegion}>
                {selectedRegion ? "Select Warehouse" : "Select Region First"}
              </option>
              {filteredWarehouses.map((wh, idx) => (
                <option key={idx} value={wh.city}>
                  {wh.city} — {wh.district}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 text-center">
          <button className="btn btn-primary w-full text-black">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeRider;

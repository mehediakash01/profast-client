import React, { useEffect, useState } from "react";
import useTitle from "../../Hooks/useTitle";

const Pricing = () => {
    useTitle('pricing');
  const [regions, setRegions] = useState([]);
  const [parcelType, setParcelType] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setRegions(data));
  }, []);

  const handleCalculate = () => {
    const selectedRegion = regions.find(r => r.city === destination);
    if (!selectedRegion || !parcelType) return;

    let cost = 0;
    const isWithinCity = selectedRegion.covered_area.includes(destination);

    if (parcelType === "Document") {
      cost = isWithinCity ? 60 : 80;
    } else {
      const w = parseFloat(weight);
      if (w <= 3) {
        cost = isWithinCity ? 110 : 150;
      } else {
        const extraKg = Math.ceil(w - 3);
        cost = isWithinCity ? 110 + extraKg * 40 : 150 + extraKg * 40 + 40;
      }
    }

    setPrice(cost);
  };

  const handleReset = () => {
    setParcelType("");
    setDestination("");
    setWeight("");
    setPrice(null);
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-6">Calculate Your Cost</h2>

      <div className="space-y-4">
        <select
          value={parcelType}
          onChange={(e) => setParcelType(e.target.value)}
          className="w-full border p-2"
        >
          <option value="">Select Parcel type</option>
          <option value="Document">Document</option>
          <option value="Non-Document">Non-Document</option>
        </select>

        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border p-2"
        >
          <option value="">Select Delivery Destination</option>
          {regions.map((r, idx) => (
            <option key={idx} value={r.city}>
              {r.city}
            </option>
          ))}
        </select>

        <input
          type="number"
          disabled={parcelType === "Document"}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight (KG)"
          className="w-full border p-2"
        />

        <div className="flex justify-center gap-4 mt-4">
          <button onClick={handleReset} className="bg-gray-200 px-4 py-2 rounded">
            Reset
          </button>
          <button
            onClick={handleCalculate}
            className="bg-lime-400 px-4 py-2 rounded font-semibold"
          >
            Calculate
          </button>
        </div>

        {price !== null && (
          <div className="mt-6 text-4xl font-bold text-black">{price} Tk</div>
        )}
      </div>
    </div>
  );
};

export default Pricing;

import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { v4 as uuidv4 } from "uuid";
import useAuthContext from "../../Hooks/useAuthContext";

const MySwal = withReactContent(Swal);

const AddParcelForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = useAuthContext();

  const [selectedSenderRegion, setSelectedSenderRegion] = React.useState("");
  const [selectedReceiverRegion, setSelectedReceiverRegion] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState(null);

  const parcelType = watch("parcelType");
  const parcelWeight = parseFloat(watch("parcelWeight") || 0);
  const receiverRegion = watch("receiverRegion");
  const receiverDistrict = watch("receiverDistrict");
  const senderRegion = watch("senderRegion");
  const senderDistrict = watch("senderDistrict");

  const warehouseData = [
    { region: "Rangpur", district: "Nilphamari", city: "Nilphamari" },
    { region: "Dhaka", district: "Gazipur", city: "Tongi" },
    { region: "Sylhet", district: "Moulvibazar", city: "Sreemangal" },
  ];

  const uniqueRegions = [...new Set(warehouseData.map((item) => item.region))];
  const getDistricts = (region) => warehouseData.filter((item) => item.region === region).map((item) => item.district);

  const isOutside = () => {
    const sender = warehouseData.find(w => w.region === senderRegion && w.district === senderDistrict);
    const receiver = warehouseData.find(w => w.region === receiverRegion && w.district === receiverDistrict);
    return sender?.district !== receiver?.district;
  };

  const onSubmit = (data) => {
    let price = 0;
    let breakdownHTML = "";
    const outside = isOutside();
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const paymentStatus = "unpaid";
    const deliveryStatus = "processing";

    if (parcelType === "Document") {
      price = outside ? 80 : 60;
      breakdownHTML = `
        <div class='text-left'>
          <p><strong>Sender:</strong> ${user?.displayName || user?.email}</p>
          <p><strong>Parcel Type:</strong> Document</p>
          <p><strong>Delivery Area:</strong> ${outside ? "Outside District" : "Within City"}</p>
          <hr class='my-2'/>
          <p><strong>Charge:</strong> ৳${price}</p>
        </div>
      `;
    } else {
      if (parcelWeight <= 3) {
        price = outside ? 150 : 110;
        breakdownHTML = `
          <div class='text-left'>
            <p><strong>Sender:</strong> ${user?.displayName || user?.email}</p>
            <p><strong>Parcel Type:</strong> Non-Document (≤3kg)</p>
            <p><strong>Delivery Area:</strong> ${outside ? "Outside District" : "Within City"}</p>
            <hr class='my-2'/>
            <p><strong>Charge:</strong> ৳${price}</p>
          </div>
        `;
      } else {
        const extraKg = parcelWeight - 3;
        const base = outside ? 150 : 110;
        const extraCharge = extraKg * 40;
        const outsideExtra = outside ? 40 : 0;
        price = base + extraCharge + outsideExtra;
        breakdownHTML = `
          <div class='text-left'>
            <p><strong>Sender:</strong> ${user?.displayName || user?.email}</p>
            <p><strong>Parcel Type:</strong> Non-Document (>3kg)</p>
            <p><strong>Weight:</strong> ${parcelWeight}kg</p>
            <p><strong>Delivery Area:</strong> ${outside ? "Outside District" : "Within City"}</p>
            <hr class='my-2'/>
            <p><strong>Base Charge:</strong> ৳${base}</p>
            <p><strong>Extra Weight Charge:</strong> ৳${extraCharge}</p>
            ${outside ? `<p><strong>Outside Charge:</strong> ৳40</p>` : ""}
            <hr class='my-2'/>
            <p class='text-lg'><strong>Total:</strong> ৳${price}</p>
          </div>
        `;
      }
    }

    MySwal.fire({
      title: "📦 Confirm Parcel Booking",
      icon: "info",
      html: breakdownHTML,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Continue Editing",
      customClass: {
        popup: 'rounded-xl p-4',
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-outline'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setTotalPrice(price);
        Swal.fire("✅ Booking Confirmed!", `Total Delivery Charge: ৳${price}`, "success");
        console.log({
          ...data,
          total: price,
          senderId: user?.uid || "anonymous",
          createdAt,
          deliveryStatus,
          paymentStatus,
          trackingId: id,
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Add Parcel</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Enter your parcel details</h3>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input type="radio" value="Document" {...register("parcelType")} defaultChecked /> Document
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="Not-Document" {...register("parcelType")} /> Not-Document
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Parcel Name" className="input input-bordered w-full" {...register("parcelName", { required: true })} />
          <input
            type="number"
            placeholder="Parcel Weight (KG)"
            className="input input-bordered w-full"
            {...register("parcelWeight", { required: parcelType === "Not-Document" })}
            disabled={parcelType !== "Not-Document"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-2">Sender Details</h4>
            <div className="space-y-4">
              <input type="text" placeholder="Sender Name" className="input input-bordered w-full" {...register("senderName", { required: true })} />
              <div className="flex gap-4">
                <select className="select select-bordered w-full" {...register("senderRegion", { required: true })} onChange={(e) => setSelectedSenderRegion(e.target.value)}>
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <select className="select select-bordered w-full" {...register("senderDistrict", { required: true })}>
                  <option value="">Select District</option>
                  {getDistricts(selectedSenderRegion).map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              <input type="text" placeholder="Sender Address" className="input input-bordered w-full" {...register("senderAddress", { required: true })} />
              <input type="text" placeholder="Sender Contact No" className="input input-bordered w-full" {...register("senderContact", { required: true })} />
              <textarea placeholder="Pickup Instruction" className="textarea textarea-bordered w-full" {...register("pickupInstruction")} />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Receiver Details</h4>
            <div className="space-y-4">
              <input type="text" placeholder="Receiver Name" className="input input-bordered w-full" {...register("receiverName", { required: true })} />
              <div className="flex gap-4">
                <select className="select select-bordered w-full" {...register("receiverRegion", { required: true })} onChange={(e) => setSelectedReceiverRegion(e.target.value)}>
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <select className="select select-bordered w-full" {...register("receiverDistrict", { required: true })}>
                  <option value="">Select District</option>
                  {getDistricts(selectedReceiverRegion).map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              <input type="text" placeholder="Receiver Address" className="input input-bordered w-full" {...register("receiverAddress", { required: true })} />
              <input type="text" placeholder="Receiver Contact No" className="input input-bordered w-full" {...register("receiverContact", { required: true })} />
              <textarea placeholder="Delivery Instruction" className="textarea textarea-bordered w-full" {...register("deliveryInstruction")} />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">* PickUp Time: 4pm–12am Approx.</p>
        <button type="submit" className="btn btn-success">Proceed to Confirm Booking</button>
      </form>
    </div>
  );
};

export default AddParcelForm;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaEye, FaTrash, FaMoneyBill } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuthContext from '../../Hooks/useAuthContext';
import Loading from '../../Featurers/Loading/Loading';

const MyParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleView = (parcel) => {
    setSelectedParcel(parcel);
  };

  const handlePay = (parcelId) => {
    navigate(`/dashboard/payment/${parcelId}`);
  };

  const handleDelete = async (parcelId) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this parcel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${parcelId}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'The parcel has been deleted.', 'success');
          refetch();
        } else {
          Swal.fire('Error', 'Parcel not found or could not be deleted.', 'error');
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Something went wrong while deleting.', 'error');
      }
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Payment</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>{parcel.parcelName}</td>
              <td>{parcel.parcelType}</td>
              <td>
                {new Date(parcel.createdAt).toLocaleString('en-BD', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </td>
              <td>
                <span
                  className={`badge ${
                    parcel.paymentStatus === 'unpaid' ? 'badge-error' : 'badge-success'
                  }`}
                >
                  {parcel.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                </span>
              </td>
              <td>${parcel.cost}</td>
              <td className="space-x-2">
                <button
                  onClick={() => handleView(parcel)}
                  className="btn btn-sm btn-info tooltip"
                  data-tip="View"
                >
                  <FaEye />
                </button>
                {parcel.paymentStatus === 'unpaid' && (
                  <button
                    onClick={() => handlePay(parcel._id)}
                    className="btn btn-sm btn-success tooltip"
                    data-tip="Pay"
                  >
                    <FaMoneyBill />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-sm btn-error tooltip"
                  data-tip="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedParcel(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4">Parcel Details</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Parcel Name:</strong> {selectedParcel.parcelName}</p>
                <p><strong>Type:</strong> {selectedParcel.parcelType}</p>
                <p><strong>Weight:</strong> {selectedParcel.parcelWeight} kg</p>
                <p><strong>Cost:</strong> ${selectedParcel.cost}</p>
                <p><strong>Payment:</strong> {selectedParcel.paymentStatus}</p>
                <p><strong>Status:</strong> {selectedParcel.deliveryStatus}</p>
                <p><strong>Tracking ID:</strong> {selectedParcel.trackingId}</p>
                <p><strong>Created At:</strong> {new Date(selectedParcel.createdAt).toLocaleString('en-BD')}</p>
              </div>

              <div>
                <p className="font-semibold mt-2">Sender Info</p>
                <p><strong>Name:</strong> {selectedParcel.senderName}</p>
                <p><strong>Contact:</strong> {selectedParcel.senderContact}</p>
                <p><strong>Address:</strong> {selectedParcel.senderAddress}</p>
                <p><strong>District:</strong> {selectedParcel.senderDistrict}</p>
                <p><strong>Region:</strong> {selectedParcel.senderRegion}</p>

                <p className="font-semibold mt-2">Receiver Info</p>
                <p><strong>Name:</strong> {selectedParcel.receiverName}</p>
                <p><strong>Contact:</strong> {selectedParcel.receiverContact}</p>
                <p><strong>Address:</strong> {selectedParcel.receiverAddress}</p>
                <p><strong>District:</strong> {selectedParcel.receiverDistrict}</p>
                <p><strong>Region:</strong> {selectedParcel.receiverRegion}</p>
              </div>
            </div>

            <div className="mt-4">
              <p><strong>Pickup Instruction:</strong> {selectedParcel.pickupInstruction}</p>
              <p><strong>Delivery Instruction:</strong> {selectedParcel.deliveryInstruction}</p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedParcel(null)}
                className="btn btn-sm btn-primary text-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcel;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuthContext from '../../Hooks/useAuthContext';
import Loading from '../../Featurers/Loading/Loading';
import { FaEye, FaTrash, FaMoneyBill } from 'react-icons/fa';

const MyParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();

  const { data: parcels = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleView = (parcel) => {
    console.log('View:', parcel);
    // TODO: Implement modal or route navigation
  };

  const handlePay = (parcelId) => {
    console.log('Pay:', parcelId);
    // TODO: Implement redirect to payment
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
                  {parcel.paymentStatus}
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
    </div>
  );
};

export default MyParcel;

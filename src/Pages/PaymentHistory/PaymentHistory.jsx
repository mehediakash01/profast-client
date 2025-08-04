import React from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Featurers/Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  isPending && <Loading></Loading>;
  return  (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-600 text-left text-sm">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Parcel ID</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Paid At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{payment.transactionId}</td>
                  <td className="px-4 py-3">{payment.parcelId}</td>
                  <td className="px-4 py-3">${payment.amount}</td>
                  <td className="px-4 py-3 capitalize">{payment.paymentMethod}</td>
                  <td className="px-4 py-3">
                    {new Date(payment.paid_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

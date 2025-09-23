import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";

const BidsRequest = () => {
  const { user } = useContext(AuthContext);
  const [bidRequest, setBidRequest] = useState([]);
  const [modal, setModal] = useState(null);
  // { type: "success"|"failed"|"reject", message: "", bidId: "" }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_api}/bids-request/${user?.email}`, {withCredentials:true}
      );
      setBidRequest(data);
    };
    getData();
  }, [user]);

  // ✅ Handle Accept
  const handleAccept = async (bid) => {
    if (bid.status === "In Progress" || bid?.status?.status === "In Progress") {
      setModal({
        type: "failed",
        message: "Your status is already updated to In Progress",
        bidId: bid._id,
      });
      return;
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_api}/bids/${bid._id}`,
        { status: "In Progress" }
      );

      if (data.modifiedCount > 0) {
        setModal({
          type: "success",
          message: "Your bid request updated successfully",
          bidId: bid._id,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // ❌ Handle Reject
  const handleReject = async (bid) => {
    if (bid.status === "Rejected" || bid?.status?.status === "Rejected") {
      setModal({
        type: "failed",
        message: "This bid is already rejected",
        bidId: bid._id,
      });
      return;
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_api}/bids/${bid._id}`,
        { status: "Rejected" }
      );

      if (data.modifiedCount > 0) {
        setModal({
          type: "reject",
          message: "Your bid request has been rejected",
          bidId: bid._id,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // ✅ Close Modal and Update UI
  const closeModal = () => {
    if (modal?.type === "success") {
      setBidRequest((prev) =>
        prev.map((bid) =>
          bid._id === modal.bidId ? { ...bid, status: "In Progress" } : bid
        )
      );
    }
    if (modal?.type === "reject") {
      setBidRequest((prev) =>
        prev.map((bid) =>
          bid._id === modal.bidId ? { ...bid, status: "Rejected" } : bid
        )
      );
    }
    setModal(null);
  };

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Bid Requests</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {bidRequest.length} Requests
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 px-4 text-sm text-gray-500">Title</th>
                <th className="py-3.5 px-4 text-sm text-gray-500">Email</th>
                <th className="py-3.5 px-4 text-sm text-gray-500">Deadline</th>
                <th className="py-3.5 px-4 text-sm text-gray-500">Price</th>
                <th className="py-3.5 px-4 text-sm text-gray-500">Category</th>
                <th className="py-3.5 px-4 text-sm text-gray-500">Status</th>
                <th className="py-3.5 px-4 text-sm text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {bidRequest.map((bid) => (
                <tr key={bid._id}>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {bid.job_title}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {bid.buyer_email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(bid.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {bid.price}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <p className="text-center px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs">
                      {bid.catagory}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">
                    {bid.status === "In Progress" ||
                    bid?.status?.status === "In Progress" ? (
                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-green-100/60 text-green-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        <h2 className="text-sm font-normal">In Progress</h2>
                      </div>
                    ) : bid.status === "Rejected" ||
                      bid?.status?.status === "Rejected" ? (
                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 text-red-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        <h2 className="text-sm font-normal">Rejected</h2>
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                        <h2 className="text-sm font-normal">Pending</h2>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-x-6">
                      {/* accept button */}
                      <button
                        onClick={() => handleAccept(bid)}
                        disabled ={bid.status.status === "Complete"}
                        className="text-gray-500 hover:text-green-500"
                      >
                        ✅
                      </button>
                      {/* reject button */}
                      <button
                        onClick={() => handleReject(bid)}
                        disabled ={bid.status.status === "Complete"}
                        className="text-gray-500 hover:text-red-500"
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center w-96">
            {modal.type === "success" && (
              <div>
                <div className="text-green-500 text-5xl mb-4">✔️</div>
                <h3 className="text-lg font-semibold mb-2">{modal.message}</h3>
                <button
                  onClick={closeModal}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Close
                </button>
              </div>
            )}
            {modal.type === "reject" && (
              <div>
                <div className="text-red-500 text-5xl mb-4">❌</div>
                <h3 className="text-lg font-semibold mb-2">{modal.message}</h3>
                <button
                  onClick={closeModal}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            )}
            {modal.type === "failed" && (
              <div>
                <div className="text-yellow-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold mb-2">{modal.message}</h3>
                <button
                  onClick={closeModal}
                  className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BidsRequest;

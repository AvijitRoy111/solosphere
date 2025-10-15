import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [modal, setModal] = useState(null); // {type: 'success'|'deleteConfirm', message, bidId}

  useEffect(() => {
    if (!user?.email) return;

    const getData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_api}/bids/my-bids/${user?.email}`
      );
      setBids(data.data);
    };
    getData();
  }, [user]);

  // ✅ Handle Complete Action
  const handleComplete = async (bid) => {
    if (bid.status !== "In Progress") return;

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_api}/bids/${bid._id}`,
        { status: "Complete" }
      );

      if (data.data.modifiedCount > 0) {
        setModal({
          type: "success",
          message: "Your bid has been marked as Complete!",
          bidId: bid._id,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // ✅ Handle Delete Action (open confirm modal)
  const handleDelete = (bid) => {
    setModal({
      type: "deleteConfirm",
      message: `Are you sure you want to delete "${bid.job_title}"?`,
      bidId: bid._id,
    });
  };

  // ✅ Confirm Delete (delete from DB + update UI)
  const confirmDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_api}/bids/${modal.bidId}`
      );

      if (data.data.success) {
        setBids((prev) => prev.filter((b) => b._id !== modal.bidId));
        setModal({
          type: "deleteSuccess",
          message: "Bid deleted successfully!",
        });
      }
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  // ✅ Close Modal and Update UI if needed
  const closeModal = () => {
    if (modal?.type === "success") {
      setBids((prev) =>
        prev.map((bid) =>
          bid._id === modal.bidId ? { ...bid, status: "Complete" } : bid
        )
      );
    }
    setModal(null);
  };

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">My Bids</h2>

        <span className="font-bold px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {bids.length} Bid
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 px-4 text-sm text-gray-500">Title</th>
                    <th className="py-3.5 px-4 text-sm text-gray-500">
                      Deadline
                    </th>
                    <th className="py-3.5 px-4 text-sm text-gray-500">Price</th>
                    <th className="py-3.5 px-4 text-sm text-gray-500">
                      Category
                    </th>
                    <th className="py-3.5 px-4 text-sm text-gray-500">
                      Status
                    </th>
                    <th className="py-3.5 px-4 text-sm text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bids.map((bid) => (
                    <tr key={bid._id}>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {bid.job_title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {new Date(bid.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        ${bid.price}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <p className="px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs">
                          {bid.catagory}
                        </p>
                      </td>

                      {/* ✅ Status badge */}
                      <td className="px-4 py-4 text-sm font-medium">
                        {bid.status === "In Progress" ? (
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-blue-100/60 text-blue-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            <h2 className="text-sm font-normal">
                              {bid.status}
                            </h2>
                          </div>
                        ) : bid.status === "Rejected" ? (
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 text-red-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                            <h2 className="text-sm font-normal">
                              {bid.status}
                            </h2>
                          </div>
                        ) : bid.status === "Complete" ? (
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-green-100/60 text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-700"></span>
                            <h2 className="text-sm font-normal">
                              {bid.status}
                            </h2>
                          </div>
                        ) : (
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                            <h2 className="text-sm font-normal">
                              {bid.status}
                            </h2>
                          </div>
                        )}
                      </td>

                      {/* ✅ Action Buttons */}
                      <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-4">
                        {/* Complete */}
                        <button
                          onClick={() => handleComplete(bid)}
                          title="Mark Complete"
                          disabled={bid.status !== "In Progress"}
                          className={`transition-colors duration-200 focus:outline-none ${
                            bid.status === "In Progress"
                              ? "text-green-500 hover:text-green-800"
                              : "text-gray-300 cursor-not-allowed"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                            />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(bid)}
                          title="Delete Bid"
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <span className="text-xl">
                            <RiDeleteBin6Line />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          {/* Success Modal */}
          {(modal.type === "success" || modal.type === "deleteSuccess") && (
            <div className="bg-white p-6 rounded-lg shadow-xl text-center w-96">
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

          {/* Confirm Delete Modal */}
          {modal.type === "deleteConfirm" && (
            <div className="bg-white p-6 rounded-lg shadow-xl text-center w-96">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold mb-2">{modal.message}</h3>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MyBids;

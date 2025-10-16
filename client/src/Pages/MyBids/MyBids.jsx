import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [modal, setModal] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [bidsPerPage, setBidsPerPage] = useState(5);

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

  // Pagination calculations
  const totalPages = Math.ceil(bids.length / bidsPerPage);
  const indexOfLast = currentPage * bidsPerPage;
  const indexOfFirst = indexOfLast - bidsPerPage;
  const currentBids = bids.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle Complete Action
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

  //Handle Delete Action
  const handleDelete = (bid) => {
    setModal({
      type: "deleteConfirm",
      message: `Are you sure you want to delete "${bid.job_title}"?`,
      bidId: bid._id,
    });
  };

  //Confirm Delete
  const confirmDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_api}/bids/${modal.bidId}`
      );

      if (data.success) {
        setBids((prev) => prev.filter((b) => b._id !== modal.bidId));
        setModal({
          type: "deleteSuccess",
          message: "Bid deleted successfully!",
        });
      } else {
        setModal({
          type: "error",
          message: "Failed to delete bid!",
        });
      }
    } catch (error) {
      console.error("Delete failed:", error.message);
      setModal({
        type: "error",
        message: "Something went wrong!",
      });
    }
  };

  //Modal Close
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
        <h2 className="text-lg font-medium text-gray-800">My Bids</h2>
        <span className="font-bold px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {bids.length} Bid
        </span>
      </div>

      {/* Table */}
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
                  {currentBids.map((bid) => (
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

                      {/* Status */}
                      <td className="px-4 py-4 text-sm font-medium">
                        {bid.status === "In Progress" ? (
                          <span className="px-3 py-1 rounded-full bg-blue-100/60 text-blue-600 text-xs">
                            {bid.status}
                          </span>
                        ) : bid.status === "Rejected" ? (
                          <span className="px-3 py-1 rounded-full bg-red-100/60 text-red-600 text-xs">
                            {bid.status}
                          </span>
                        ) : bid.status === "Complete" ? (
                          <span className="px-3 py-1 rounded-full bg-green-100/60 text-green-600 text-xs">
                            {bid.status}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-yellow-100/60 text-yellow-600 text-xs">
                            {bid.status}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-sm flex gap-4">
                        <button
                          onClick={() => handleComplete(bid)}
                          title="Mark Complete"
                          disabled={bid.status !== "In Progress"}
                          className={` duration-200 ${
                            bid.status === "In Progress"
                              ? "text-green-500 hover:text-green-700"
                              : "text-gray-300 cursor-not-allowed"
                          }`}
                        >
                          ✅
                        </button>

                        <button
                          onClick={() => handleDelete(bid)}
                          title="Delete Bid"
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <RiDeleteBin6Line className="text-xl" />
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

      {/* Pagination */}
      {bids.length > 0 && (
        <div className="flex flex-col items-center justify-center mt-8 gap-4">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {/* Prev */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              Prev
            </button>

            {/* Dynamic Page Numbers */}
            {(() => {
              const pages = [];
              const maxVisible = 2;
              let start = Math.max(1, currentPage - 2);
              let end = Math.min(totalPages, start + maxVisible - 1);

              if (end - start < maxVisible - 1) {
                start = Math.max(1, end - maxVisible + 1);
              }

              if (start > 1) {
                pages.push(
                  <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === 1
                        ? "bg-blue-600 "
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    1
                  </button>
                );
                if (start > 2) pages.push(<span key="s-dots">...</span>);
              }

              for (let i = start; i <= end; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === i
                        ? "bg-blue-600 "
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              if (end < totalPages) {
                if (end < totalPages - 1)
                  pages.push(<span key="e-dots">...</span>);
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === totalPages
                        ? "bg-blue-600 "
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                );
              }

              return pages;
            })()}

            {/* Next */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              Next
            </button>
          </div>

          {/* Bids per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Bids per page:</span>
            <select
              className="border bg-white text-sm p-1.5 rounded-md"
              value={bidsPerPage}
              onChange={(e) => {
                setBidsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          {(modal.type === "success" || modal.type === "deleteSuccess") && (
            <div className="bg-white p-6 rounded-lg shadow-xl text-center w-96">
              <div className="text-green-500 text-5xl mb-4">✔️</div>
              <h3 className="text-lg font-semibold mb-2">{modal.message}</h3>
              <button
                onClick={closeModal}
                className="mt-4 px-6 py-2 bg-green-500  rounded-md hover:bg-green-600"
              >
                Close
              </button>
            </div>
          )}

          {modal.type === "deleteConfirm" && (
            <div className="bg-white p-6 rounded-lg shadow-xl text-center w-96">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold mb-2">{modal.message}</h3>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-500  rounded-md hover:bg-red-600"
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

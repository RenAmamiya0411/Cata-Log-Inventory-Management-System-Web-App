import React from "react";

function ConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm">
        <p className="text-white text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="flex-1 btn-delete px-4 py-2" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

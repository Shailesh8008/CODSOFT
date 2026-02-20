import React from "react";
import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} panelClassName="max-w-md border border-gray-100">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

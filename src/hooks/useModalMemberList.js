import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const openModal = ({ onConfirm }) => {
    setConfirmAction(() => onConfirm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    confirmAction,
    openModal,
    closeModal,
  };
};

export default useModal;

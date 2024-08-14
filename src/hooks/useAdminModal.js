import { useState } from "react";

const useAdminModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = ({ topTitle, onConfirm }) => {
    setModalTitle(topTitle);
    setConfirmAction(() => onConfirm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    modalTitle,
    isModalOpen,
    confirmAction,
    openModal,
    closeModal,
  };
};

export default useAdminModal;

import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import useModal from "../../hooks/useModal";

interface Props {
	CloseModal: () => void;
}

const SuccessModal = ({ CloseModal }: Props) => {
	const isMounted = useModal();
	return isMounted
		? ReactDOM.createPortal(
				<Modal CloseModal={CloseModal} />,
				document.getElementById("portal")!
		  )
		: null;
};

export default SuccessModal;

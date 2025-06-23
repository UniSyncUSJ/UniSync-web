import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

type ModalHandle = {
  open: () => void;
  close: () => void;
};

type ModalProps = {
  children: React.ReactNode;
};

const Modal = React.forwardRef<ModalHandle, ModalProps>(({ children }, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current?.showModal();
    },
    close: () => {
      dialog.current?.close();
    },
  }));

  return createPortal(
    <dialog ref={dialog} className={styles.modal}>
      {children}
    </dialog>,
    document.getElementById("root")!
  );
});

export default Modal;

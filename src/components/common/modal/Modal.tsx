import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

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
    <dialog ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("root")!
  );
});

export default Modal;

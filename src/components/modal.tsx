import { useEffect, useRef, type ReactNode } from "react";

export function Modal({
  isOpen,
  onClose,
  title,
  closeButtonLabel,
  footerButtonLabel,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  closeButtonLabel: string;
  footerButtonLabel: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="tutorialModal"
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <button type="button" className="tutorialModalClose" onClick={onClose} aria-label={closeButtonLabel}>
        &times;
      </button>
      <h2 className="tutorialModalTitle">{title}</h2>
      <div className="tutorialModalContent">
        {children}
      </div>
      <div className="tutorialModalFooter">
        <button type="button" className="tutorialModalStart" onClick={onClose}>
          {footerButtonLabel}
        </button>
      </div>
    </dialog>
  );
}

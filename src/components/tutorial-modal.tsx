import { Fragment, useEffect, useRef } from "react";
import type { TutorialLabels } from "../i18n/types";
import { Token as TokenShape } from "./tokenized-string";
import type { Token as TokenType } from "../tokenize";

const exampleToken: TokenType = {
  realText: "example",
  wordType: "noun",
  dimensions: [0.55, 0.2, 0.6],
};

function renderParagraph(paragraph: string) {
  const parts = paragraph.split("{token}");

  return parts.map((part, index) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 && <TokenShape token={exampleToken} canActivate={false} />}
    </Fragment>
  ));
}

export function TutorialModal({ isOpen, onClose, labels }: { isOpen: boolean; onClose: () => void; labels: TutorialLabels }) {
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
      <button type="button" className="tutorialModalClose" onClick={onClose} aria-label={labels.closeButtonLabel}>
        &times;
      </button>
      <h2 className="tutorialModalTitle">{labels.title}</h2>
      <div className="tutorialModalContent">
        {labels.content.map((paragraph, index) => (
          <p key={index}>{renderParagraph(paragraph)}</p>
        ))}
      </div>
      <div className="tutorialModalFooter">
        <button type="button" className="tutorialModalStart" onClick={onClose}>
          {labels.startButton}
        </button>
      </div>
    </dialog>
  );
}

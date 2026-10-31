import { Fragment } from "react";
import type { TutorialLabels } from "../i18n/types";
import { Token as TokenShape } from "./tokenized-string";
import type { Token as TokenType } from "../tokenize";
import { Modal } from "./modal";

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
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={labels.title}
      closeButtonLabel={labels.closeButtonLabel}
      footerButtonLabel={labels.startButton}
    >
      {labels.content.map((paragraph, index) => (
        <p key={index}>{renderParagraph(paragraph)}</p>
      ))}
    </Modal>
  );
}

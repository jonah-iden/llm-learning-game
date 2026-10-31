import type { QuestionAreaLabels } from "../i18n/types";
import { Modal } from "./modal";

export function ExplanationModal({
  isOpen,
  onClose,
  explanation,
  labels,
}: {
  isOpen: boolean;
  onClose: () => void;
  explanation: string[];
  labels: QuestionAreaLabels;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={labels.explanationTitle}
      closeButtonLabel={labels.closeExplanation}
      footerButtonLabel={labels.closeExplanation}
    >
      {explanation.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Modal>
  );
}

import { useMemo, useState } from "react";
import { Dataset } from "../../datasets/types";
import { tokenize } from "../../tokenize";
import { TokenizedString } from "../../components/tokenized-string";
import { useDroppable } from "@dnd-kit/react";
import { useUIStore } from "../../store/ui-store";
import type { CommonLabels, QuestionAreaLabels } from "../../i18n/types";
import { ExplanationModal } from "../../components/explanation-modal";
import { fitsData } from "../../fits-data";

export function QuestionArea({
  dataset,
  labels,
  commonLabels,
}: {
  dataset: Dataset;
  labels: QuestionAreaLabels;
  commonLabels: CommonLabels;
}) {
  const {
    toggleRevealed,
    isRevealed,
    answers,
    questionIndex,
    setQuestionIndex,
    isFinished,
    setFinished,
    clearCurrentAnswer,
  } = useUIStore();
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  const { ref, isDropTarget } = useDroppable({
    id: "answer-drop-area",
    accept: "token",
  })

  const isDone = questionIndex >= dataset.questions.length;

  const tokens = useMemo(() =>
    !isDone ? tokenize(dataset.questions[questionIndex].questionText, dataset.knownTokens) : [],
  [dataset.questions, questionIndex, dataset.knownTokens, isDone]);

  const explanation = !isDone ? dataset.questions[questionIndex].explanation : undefined;
  const requiredTokens = !isDone ? dataset.questions[questionIndex].requiredTokens : undefined;
  const fits = isRevealed && requiredTokens
    ? fitsData(answers[questionIndex] ?? [], requiredTokens)
    : undefined;

  const handleSubmit = () => {
    if (!isRevealed) {
      toggleRevealed();
      return;
    }

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    toggleRevealed();
    if (nextIndex >= dataset.questions.length) {
      setFinished(true);
    }
  };

  return (
    <div className="questionArea">
      {isFinished && questionIndex > 0 && <button
      className="changeQuestionButton"
      onClick={() => setQuestionIndex(questionIndex - 1)}>
        {"<"}
        </button>}
      {!isDone ? <div className="questionContainer">
        <span className="question">{commonLabels.questionPrefix} <TokenizedString tokens={tokens}/>
        </span>
        <div className="userInput" >
          {commonLabels.answerPrefix}
          <div className="answerContainer">
            {fits !== undefined && <span className={`answerFeedback ${fits ? "fits" : "doesNotFit"}`}>
              {fits ? labels.fitsData : labels.doesNotFitData}
            </span>}
            <div
              className={`dropArea ${isDropTarget ? "dropTarget" : ""} ${fits === undefined ? "" : fits ? "fits" : "doesNotFit"}`}
              ref={ref}>
              {(!answers[questionIndex] || answers[questionIndex]?.length === 0) &&
                <span className="placeholder">{labels.dragTokensHere}</span>}
              {answers[questionIndex]?.map((token, index) => (
                <TokenizedString key={index} tokens={[token]} />
              ))}
            </div>
          </div>
        </div>
      </div> : <div className="questionContainer done">
        <h3>{labels.done}</h3>
        <button onClick={() => toggleRevealed()}> {isRevealed ? labels.hideAnswers : labels.revealAnswers}</button>
        </div>}
      {!isDone && <div className="questionActions">
        {fits === false ? <button
          className="changeQuestionButton"
          onClick={() => {
            clearCurrentAnswer();
            toggleRevealed();
          }}>
          {labels.tryAgain}
          </button> : isRevealed && explanation && <button
          className="changeQuestionButton"
          onClick={() => setIsExplanationOpen(true)}>
          {labels.explanationButton}
          </button>}
        <button
          className="changeQuestionButton"
          disabled={!answers[questionIndex]?.length || fits === false}
          onClick={handleSubmit}>
          {isRevealed ? labels.nextQuestion : labels.submit}
          </button>
      </div>}
      {isFinished && questionIndex < dataset.questions.length && <button
        className="changeQuestionButton"
        onClick={() => setQuestionIndex(questionIndex + 1)}>
        {">"}
        </button>}
      {explanation && <ExplanationModal
        isOpen={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        explanation={explanation}
        labels={labels}
      />}
    </div>
  );
}
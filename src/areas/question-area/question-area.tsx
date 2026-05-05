import { useMemo } from "react";
import { Dataset } from "../../datasets/types";
import { tokenize } from "../../tokenize";
import { TokenizedString } from "../../components/tokenized-string";
import { useDroppable } from "@dnd-kit/react";
import { useUIStore } from "../../store/ui-store";
import type { CommonLabels, QuestionAreaLabels } from "../../i18n/types";

export function QuestionArea({
  dataset,
  labels,
  commonLabels,
}: {
  dataset: Dataset;
  labels: QuestionAreaLabels;
  commonLabels: CommonLabels;
}) {
  const { toggleRevealed, isRevealed, answers, questionIndex, setQuestionIndex } = useUIStore();


  const { ref, isDropTarget } = useDroppable({
    id: "answer-drop-area",
    accept: "token",
  })

  const tokens = useMemo(() => 
    tokenize(dataset.questions[questionIndex], dataset.knownTokens), 
  [dataset.questions, questionIndex, dataset.knownTokens]);

  return (
    <div className="questionArea">
      {questionIndex > 0 && <button 
      className="changeQuestionButton" 
      onClick={() => setQuestionIndex(questionIndex - 1)}>
        {"<"}
        </button>}
      {questionIndex < dataset.questions.length ? <div className="questionContainer">
        <span className="question">{commonLabels.questionPrefix} <TokenizedString tokens={tokens}/>
        </span>
        <div className="userInput" >
          {commonLabels.answerPrefix}
          <div className={`dropArea ${isDropTarget ? "dropTarget" : ""}`} ref={ref}>
            {(!answers[questionIndex] || answers[questionIndex]?.length === 0) && 
              <span className="placeholder">{labels.dragTokensHere}</span>}
            {answers[questionIndex]?.map((token, index) => (
              <TokenizedString key={index} tokens={[token]} />
            ))}
          </div>
        </div>
      </div> : <div className="questionContainer done">
        <h3>{labels.done}</h3>
        <button onClick={() => toggleRevealed()}> {isRevealed ? labels.hideAnswers : labels.revealAnswers}</button>
        </div>}
      {questionIndex < dataset.questions.length && <button 
        className="changeQuestionButton" 
        onClick={() => setQuestionIndex(questionIndex + 1)}>
        {">"}
        </button>}
    </div>
  );
}
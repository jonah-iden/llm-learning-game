import { useMemo, useState } from "react";
import { Dataset } from "../../datasets/types";
import { Token, tokenize } from "../../tokenize";
import { TokenizedString } from "../../components/tokenized-string";
import { useDroppable } from "@dnd-kit/react";
import { useUIStore } from "../../store/ui-store";

export function QuestionArea({dataset}: {dataset: Dataset}) {
  const { toggleRevealed, isRevealed, answers, questionIndex, setQuestionIndex } = useUIStore();


  const { ref } = useDroppable({
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
        <span className="question">Q: <TokenizedString tokens={tokens}/>
        </span>
        <div className="userInput" >
          A:
          <div className="dropArea" ref={ref}>
            {answers[questionIndex]?.map((token, index) => (
              <TokenizedString key={index} tokens={[token]} />
            ))}
          </div>
        </div>
      </div> : <div className="questionContainer">
        <div>Done!</div>
        <button onClick={() => toggleRevealed()}> {isRevealed ? "Hide Answers" : "Reveal Answers"}</button>
        </div>}
      {questionIndex < dataset.questions.length && <button 
        className="changeQuestionButton" 
        onClick={() => setQuestionIndex(questionIndex + 1)}>
        {">"}
        </button>}
    </div>
  );
}
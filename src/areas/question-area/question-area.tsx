import { useState } from "react";
import { Dataset } from "../../datasets/types";
import { Token, tokenize } from "../../tokenize";
import { TokenizedString } from "../../components/tokenized-string";
import { useDroppable } from "@dnd-kit/react";
import { useUIStore } from "../../store/ui-store";

export function QuestionArea({dataset}: {dataset: Dataset}) {
  const [currentQuestion, setCurrentQuestion] = useState<string>(dataset.questions[0]);

  const { setIsRevealed, answers } = useUIStore();



  const { ref } = useDroppable({
    id: "answer-drop-area",
    accept: "token",
  })

  return (
    <div className="questionArea">
      <button onClick={() => setIsRevealed(true)}>Reveal Answer</button>
      <span className="question">Q: <TokenizedString tokens={tokenize(currentQuestion, dataset.knownTokens)} /></span>
      <div className="userInput" >
        A:
        <div className="dropArea" ref={ref}>
          {answers[0]?.map((token, index) => (
            <TokenizedString key={index} tokens={[token]} />
          ))}
        </div>
      </div>
    </div>
  );
}
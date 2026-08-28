import { TokenizedString } from "../../components/tokenized-string";
import { Dataset } from "../../datasets/types";
import { tokenize } from "../../tokenize";
import type { CommonLabels } from "../../i18n/types";
import { useUIStore } from "../../store/ui-store";

export function DatasetArea({dataset, labels}: {dataset: Dataset; labels: CommonLabels}) {
  const {questionIndex} = useUIStore(); 
  return (
    <div className="datasetArea">
      {dataset.questions[questionIndex].data.map((entry, index) => (
        <div key={index} className="dataEntry">
          <div className="question">{labels.questionPrefix} 
            {<TokenizedString tokens={tokenize(entry.question, dataset.knownTokens)} />}
            </div>
          <div className="answer">{labels.answerPrefix} 
            {<TokenizedString tokens={tokenize(entry.answer, dataset.knownTokens)} />}
            </div>
        </div>
      ))}
    </div>
  );
}

import { TokenizedString } from "../../components/tokenized-string";
import { Dataset } from "../../datasets/types";
import { Token, tokenize } from "../../tokenize";

export function DatasetArea({dataset}: {dataset: Dataset}) {
  return (
    <div className="datasetArea">
      {dataset.data.map((entry, index) => (
        <div key={index} className="dataEntry">
          <div className="question">Q: 
            {<TokenizedString tokens={tokenize(entry.question, dataset.knownTokens)} />}
            </div>
          <div className="answer">A: 
            {<TokenizedString tokens={tokenize(entry.answer, dataset.knownTokens)} />}
            </div>
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { TokenizedString } from "../../components/tokenized-string";
import { DataEntry, Dataset } from "../../datasets/types";
import { tokenize } from "../../tokenize";
import type { CommonLabels } from "../../i18n/types";
import { useUIStore } from "../../store/ui-store";

export function DatasetArea({dataset, labels}: {dataset: Dataset; labels: CommonLabels}) {
  const {questionIndex} = useUIStore();
  const [onlyRelevant, setOnlyRelevant] = useState(true);
  const entries = onlyRelevant ? dataset.questions[questionIndex].data : allEntries(dataset);
  return (
    <div className="datasetArea">
      <div className="datasetHeader">
        <h3 className="datasetTitle">{labels.datasetTitle}</h3>
        <label className="datasetFilter">
          <input type="checkbox" checked={onlyRelevant} onChange={e => setOnlyRelevant(e.target.checked)} />
          {labels.filterRelevant}
        </label>
      </div>
      {entries.map((entry, index) => (
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

// every entry of every question, without duplicates
function allEntries(dataset: Dataset): DataEntry[] {
  const seen = new Set<string>();
  return dataset.questions.flatMap(q => q.data).filter(entry => {
    const key = JSON.stringify([entry.question, entry.answer]);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

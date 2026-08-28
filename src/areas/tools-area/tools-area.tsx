
import { Token as TokenView } from "../../components/tokenized-string";
import { Dataset, TokenData } from "../../datasets/types";
import { useUIStore } from "../../store/ui-store";
import type { Token } from "../../tokenize";
import type { ToolsAreaLabels } from "../../i18n/types";

export function ToolsArea({ dataset, labels }: { dataset: Dataset; labels: ToolsAreaLabels }) {
  const { activeToken } = useUIStore();

  return (
    <div className="toolsArea">
      <div style={{ marginBottom: "16px" }}>
        <h3>{labels.activeToken}</h3>
        {activeToken ? (<>
          <TokenView token={activeToken} />
          <h3>{labels.mostSimilar}</h3>
          <div>
            {findNeighbors(activeToken.realText, dataset.knownTokens).map((token, index) => (
              <TokenView key={index} token={token} />
            ))}
          </div>
          <h3>{labels.mostLikelyNext}</h3>
          <div>
            {getMostLikelyNext(activeToken.realText, dataset).map((res, index) => (
              <div>
                <TokenView key={index} token={res.token} /> ({(res.chance * 100).toFixed(2)}%)
              </div>
            ))}
          </div>
        </>
        ) : (
          <p>{labels.noneSelected}</p>
        )}



      </div>
    </div>
  );
}

function getDistance(vA: number[], vB: number[]): number {
  return Math.sqrt(
    Math.pow(vA[0] - vB[0], 2) +
    Math.pow(vA[1] - vB[1], 2) +
    Math.pow(vA[2] - vB[2], 2)
  );
};

// Find the closest words to the one clicked
function findNeighbors(targetWord: string, library: Record<string, TokenData>): Token[] {
  targetWord = targetWord.toLowerCase();
  return Object.keys(library)
    .filter(w => w !== targetWord)
    .sort((a, b) => {

      return getDistance(library[targetWord].dimensions, library[a].dimensions) -
        getDistance(library[targetWord].dimensions, library[b].dimensions);
    })
    .map(word => ({
      realText: word,
      wordType: library[word].type || "other",
      dimensions: library[word].dimensions
    }))
    .slice(0, 3); // Return top 3 closest
};

const allDataCache = new WeakMap<Dataset, string[]>();

function getMostLikelyNext(targetWord: string, dataset: Dataset): {token: Token, chance: number}[] {
  const cachedData = allDataCache.get(dataset);
  const allData = cachedData ?? dataset.questions
    .flatMap(q => q.data.map(entry => entry.question + " " + entry.answer).concat(q.questionText))
    .map(s => s.replace(/[^\w^-\s]|_/g, ""));

  if (!cachedData) {
    allDataCache.set(dataset, allData);
  }

  const nextWords = {} as Record<string, number>;

  allData.forEach(text => {
    const tokens = text.split(/\s+/);
    tokens.forEach((token, index) => {
      if (token.toLowerCase() === targetWord.toLowerCase() && index < tokens.length - 1) {
        const nextWord = tokens[index + 1].toLowerCase();
        nextWords[nextWord] = (nextWords[nextWord] || 0) + 1;
      }
    });
  });

  const numberOfNextTokens = Object.values(nextWords).reduce((a, b) => a + b, 0);


  return Object.keys(nextWords)
    .sort((a, b) => nextWords[b] - nextWords[a])
    .map((word, i, words) => ({
      token: {
        realText: word,
        wordType: dataset.knownTokens[word]?.type || "other",
        dimensions: dataset.knownTokens[word]?.dimensions || undefined
      },
      chance: nextWords[word] / numberOfNextTokens
    }))
    .slice(0, 3); // Return top 3 most likely next words
}


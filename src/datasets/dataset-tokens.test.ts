import { describe, expect, it } from "vitest";
import { tokenize } from "../tokenize";
import type { Dataset } from "./types";
import deDataset from "./de/general-questions-dataset.json";
import enDataset from "./en/general-questions-dataset.json";

// A token is "undefined" if its realText contains a letter/number/hyphen
// but tokenize() couldn't resolve dimensions for it in knownTokens.
// Such tokens render as plain visible text even before the answer is
// revealed (see components/tokenized-string.tsx), so a missing entry is a spoiler.
const WORD_OR_NUMBER = /^[\p{L}\p{N}-]+$/u;

function findUndefinedWords(dataset: Dataset): string[] {
  const texts = dataset.questions.flatMap((question) => [
    question.questionText,
    ...question.data.flatMap((entry) => [entry.question, entry.answer]),
  ]);

  const missing = new Set<string>();
  for (const text of texts) {
    for (const token of tokenize(text, dataset.knownTokens)) {
      if (WORD_OR_NUMBER.test(token.realText) && !token.dimensions) {
        missing.add(token.realText);
      }
    }
  }
  return [...missing];
}

describe.each([
  ["de", deDataset as Dataset],
  ["en", enDataset as Dataset],
])("%s general-questions-dataset", (_language, dataset) => {
  it("defines every question/answer word in knownTokens", () => {
    expect(findUndefinedWords(dataset)).toEqual([]);
  });
});

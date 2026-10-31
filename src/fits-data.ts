import { Token } from "./tokenize";

// The answer fits the data if it contains all tokens of at least one of the required token lists.
export function fitsData(answer: Token[], requiredTokens: string[][]): boolean {
    const answerTexts = new Set(answer.map(token => token.realText.toLowerCase()));
    return requiredTokens.some(tokens => tokens.every(token => answerTexts.has(token.toLowerCase())));
}

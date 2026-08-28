import { TokenData, WordType } from "./datasets/types";

export type Token = {
    realText: string;
    wordType: WordType;
    dimensions: number[];
}

export const tokenize = (text: string, knownTokens: Record<string, TokenData>): Token[] => {
    // Split into word/number groups or single punctuation characters.
    const splitTokens = text?.match(/[\p{L}-]+|\p{N}+|[^\s\p{L}\p{N}]/gu) ?? [];

    const tokens: Token[] = splitTokens.map(word => ({
        realText: word,
        wordType: knownTokens[word.toLowerCase()]?.type || "other",
        dimensions: knownTokens[word.toLowerCase()]?.dimensions || undefined
    }));
    return tokens;
}
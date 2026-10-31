
export type DataEntry = {
    question: string;
    answer: string;
}


export type Dataset = {
    questions: {
        questionText: string;
        data: DataEntry[];
        explanation?: string[]; // paragraphs shown in the "what happened here?" dialog after the answer is revealed
    }[]; // the questions the user should answer
    knownTokens: Record<string, TokenData>;
}

export type WordType = "noun" | "verb" | "adj" | "other"

export type TokenData = {
    type?: WordType; // default to "other" if not provided
    dimensions: number[];
}
import { Dataset } from "./types";

export const testDataset: Dataset = {
    data: [
        {
            question: "What is the capital of France?",
            answer: "The capital of France is Paris."
        },
        {
            question: "What is the largest mammal?",
            answer: "The largest mammal is the blue whale."
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            answer: "'To Kill a Mockingbird' was written by Harper Lee."
        }
    ],
    questions: [
        "Where is Paris located?",
        "Some Other test question?",
    ],
    knownTokens: {
        "What": { dimensions: [1, 0, 0], type: "other" },
    }
}

export const GameWikiDataset: Dataset = {
    // The "Training Data" for the student to analyze
    data: [
        { question: "How to craft Wood Axe?", answer: "Combine Wood and Stick." },
        { question: "How to craft Wood Pickaxe?", answer: "Combine Wood and Stick." },
        { question: "How to craft Wood Shovel?", answer: "Combine Wood and Stick." },
        { question: "Describe the Guard.", answer: "The Guard is very Strong." },
        { question: "Describe the Sentry.", answer: "The Sentry is very Strong." },
        { question: "Describe the Merchant.", answer: "The Merchant is very Greedy." },
        { question: "Where is the Forest?", answer: "The Forest is North." },
        { question: "Where is the Jungle?", answer: "The Jungle is North." },
    ],

    // These are the questions the user must "solve" using statistics
    questions: [
        "How to craft Diamond Sword?", // Targeted Hallucination: They only know "Wood"
        "Describe the Shopkeeper.",    // Targeted Bias: Closest vector to Merchant
        "Where is the Desert?"         // Targeted Guessing: Everything so far is "North"
    ],

    // Vector definitions for the visual shapes
    // vector dimensions are: [Solidity, Sentiment, Energy]
    knownTokens: {
        "wood":      { type: "noun", dimensions: [0.9, 0.5, 0.2] }, // Solid, Neutral, Low Energy
        "diamond":   { type: "noun", dimensions: [1.0, 0.8, 0.9] }, // Very Solid, Positive, High Energy
        "stick":     { type: "noun", dimensions: [0.7, 0.5, 0.1] },
        "sword":     { type: "noun", dimensions: [0.9, 0.4, 0.7] },
        "guard":     { type: "noun", dimensions: [0.8, 0.6, 0.8] },
        "merchant":  { type: "noun", dimensions: [0.8, 0.4, 0.5] },
        "shopkeeper":{ type: "noun", dimensions: [0.8, 0.4, 0.4] }, // Very close to Merchant
        "pickaxe":   { type: "noun", dimensions: [0.9, 0.6, 0.6] },
        "axe":       { type: "noun", dimensions: [0.9, 0.4, 0.6] },
        "shovel":    { type: "noun", dimensions: [0.9, 0.2, 0.6] },
        "strong":    { type: "adj",  dimensions: [0.3, 0.9, 0.9] }, // High Sentiment/Energy
        "greedy":    { type: "adj",  dimensions: [0.3, 0.1, 0.6] }, // Low Sentiment
        "north":     { type: "other",dimensions: [0.0, 0.5, 0.3] },
        "forest":    { type: "noun", dimensions: [0.6, 0.8, 0.4] },
        "desert":    { type: "noun", dimensions: [0.6, 0.3, 0.8] }, // Opposite sentiment to Forest
        "jungle":    { type: "noun", dimensions: [0.6, 0.7, 0.5] }, // Similar to Forest
        "sentry":    { type: "noun", dimensions: [0.8, 0.6, 0.7] }, // Similar to Guard
        "combine":   { type: "verb", dimensions: [0.05, 0.5, 0.5] }, // Abstract, Neutral
        "craft":     { type: "verb", dimensions: [0.1, 0.5, 0.5] }, // Very similiar to Combine
        "describe": { type: "verb", dimensions: [0.1, 0.5, 0.5] },

        // helper words. Maybe need another dimension or work differently
        "how": { type: "other", dimensions: [0.0, 0.5, 0.5] },
        "to": { type: "other", dimensions: [0.0, 0.5, 0.5] },
        "where": { type: "other", dimensions: [0.0, 0.5, 0.5] },
        "is": { type: "other", dimensions: [0.0, 0.5, 0.5] },
        "the": { type: "other", dimensions: [0.0, 0.5, 0.5] },
        "very": { type: "other", dimensions: [0.0, 0.5, 0.5] },
        "and": { type: "other", dimensions: [0.0, 0.5, 0.5] },
    }
};
import { Dataset } from "./types";

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

    // Shared semantic space for all token types.
    // [0] concreteness: abstract -> physical
    // [1] domain: social/character -> world/location
    // [2] valence: negative/harmful -> positive/helpful
    knownTokens: {
        "wood":       { type: "noun", dimensions: [0.95, 0.35, 0.55] },
        "diamond":    { type: "noun", dimensions: [0.98, 0.30, 0.80] },
        "stick":      { type: "noun", dimensions: [0.90, 0.35, 0.52] },
        "sword":      { type: "noun", dimensions: [0.92, 0.32, 0.40] },
        "pickaxe":    { type: "noun", dimensions: [0.93, 0.32, 0.50] },
        "axe":        { type: "noun", dimensions: [0.93, 0.32, 0.48] },
        "shovel":     { type: "noun", dimensions: [0.92, 0.33, 0.54] },

        "guard":      { type: "noun", dimensions: [0.80, 0.12, 0.65] },
        "sentry":     { type: "noun", dimensions: [0.80, 0.13, 0.66] },
        "merchant":   { type: "noun", dimensions: [0.72, 0.18, 0.52] },
        "shopkeeper": { type: "noun", dimensions: [0.72, 0.18, 0.53] },

        "north":      { type: "noun", dimensions: [0.40, 0.95, 0.55] },
        "forest":     { type: "noun", dimensions: [0.75, 0.90, 0.70] },
        "jungle":     { type: "noun", dimensions: [0.76, 0.91, 0.68] },
        "desert":     { type: "noun", dimensions: [0.73, 0.92, 0.32] },

        "strong":     { type: "adj", dimensions: [0.25, 0.20, 0.84] },
        "greedy":     { type: "adj", dimensions: [0.22, 0.18, 0.20] },

        "combine":    { type: "verb", dimensions: [0.20, 0.30, 0.66] },
        "craft":      { type: "verb", dimensions: [0.22, 0.32, 0.70] },
        "describe":   { type: "verb", dimensions: [0.18, 0.16, 0.58] },

        "how":        { type: "other", dimensions: [0.06, 0.40, 0.55] },
        "to":         { type: "other", dimensions: [0.04, 0.65, 0.52] },
        "where":      { type: "other", dimensions: [0.06, 0.78, 0.56] },
        "is":         { type: "other", dimensions: [0.05, 0.48, 0.50] },
        "the":        { type: "other", dimensions: [0.03, 0.45, 0.50] },
        "very":       { type: "other", dimensions: [0.08, 0.25, 0.70] },
        "and":        { type: "other", dimensions: [0.04, 0.40, 0.52] },
    }
};
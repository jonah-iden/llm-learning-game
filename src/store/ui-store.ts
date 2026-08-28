import { create } from "zustand";
import { Token } from "../tokenize";
import type { SupportedLanguage } from "../i18n/types";

const LANGUAGE_STORAGE_KEY = "llm-learning-game.language";

function readInitialLanguage(): SupportedLanguage {
    if (typeof window === "undefined") {
        return "en";
    }

    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return storedLanguage === "de" ? "de" : "en";
}

interface UIState {
    activeToken: Token | null;
    setActiveToken: (token: Token | null) => void;
    answers: Record<number, Token[]>;
    updateCurrentAnswer: (answer: Token) => void;
    removeAnswerToken: (token: Token) => void;
    isRevealed: boolean;
    toggleRevealed: () => void;
    questionIndex: number;
    setQuestionIndex: (index: number) => void;
    isFinished: boolean;
    setFinished: (finished: boolean) => void;
    language: SupportedLanguage;
    setLanguage: (language: SupportedLanguage) => void;
    resetProgress: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    activeToken: null,
    setActiveToken: (token) => set({ activeToken: token }),
    answers: {},
    updateCurrentAnswer: (token) => set(state => {
        const currentAnswer = state.answers[state.questionIndex] || [];
        return {
            answers: {
                ...state.answers,
                [state.questionIndex]: [...currentAnswer, token]
            }
        };
    }),
    removeAnswerToken: (token) => set(state => {
        const currentAnswer = state.answers[state.questionIndex] || [];
        return {
            answers: {
                ...state.answers,
                [state.questionIndex]: currentAnswer.filter(t => t !== token)
            }
        };
    }),
    isRevealed: false,
    toggleRevealed: () => set(state => ({ isRevealed: !state.isRevealed })),
    questionIndex: 0,
    setQuestionIndex: (index) => set({ questionIndex: index, activeToken: null }),
    isFinished: false,
    setFinished: (finished) => set({ isFinished: finished }),
    language: readInitialLanguage(),
    setLanguage: (language) => set(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        }

        return { language };
    }),
    resetProgress: () => set(() => ({
        activeToken: null,
        activeTool: null,
        answers: {},
        isRevealed: false,
        questionIndex: 0,
        isFinished: false,
    })),
}));

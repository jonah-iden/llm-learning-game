import { create } from "zustand";
import { Token } from "../tokenize";

interface UIState {
    activeToken: Token | null;
    setActiveToken: (token: Token | null) => void;
    activeTool: string | null;
    setActiveTool: (tool: string | null) => void;
    answers: Record<number, Token[]>;
    updateCurrentAnswer: (answer: Token) => void;
    removeAnswerToken: (token: Token) => void;
    isRevealed: boolean;
    toggleRevealed: () => void;
    questionIndex: number;
    setQuestionIndex: (index: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
    activeToken: null,
    setActiveToken: (token) => set({ activeToken: token }),
    activeTool: null,
    setActiveTool: (tool) => set({ activeTool: tool }),
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
    setQuestionIndex: (index) => set({ questionIndex: index }),
}));

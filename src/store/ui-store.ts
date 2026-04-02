import { create } from "zustand";
import { Token } from "../tokenize";

interface UIState {
    activeToken: Token | null;
    setActiveToken: (token: Token | null) => void;
    activeTool: string | null;
    setActiveTool: (tool: string | null) => void;
    answers: Record<number, Token[]>;
    setAnswer: (questionIndex: number, answer: Token[]) => void;
    isRevealed: boolean;
    setIsRevealed: (isRevealed: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    activeToken: null,
    setActiveToken: (token) => set({ activeToken: token }),
    activeTool: null,
    setActiveTool: (tool) => set({ activeTool: tool }),
    answers: {},
    setAnswer: (questionIndex, answer) => set((state) => ({
        answers: {
            ...state.answers,
            [questionIndex]: answer,
        },
    })),
    isRevealed: false,
    setIsRevealed: (isRevealed) => set({ isRevealed }),
}));

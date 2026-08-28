import type { SupportedLanguage, UiBundle } from "./types";

type BundleModule = { default: UiBundle };

const fallbackBundle: UiBundle = {
  app: {
    languageLabel: "Language",
    loading: "Loading...",
  },
  common: {
    questionPrefix: "Q:",
    answerPrefix: "A:",
  },
  questionArea: {
    dragTokensHere: "Drag tokens here",
    done: "Done!",
    hideAnswers: "Hide Answers",
    revealAnswers: "Reveal Answers",
    submit: "Submit",
    nextQuestion: "Next Question",
  },
  toolsArea: {
    activeToken: "Active Token",
    mostSimilar: "Most Similar",
    mostLikelyNext: "Most Likely Next",
    noneSelected: "None selected",
  },
};

const bundleLoaders: Record<SupportedLanguage, () => Promise<BundleModule>> = {
  en: () => import("../locales/en/bundle.json"),
  de: () => import("../locales/de/bundle.json"),
};

export async function loadBundle(language: SupportedLanguage): Promise<UiBundle> {
  try {
    const module = await bundleLoaders[language]();
    return module.default;
  } catch {
    if (language !== "en") {
      try {
        const englishModule = await bundleLoaders.en();
        return englishModule.default;
      } catch {
        return fallbackBundle;
      }
    }

    return fallbackBundle;
  }
}

export function getFallbackBundle(): UiBundle {
  return fallbackBundle;
}

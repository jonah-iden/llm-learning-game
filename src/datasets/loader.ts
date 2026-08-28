import type { SupportedLanguage } from "../i18n/types";
import type { Dataset } from "./types";

type DatasetModule = { default: Dataset };

// Shared semantic space for all token types.
// [0] concreteness: abstract -> physical
// [1] domain: social/character -> world/location
// [2] valence: negative/harmful -> positive/helpful
const datasetLoaders: Record<SupportedLanguage, () => Promise<DatasetModule>> = {
  en: () => import("./en/general-questions-dataset.json") as Promise<DatasetModule>,
  de: () => import("./de/general-questions-dataset.json") as Promise<DatasetModule>,
};

export async function loadDataset(language: SupportedLanguage): Promise<Dataset> {
  try {
    const module = await datasetLoaders[language]();
    return module.default;
  } catch {
    if (language !== "en") {
      const englishModule = await datasetLoaders.en();
      return englishModule.default;
    }

    throw new Error("Unable to load dataset for language: en");
  }
}

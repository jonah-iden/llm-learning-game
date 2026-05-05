import type { SupportedLanguage } from "../i18n/types";
import type { Dataset } from "./types";

type DatasetModule = { default: Dataset };

const datasetLoaders: Record<SupportedLanguage, () => Promise<DatasetModule>> = {
  en: () => import("./en/test-dataset.json"),
  de: () => import("./de/test-dataset.json"),
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

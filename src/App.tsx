import { DatasetArea } from "./areas/dataset-area/dataset-area";
import { QuestionArea } from "./areas/question-area/question-area";
import { ToolsArea } from "./areas/tools-area/tools-area";
import { DragDropProvider } from "@dnd-kit/react";
import { AutoScroller } from '@dnd-kit/dom';
import { useUIStore } from "./store/ui-store";
import { Token } from "./tokenize";
import { useEffect, useState } from "react";
import type { Dataset } from "./datasets/types";
import { loadDataset } from "./datasets/loader";
import { getFallbackBundle, loadBundle } from "./i18n/loader";
import type { SupportedLanguage, UiBundle } from "./i18n/types";

const LANGUAGE_OPTIONS: Array<{ value: SupportedLanguage; label: string }> = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
];

function isSupportedLanguage(value: string): value is SupportedLanguage {
  return value === "en" || value === "de";
}


function App() {
  const { updateCurrentAnswer, removeAnswerToken, answers, questionIndex, language, setLanguage, resetProgress } = useUIStore();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [bundle, setBundle] = useState<UiBundle>(getFallbackBundle());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadResources = async () => {
      setIsLoading(true);

      try {
        const [nextDataset, nextBundle] = await Promise.all([
          loadDataset(language),
          loadBundle(language),
        ]);

        if (!isMounted) {
          return;
        }

        setDataset(nextDataset);
        setBundle(nextBundle);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadResources();

    return () => {
      isMounted = false;
    };
  }, [language]);

  if (!dataset) {
    return (
      <main className="app appLoading">
        <p>{bundle.app.loading}</p>
      </main>
    );
  }

  return (
    <DragDropProvider
      plugins={(defaults) => defaults.filter(plugin => plugin !== AutoScroller)}
      onDragEnd={e => {
        const token = e.operation.source?.data as Token
        if (!e.canceled && token) {
          const isInAnswer = answers[questionIndex]?.includes(token)
          if (e.operation.target?.id === 'answer-drop-area' && !isInAnswer) {
            updateCurrentAnswer(token);
          } else if (isInAnswer && e.operation.target?.id !== 'answer-drop-area') {
            removeAnswerToken(token);
            e.suspend().abort();
          }
        }
      }}
    >
      <main className="app">
        <div className="mainArea">
          <header className="appHeader">
            <label htmlFor="language-select">{bundle.app.languageLabel}</label>
            <select
              id="language-select"
              value={language}
              onChange={(event) => {
                if (!isSupportedLanguage(event.target.value)) {
                  return;
                }

                resetProgress();
                setLanguage(event.target.value);
              }}
              disabled={isLoading}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
              ))}
            </select>
          </header>
          <DatasetArea dataset={dataset} labels={bundle.common} />
          <QuestionArea dataset={dataset} labels={bundle.questionArea} commonLabels={bundle.common} />
        </div>
        <ToolsArea dataset={dataset} labels={bundle.toolsArea} />
      </main>
    </DragDropProvider>

  );
}

export default App;

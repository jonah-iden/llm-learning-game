import { DatasetArea } from "./areas/dataset-area/dataset-area";
import { QuestionArea } from "./areas/question-area/question-area";
import { ToolsArea } from "./areas/tools-area/tools-area";
import { GameWikiDataset } from "./datasets/test-dataset";
import { DragDropProvider } from "@dnd-kit/react";
import {AutoScroller} from '@dnd-kit/dom';
import { useUIStore } from "./store/ui-store";
import { Token } from "./tokenize";
import { useCallback } from "react";

const dataset = GameWikiDataset;

function App() {
  const { updateCurrentAnswer, removeAnswerToken, answers, questionIndex } = useUIStore();

  return (
    <DragDropProvider
      plugins={(defaults) => defaults.filter(plugin => plugin !== AutoScroller)}
      onDragEnd={e => {
        const token = e.operation.source?.data as Token
        if(!e.canceled && token) {
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
          <DatasetArea dataset={dataset} />
          <QuestionArea dataset={dataset} />
        </div>
        <ToolsArea dataset={dataset}/>
      </main>
    </DragDropProvider>

  );
}

export default App;

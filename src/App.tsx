import { DatasetArea } from "./areas/dataset-area/dataset-area";
import { QuestionArea } from "./areas/question-area/question-area";
import { ToolsArea } from "./areas/tools-area/tools-area";
import { GameWikiDataset } from "./datasets/test-dataset";
import { DragDropProvider } from "@dnd-kit/react";
import {AutoScroller} from '@dnd-kit/dom';
import { useUIStore } from "./store/ui-store";
import { Token } from "./tokenize";

const dataset = GameWikiDataset;

function App() {
  const { updateCurrentAnswer } = useUIStore();


  return (
    <DragDropProvider
      plugins={(defaults) =>defaults.filter(plugin => plugin !== AutoScroller)}
      onDragEnd={e => {
        const token = e.operation.source?.data as Token
        if (!e.canceled && token && e.operation.target?.id === 'answer-drop-area') {
          updateCurrentAnswer(token);
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

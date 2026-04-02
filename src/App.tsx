import { useState } from "react";
import { DatasetArea } from "./areas/dataset-area/dataset-area";
import { QuestionArea } from "./areas/question-area/question-area";
import { ToolsArea } from "./areas/tools-area/tools-area";
import { GameWikiDataset } from "./datasets/test-dataset";
import { DragDropProvider } from "@dnd-kit/react";
import { useUIStore } from "./store/ui-store";
import { Token } from "./tokenize";

const dataset = GameWikiDataset;

function App() {
  const { setAnswer, answers } = useUIStore();


  return (
    <DragDropProvider onDragEnd={e => {
      const token = e.operation.source?.data as Token
      setAnswer(0, [...(answers[0] || []), token]);
    }} >
        <main className="app">
          <div className="mainArea">
            <DatasetArea dataset={dataset}/>
            <QuestionArea dataset={dataset} />
          </div>
          <ToolsArea />
        </main>
    </DragDropProvider>

  );
}

export default App;

export type SupportedLanguage = "en" | "de";

export type CommonLabels = {
  questionPrefix: string;
  answerPrefix: string;
};

export type QuestionAreaLabels = {
  dragTokensHere: string;
  done: string;
  hideAnswers: string;
  revealAnswers: string;
  submit: string;
  nextQuestion: string;
};

export type ToolsAreaLabels = {
  activeToken: string;
  mostSimilar: string;
  mostLikelyNext: string;
  noneSelected: string;
};

export type AppLabels = {
  languageLabel: string;
  loading: string;
};

export type TutorialLabels = {
  openButtonLabel: string;
  title: string;
  closeButtonLabel: string;
  startButton: string;
  content: string[];
};

export type UiBundle = {
  app: AppLabels;
  common: CommonLabels;
  questionArea: QuestionAreaLabels;
  toolsArea: ToolsAreaLabels;
  tutorial: TutorialLabels;
};

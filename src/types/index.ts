
export type AppStage = 'splash' | 'onboard' | 'app';

export type SavedTab = 'facts' | 'stories';
export interface Task {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

export type TaskLevel = Task[];
export type TaskLevels = TaskLevel[];
export interface WordItem {
  id: string;
  word: string;
  hints: string[];
}

export interface Fact {
  id: string;
  title: string;
  body: string;
  imageKey?: string;
}

export interface Story {
  id: string;
  title: string;
  body: string;
}
export interface SavedContent {
  facts: Fact[];
  stories: Story[];
}

export interface LogicBuildState {
  started: boolean;
  taskIndex: number;
  levelIndex: number;
  level: number;
  finished: boolean;
}

export interface WordBuilderState {
  started: boolean;
  wordIndex: number;
  finished: boolean;
}

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  LogicBuild: undefined;
  WordBuilder: undefined;
  Saved: undefined;
  Facts: undefined;
  Stories: undefined;
};
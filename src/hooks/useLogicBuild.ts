import { useState, useEffect, useCallback } from 'react';
import { saveItem, loadItem } from '../storage/storage';
import { STORAGE_KEYS } from '../storage/keys';
import { TASKS } from '../data/tasks';
import { CONFIG } from '../constants/config';
import { Task } from '../types';

const TASKS_PER_LEVEL = 6;

export interface UseLogicBuildReturn {
  started:         boolean;
  taskIndex:       number;
  levelIndex:      number;
  level:           number;
  selected:        number | null;
  finished:        boolean;
  showLevelResult: boolean;
  levelPerfect:    boolean;
  currentTask:     Task;
  totalLevels:     number;
  handleStart:       () => Promise<void>;
  handleAnswer:      (idx: number) => void;
  handleRestart:     () => Promise<void>;
  handleNextLevel:   () => Promise<void>;
  handleBackToStart: () => void;
}

export function useLogicBuild(): UseLogicBuildReturn {
  const [started,         setStarted]         = useState(false);
  const [taskIndex,       setTaskIndex]        = useState(0);
  const [levelIndex,      setLevelIndex]       = useState(0);
  const [level,           setLevel]            = useState(0);
  const [selected,        setSelected]         = useState<number | null>(null);
  const [finished,        setFinished]         = useState(false);
  const [showLevelResult, setShowLevelResult]  = useState(false);
  const [levelPerfect,    setLevelPerfect]     = useState(false);
  const [correctCount,    setCorrectCount]     = useState(0);

  useEffect(() => {
    (async () => {
      const [lvl, task, lvlIdx, fin] = await Promise.all([
        loadItem<number>(STORAGE_KEYS.LOGIC_LEVEL,    0),
        loadItem<number>(STORAGE_KEYS.LOGIC_TASK,     0),
        loadItem<number>('logicLevelIndex',            0),
        loadItem<boolean>(STORAGE_KEYS.LOGIC_FINISHED, false),
      ]);
      setLevel(lvl);
      setTaskIndex(task);
      setLevelIndex(lvlIdx);
      setFinished(fin);
    })();
  }, []);

  const handleStart = useCallback(async () => {
    setStarted(true);
    setShowLevelResult(false);
    setCorrectCount(0);
    await saveItem(STORAGE_KEYS.LOGIC_STARTED, true);
  }, []);

  const handleBackToStart = useCallback(() => {
    setStarted(false);
    setShowLevelResult(false);
  }, []);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selected !== null) return;
      setSelected(idx);

      const currentLevelTasks = TASKS[levelIndex];
      const isCorrect         = currentLevelTasks[taskIndex].correct === idx;
      const newLevel          = isCorrect ? Math.min(level + 1, 5) : level;
      const newCorrectCount   = isCorrect ? correctCount + 1 : correctCount;

      if (isCorrect) setLevel(newLevel);
      setCorrectCount(newCorrectCount);

      setTimeout(async () => {
        if (isCorrect) {
          await saveItem(STORAGE_KEYS.LOGIC_LEVEL, newLevel);
        }

        const nextTaskIndex = taskIndex + 1;

        if (nextTaskIndex >= TASKS_PER_LEVEL) {
    
          const perfect = newCorrectCount === TASKS_PER_LEVEL;
          setLevelPerfect(perfect);
          setShowLevelResult(true);
          setStarted(false);
          setSelected(null);
          await saveItem(STORAGE_KEYS.LOGIC_TASK, 0);
        } else {
          setTaskIndex(nextTaskIndex);
          setSelected(null);
          await saveItem(STORAGE_KEYS.LOGIC_TASK, nextTaskIndex);
        }
      }, CONFIG.ANSWER_FEEDBACK_DELAY_MS);
    },
    [selected, taskIndex, levelIndex, level, correctCount],
  );

  const handleNextLevel = useCallback(async () => {
    const nextLevelIndex = levelIndex + 1;

    if (nextLevelIndex >= TASKS.length) {
      setFinished(true);
      await saveItem(STORAGE_KEYS.LOGIC_FINISHED, true);
      return;
    }

    setLevelIndex(nextLevelIndex);
    setTaskIndex(0);
    setLevel(0);
    setCorrectCount(0);
    setShowLevelResult(false);

    await Promise.all([
      saveItem('logicLevelIndex',           nextLevelIndex),
      saveItem(STORAGE_KEYS.LOGIC_TASK,     0),
      saveItem(STORAGE_KEYS.LOGIC_LEVEL,    0),
    ]);
  }, [levelIndex]);

  const handleRestart = useCallback(async () => {
    setLevel(0);
    setTaskIndex(0);
    setCorrectCount(0);
    setSelected(null);
    setShowLevelResult(false);
    setStarted(false);

    await Promise.all([
      saveItem(STORAGE_KEYS.LOGIC_LEVEL,   0),
      saveItem(STORAGE_KEYS.LOGIC_TASK,    0),
      saveItem(STORAGE_KEYS.LOGIC_STARTED, false),
    ]);
  }, []);

  return {
    started,
    taskIndex,
    levelIndex,
    level,
    selected,
    finished,
    showLevelResult,
    levelPerfect,
    currentTask:  TASKS[levelIndex][taskIndex],
    totalLevels:  TASKS.length,
    handleStart,
    handleAnswer,
    handleRestart,
    handleNextLevel,
    handleBackToStart,
  };
}
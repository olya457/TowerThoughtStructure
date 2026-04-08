import { useState, useEffect, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { saveItem, loadItem } from '../storage/storage';
import { STORAGE_KEYS } from '../storage/keys';
import { WORDS } from '../data/words';

export interface UseWordBuilderReturn {
  started: boolean;
  wordIndex: number;
  input: string;
  wrong: boolean;
  showRestart: boolean;
  finished: boolean;
  wordComplete: boolean;
  currentWord: typeof WORDS[0];
  setInput: (v: string) => void;
  setShowRestart: (v: boolean) => void;
  handleStart: () => Promise<void>;
  handleContinue: () => void;
  handleNextWord: () => Promise<void>;
  handleRestart: () => Promise<void>;
}

export function useWordBuilder(): UseWordBuilderReturn {
  const [started, setStarted]           = useState(false);
  const [wordIndex, setWordIndex]       = useState(0);
  const [input, setInput]               = useState('');
  const [wrong, setWrong]               = useState(false);
  const [showRestart, setShowRestart]   = useState(false);
  const [finished, setFinished]         = useState(false);
  const [wordComplete, setWordComplete] = useState(false);

  useEffect(() => {
    (async () => {
      const [idx, start, fin] = await Promise.all([
        loadItem<number>(STORAGE_KEYS.WORD_INDEX, 0),
        loadItem<boolean>(STORAGE_KEYS.WORD_STARTED, false),
        loadItem<boolean>(STORAGE_KEYS.WORD_FINISHED, false),
      ]);
      setWordIndex(idx);
      setStarted(start);
      setFinished(fin);
    })();
  }, []);

  const handleStart = useCallback(async () => {
    setStarted(true);
    await saveItem(STORAGE_KEYS.WORD_STARTED, true);
  }, []);

  const handleContinue = useCallback(() => {
    Keyboard.dismiss();
    if (input.toUpperCase().trim() === WORDS[wordIndex].word) {
      setWrong(false);
      setWordComplete(true);
    } else {
      setWrong(true);
    }
  }, [input, wordIndex]);

  const handleNextWord = useCallback(async () => {
    const next = wordIndex + 1;
    setWordComplete(false);
    setInput('');
    setWrong(false);
    if (next >= WORDS.length) {
      setFinished(true);
      await saveItem(STORAGE_KEYS.WORD_FINISHED, true);
    } else {
      setWordIndex(next);
      await saveItem(STORAGE_KEYS.WORD_INDEX, next);
    }
  }, [wordIndex]);

  const handleRestart = useCallback(async () => {
    setWordIndex(0); setInput('');
    setWrong(false); setFinished(false);
    setWordComplete(false); setStarted(false);
    await Promise.all([
      saveItem(STORAGE_KEYS.WORD_INDEX, 0),
      saveItem(STORAGE_KEYS.WORD_FINISHED, false),
      saveItem(STORAGE_KEYS.WORD_STARTED, false),
    ]);
    setShowRestart(false);
  }, []);

  return {
    started, wordIndex, input, wrong,
    showRestart, finished, wordComplete,
    currentWord: WORDS[wordIndex],
    setInput: (v: string) => { setInput(v); setWrong(false); },
    setShowRestart,
    handleStart, handleContinue, handleNextWord, handleRestart,
  };
}
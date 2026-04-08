import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Fact, Story, SavedTab } from '../types';
import {
  loadSavedFacts, loadSavedStories,
  saveFact, removeFact,
  saveStory, removeStory,
} from '../storage/savedContent';

export interface UseSavedContentReturn {
  tab:             SavedTab;
  setTab:          Dispatch<SetStateAction<SavedTab>>;
  savedFacts:      Fact[];
  setSavedFacts:   Dispatch<SetStateAction<Fact[]>>;
  savedStories:    Story[];
  setSavedStories: Dispatch<SetStateAction<Story[]>>;
  openId:          string | null;
  setOpenId:       Dispatch<SetStateAction<string | null>>;
}

export function useSavedContent(): UseSavedContentReturn {
  const [tab, setTab]                   = useState<SavedTab>('facts');
  const [savedFacts, setSavedFacts]     = useState<Fact[]>([]);
  const [savedStories, setSavedStories] = useState<Story[]>([]);
  const [openId, setOpenId]             = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const [facts, stories] = await Promise.all([
          loadSavedFacts(),
          loadSavedStories(),
        ]);
        setSavedFacts(facts);
        setSavedStories(stories);
      })();
    }, []),
  );

  return {
    tab, setTab,
    savedFacts,   setSavedFacts,
    savedStories, setSavedStories,
    openId, setOpenId,
  };
}

export function useFactsSaved() {
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const facts = await loadSavedFacts();
        const map: Record<string, boolean> = {};
        facts.forEach((f: Fact) => { map[f.id] = true; });
        setSavedIds(map);
      })();
    }, []),
  );

  const toggle = useCallback(async (fact: Fact) => {
    if (savedIds[fact.id]) {
      await removeFact(fact.id);
      setSavedIds((prev: Record<string, boolean>) => {
        const n = { ...prev };
        delete n[fact.id];
        return n;
      });
    } else {
      await saveFact(fact);
      setSavedIds((prev: Record<string, boolean>) => ({ ...prev, [fact.id]: true }));
    }
  }, [savedIds]);

  return { savedIds, toggle };
}

export function useStoriesSaved() {
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const stories = await loadSavedStories();
        const map: Record<string, boolean> = {};
        stories.forEach((s: Story) => { map[s.id] = true; });
        setSavedIds(map);
      })();
    }, []),
  );

  const toggle = useCallback(async (story: Story) => {
    if (savedIds[story.id]) {
      await removeStory(story.id);
      setSavedIds((prev: Record<string, boolean>) => {
        const n = { ...prev };
        delete n[story.id];
        return n;
      });
    } else {
      await saveStory(story);
      setSavedIds((prev: Record<string, boolean>) => ({ ...prev, [story.id]: true }));
    }
  }, [savedIds]);

  return { savedIds, toggle };
}
import { Fact, Story } from '../types';
import { saveItem, loadItem, getAllKeys } from './storage';
import { STORAGE_KEYS } from './keys';

export const saveFact = async (fact: Fact): Promise<void> => {
  await saveItem(`${STORAGE_KEYS.SAVED_FACT_PREFIX}${fact.id}`, fact);
};

export const removeFact = async (factId: string): Promise<void> => {
  await saveItem(`${STORAGE_KEYS.SAVED_FACT_PREFIX}${factId}`, null);
};

export const loadSavedFacts = async (): Promise<Fact[]> => {
  const keys = await getAllKeys();
  const factKeys = keys.filter(k => k.startsWith(STORAGE_KEYS.SAVED_FACT_PREFIX));
  const results: Fact[] = [];
  for (const k of factKeys) {
    const v = await loadItem<Fact | null>(k, null);
    if (v) results.push(v);
  }
  return results;
};

export const saveStory = async (story: Story): Promise<void> => {
  await saveItem(`${STORAGE_KEYS.SAVED_STORY_PREFIX}${story.id}`, story);
};

export const removeStory = async (storyId: string): Promise<void> => {
  await saveItem(`${STORAGE_KEYS.SAVED_STORY_PREFIX}${storyId}`, null);
};

export const loadSavedStories = async (): Promise<Story[]> => {
  const keys = await getAllKeys();
  const storyKeys = keys.filter(k => k.startsWith(STORAGE_KEYS.SAVED_STORY_PREFIX));
  const results: Story[] = [];
  for (const k of storyKeys) {
    const v = await loadItem<Story | null>(k, null);
    if (v) results.push(v);
  }
  return results;
};
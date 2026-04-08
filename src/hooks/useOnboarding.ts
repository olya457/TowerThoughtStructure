import { useState, useCallback } from 'react';
import { AppStage } from '../types';
import { saveItem, loadItem } from '../storage/storage';
import { STORAGE_KEYS } from '../storage/keys';

export function useAppStage() {
  const [stage, setStage] = useState<AppStage>('splash');

  const goToOnboard = useCallback(() => setStage('onboard'), []);

  const goToApp = useCallback(async () => {
    setStage('app');
    await saveItem(STORAGE_KEYS.ONBOARDING_DONE, true);
  }, []);

  return { stage, goToOnboard, goToApp };
}
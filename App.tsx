import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { useAppStage } from './src/hooks/useOnboarding';

export default function App() {
  const { stage, goToOnboard, goToApp } = useAppStage();

  if (stage === 'splash')  return <SplashScreen onDone={goToOnboard} />;
  if (stage === 'onboard') return <OnboardingScreen onDone={goToApp} />;
  return <RootNavigator />;
}
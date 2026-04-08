import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const LAYOUT = {
  width,
  height,
  isIOS:        Platform.OS === 'ios',
  isAndroid:    Platform.OS === 'android',
  tabBarHeight: Platform.OS === 'ios' ? 80 : 60,
  tabBarPaddingBottom: Platform.OS === 'ios' ? 20 : 8,
  screenPadding: 16,
  borderRadius:  12,
  borderRadiusLg: 18,
} as const;
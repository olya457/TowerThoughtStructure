import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet } from 'react-native';
import { MainTabParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';

import LogicBuildScreen from '../screens/LogicBuildScreen';
import WordBuilderScreen from '../screens/WordBuilderScreen';
import SavedScreen from '../screens/SavedScreen';
import FactsScreen from '../screens/FactsScreen';
import StoriesScreen from '../screens/StoriesScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, any> = {
  LogicBuild: require('../assets/icons/tab_home.png'),
  WordBuilder: require('../assets/icons/tab_puzzle.png'),
  Saved: require('../assets/icons/tab_saved.png'),
  Facts: require('../assets/icons/tab_book.png'),
  Stories: require('../assets/icons/tab_star.png'),
};

const IS_IOS = Platform.OS === 'ios';
const H_MARGIN = 24;
const LIFT = IS_IOS ? 18 : 44;
const TAB_H = IS_IOS ? 54 : 50;
const RADIUS = 20;

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.45)',
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={ICONS[route.name]}
            style={{
              width: 22,
              height: 22,
              tintColor: focused ? '#fff' : 'rgba(255,255,255,0.45)',
            }}
            resizeMode="contain"
          />
        ),
      })}
    >
      <Tab.Screen name="LogicBuild" component={LogicBuildScreen} />
      <Tab.Screen name="WordBuilder" component={WordBuilderScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Facts" component={FactsScreen} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FCAC16',
    position: 'absolute',
    bottom: LIFT,
    left: H_MARGIN,
    right: H_MARGIN,
    borderRadius: RADIUS,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 10,
    height: TAB_H,
    paddingBottom: IS_IOS ? 8 : 6,
    paddingTop: 6,
    paddingLeft: 8,
    paddingRight: 8,
    overflow: 'visible',
  },
});
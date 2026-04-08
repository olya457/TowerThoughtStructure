import React from 'react';
import {
  ScrollView, Text, StyleSheet,
  Platform, StatusBar, Dimensions,
} from 'react-native';
import { ScreenWrapper } from '../components/common/ScreenWrapper';
import { FactCard }      from '../components/facts/FactCard';
import { useFactsSaved } from '../hooks/useSavedContent';
import { FACTS }         from '../data/facts';
import { COLORS }        from '../constants/colors';
import { Fact }          from '../types';

const { height } = Dimensions.get('window');
const isSmall    = height < 680;

const TOP_OFFSET =
  Platform.OS === 'android'
    ? (StatusBar.currentHeight ?? 24) + 20
    : 20;

export default function FactsScreen() {
  const { savedIds, toggle } = useFactsSaved();

  return (
    <ScreenWrapper>
      <Text style={s.header}>Facts</Text>
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        {FACTS.map((fact: Fact) => (
          <FactCard
            key={fact.id}
            fact={fact}
            saved={!!savedIds[fact.id]}
            onToggleSave={toggle}
          />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  header: {
    paddingTop:        TOP_OFFSET,
    paddingBottom:     isSmall ? 6 : 10,
    paddingHorizontal: 20,
    fontSize:          isSmall ? 18 : 22,
    fontWeight:        'bold',
    color:             COLORS.white,
    textAlign:         'center',
  },
  scroll: {
    padding:       isSmall ? 12 : 16,
    gap:           isSmall ? 12 : 16,
    paddingBottom: 150,
  },
});
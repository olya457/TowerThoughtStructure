import React, { useState } from 'react';
import {
  ScrollView, Text, StyleSheet,
  Platform, StatusBar, Dimensions,
} from 'react-native';
import { ScreenWrapper }   from '../components/common/ScreenWrapper';
import { IntroCard }       from '../components/stories/IntroCard';
import { StoryCard }       from '../components/stories/StoryCard';
import { useStoriesSaved } from '../hooks/useSavedContent';
import { STORIES }         from '../data/stories';
import { COLORS }          from '../constants/colors';
import { Story }           from '../types';

const { height } = Dimensions.get('window');
const isSmall    = height < 680;

const TOP_OFFSET =
  Platform.OS === 'android'
    ? (StatusBar.currentHeight ?? 24) + 20
    : 20;

export default function StoriesScreen() {
  const [openId, setOpenId]  = useState<string | null>(null);
  const { savedIds, toggle } = useStoriesSaved();

  const handleToggleOpen = (id: string) =>
    setOpenId((prev: string | null) => (prev === id ? null : id));

  return (
    <ScreenWrapper>
      <Text style={s.header}>Builder Stories</Text>
      <IntroCard />
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        {STORIES.map((story: Story) => (
          <StoryCard
            key={story.id}
            story={story}
            isOpen={openId === story.id}
            saved={!!savedIds[story.id]}
            onToggleOpen={handleToggleOpen}
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
    paddingHorizontal: isSmall ? 12 : 16,
    paddingTop:        isSmall ? 6 : 8,
    gap:               isSmall ? 8 : 10,
    paddingBottom:     144,
  },
});
import React, { useCallback } from 'react';
import {
  ScrollView, Text, StyleSheet, TouchableOpacity,
  Alert, Platform, StatusBar, Dimensions, View,
} from 'react-native';
import { useNavigation }   from '@react-navigation/native';
import { ScreenWrapper }   from '../components/common/ScreenWrapper';
import { SavedTabs }       from '../components/saved/SavedTabs';
import { EmptyState }      from '../components/saved/EmptyState';
import { FactCard }        from '../components/facts/FactCard';
import { StoryCard }       from '../components/stories/StoryCard';
import { useSavedContent } from '../hooks/useSavedContent';
import { removeItem }      from '../storage/storage';
import { COLORS }          from '../constants/colors';
import { Fact, Story }     from '../types';

const { height } = Dimensions.get('window');
const isSmall    = height < 680;

const TOP_OFFSET =
  Platform.OS === 'android'
    ? (StatusBar.currentHeight ?? 24) + 20
    : 20;

export default function SavedScreen() {
  const navigation = useNavigation<any>();
  const {
    tab, setTab,
    savedFacts,   setSavedFacts,
    savedStories, setSavedStories,
    openId, setOpenId,
  } = useSavedContent();

  const deleteFact = useCallback((fact: Fact) => {
    Alert.alert(
      'Remove Fact',
      'Remove this fact from saved?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeItem(`savedFact_${fact.id}`);
            setSavedFacts((prev: Fact[]) => prev.filter((f: Fact) => f.id !== fact.id));
          },
        },
      ],
    );
  }, [setSavedFacts]);

  const deleteStory = useCallback((story: Story) => {
    Alert.alert(
      'Remove Story',
      'Remove this story from saved?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeItem(`savedStory_${story.id}`);
            setSavedStories((prev: Story[]) => prev.filter((s: Story) => s.id !== story.id));
          },
        },
      ],
    );
  }, [setSavedStories]);


  const clearAll = useCallback(() => {
    const isEmpty =
      tab === 'facts' ? savedFacts.length === 0 : savedStories.length === 0;
    if (isEmpty) return;

    Alert.alert(
      'Clear All',
      `Remove all saved ${tab}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            if (tab === 'facts') {
              await Promise.all(
                savedFacts.map((f: Fact) => removeItem(`savedFact_${f.id}`)),
              );
              setSavedFacts([]);
            } else {
              await Promise.all(
                savedStories.map((s: Story) => removeItem(`savedStory_${s.id}`)),
              );
              setSavedStories([]);
            }
          },
        },
      ],
    );
  }, [tab, savedFacts, savedStories, setSavedFacts, setSavedStories]);

  const hasSaved =
    tab === 'facts' ? savedFacts.length > 0 : savedStories.length > 0;

  return (
    <ScreenWrapper>

      <View style={s.headerRow}>
        <Text style={s.header}>Saved Content</Text>
        {hasSaved && (
          <TouchableOpacity
            style={s.clearBtn}
            onPress={clearAll}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={s.clearTxt}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <SavedTabs tab={tab} onChangeTab={setTab} />

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >

        {tab === 'facts' && (
          savedFacts.length === 0 ? (
            <EmptyState
              title="No Saved Facts"
              sub="Facts you save will appear here"
              btnLabel="Explore Facts"
              onPress={() => navigation.navigate('Facts')}
            />
          ) : (
            savedFacts.map((fact: Fact) => (
              <View key={fact.id} style={s.cardWrap}>
                <FactCard
                  fact={fact}
                  saved
                  onToggleSave={() => deleteFact(fact)}
                />
                <TouchableOpacity
                  style={s.deleteBtn}
                  onPress={() => deleteFact(fact)}
                >
                  <Text style={s.deleteTxt}>✕ Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          )
        )}


        {tab === 'stories' && (
          savedStories.length === 0 ? (
            <EmptyState
              title="No Saved Stories"
              sub="Stories you save will appear here"
              btnLabel="Explore Stories"
              onPress={() => navigation.navigate('Stories')}
            />
          ) : (
            savedStories.map((story: Story) => (
              <View key={story.id} style={s.cardWrap}>
                <StoryCard
                  story={story}
                  isOpen={openId === story.id}
                  saved
                  onToggleOpen={(id: string) =>
                    setOpenId((prev: string | null) => (prev === id ? null : id))
                  }
                  onToggleSave={() => deleteStory(story)}
                />
                <TouchableOpacity
                  style={s.deleteBtn}
                  onPress={() => deleteStory(story)}
                >
                  <Text style={s.deleteTxt}>✕ Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          )
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  headerRow: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'center',
    paddingTop:        TOP_OFFSET,
    paddingBottom:     isSmall ? 6 : 10,
    paddingHorizontal: 20,
    position:          'relative',
  },
  header: {
    fontSize:   isSmall ? 18 : 22,
    fontWeight: 'bold',
    color:      COLORS.white,
    textAlign:  'center',
  },
  clearBtn: {
    position:          'absolute',
    right:             20,
    top:               TOP_OFFSET,
    paddingVertical:   4,
    paddingHorizontal: 10,
    backgroundColor:   'rgba(229,57,53,0.15)',
    borderRadius:      20,
    borderWidth:       1,
    borderColor:       COLORS.error,
  },
  clearTxt: {
    color:      COLORS.error,
    fontSize:   isSmall ? 11 : 13,
    fontWeight: '600',
  },
  scroll: {
    padding:       isSmall ? 12 : 16,
    gap:           isSmall ? 10 : 14,
    paddingBottom: 130,
  },
  cardWrap: {
    borderRadius: 14,
    overflow:     'hidden',
  },
  deleteBtn: {
    backgroundColor:         'rgba(229,57,53,0.10)',
    borderTopWidth:           1,
    borderTopColor:           'rgba(229,57,53,0.22)',
    paddingVertical:          8,
    alignItems:               'center',
    borderBottomLeftRadius:   14,
    borderBottomRightRadius:  14,
  },
  deleteTxt: {
    color:      COLORS.error,
    fontSize:   isSmall ? 12 : 13,
    fontWeight: '600',
  },
});
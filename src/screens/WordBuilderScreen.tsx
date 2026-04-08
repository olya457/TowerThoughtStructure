import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Platform, StatusBar, Dimensions, Image, ScrollView,
} from 'react-native';
import { ScreenWrapper }     from '../components/common/ScreenWrapper';
import { LetterBox }         from '../components/word/LetterBox';
import { HintsCard }         from '../components/word/HintsCard';
import { WordCompleteModal } from '../components/word/WordCompleteModal';
import { AppButton }         from '../components/common/AppButton';
import { useWordBuilder }    from '../hooks/useWordBuilder';
import { COLORS }            from '../constants/colors';
import { LAYOUT }            from '../constants/layout';

const { height, width } = Dimensions.get('window');
const isSmall     = height < 760;
const isVerySmall = height < 700;

const TOP_OFFSET =
  Platform.OS === 'android'
    ? (StatusBar.currentHeight ?? 24) + 20
    : 20;

const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M','⌫'],
];

const GAP   = isVerySmall ? 2 : 3;
const H_PAD = isVerySmall ? 10 : isSmall ? 12 : 16;
const K_W   = Math.floor((width - H_PAD * 2 - GAP * 9) / 10);
const K_H   = isVerySmall ? 28 : isSmall ? 32 : 36;

interface KbProps {
  onKey: (k: string) => void;
  onDelete: () => void;
  isFull: boolean;
}

function CompactKeyboard({ onKey, onDelete, isFull }: KbProps) {
  return (
    <View style={kb.wrap}>
      {ROWS.map((row, ri) => (
        <View key={ri} style={kb.row}>
          {row.map(key => {
            const isDel    = key === '⌫';
            const disabled = !isDel && isFull;
            return (
              <TouchableOpacity
                key={key}
                style={[kb.key, isDel && kb.delKey, disabled && kb.dimKey]}
                onPress={() => (isDel ? onDelete() : onKey(key))}
                activeOpacity={0.6}
                disabled={disabled}
              >
                <Text style={isDel ? kb.delTxt : kb.keyTxt}>{key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default function WordBuilderScreen() {
  const {
    started, wordIndex, input, wrong,
    finished, wordComplete,
    currentWord, setInput,
    handleStart, handleContinue,
    handleNextWord, handleRestart,
  } = useWordBuilder();

  const onKey    = (k: string) => {
    if (input.length < currentWord.word.length) setInput(input + k);
  };
  const onDelete = () => setInput(input.slice(0, -1));

  if (!started) {
    return (
      <ScreenWrapper>
        <View style={s.centered}>
          <Text style={s.header}>Word Builder</Text>
          <Image
            source={require('../assets/img/word_builder_start.png')}
            style={s.startImg}
            resizeMode="contain"
          />
          <Text style={s.bigTitle}>Build the Word</Text>
          <Text style={s.sub}>Fill in the gaps by selecting the correct letters</Text>
          <AppButton
            label="Start Guessing"
            onPress={handleStart}
            color={COLORS.success}
            style={{ marginTop: isSmall ? 16 : 24 }}
          />
        </View>
      </ScreenWrapper>
    );
  }

  if (finished) {
    return (
      <ScreenWrapper>
        <View style={s.centered}>
          <Text style={s.header}>Word Builder</Text>
          <Text style={s.finTitle}>All Words Complete!</Text>
          <Text style={s.finSub}>The element is added to your build</Text>
          <AppButton
            label="Try Again"
            onPress={handleRestart}
            style={{ marginTop: 16 }}
          />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>

      <View style={s.topBar}>
        <TouchableOpacity
          onPress={handleRestart}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={s.icon}>←</Text>
        </TouchableOpacity>
        <Text style={s.header}>Word Builder</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={s.counter}>Word {wordIndex + 1} / 24</Text>

      <ScrollView
        style={s.flex}
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={s.contentCard}>
          <View style={s.wordRow}>
            {currentWord.word.split('').map((ch, i) => (
              <LetterBox key={i} char={ch} typed={input[i]} />
            ))}
          </View>
          <HintsCard hints={currentWord.hints} />
          {wrong && <Text style={s.wrongTxt}>Incorrect! Try again.</Text>}
        </View>

        <View style={s.panel}>
          <View style={s.kbContainer}>
            <CompactKeyboard
              onKey={onKey}
              onDelete={onDelete}
              isFull={input.length >= currentWord.word.length}
            />
          </View>
          <TouchableOpacity
            style={s.continueBtn}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={s.continueTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <WordCompleteModal
        visible={wordComplete}
        onNext={handleNextWord}
        onExit={handleRestart}
      />
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  centered: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 24, paddingTop: TOP_OFFSET,
  },
  header: {
    fontSize: isVerySmall ? 16 : isSmall ? 17 : 20,
    fontWeight: 'bold', color: COLORS.white,
  },
  startImg: {
    width:  LAYOUT.width * (isVerySmall ? 0.58 : 0.65),
    height: LAYOUT.width * (isVerySmall ? 0.40 : isSmall ? 0.45 : 0.55),
    marginVertical: isVerySmall ? 10 : isSmall ? 12 : 20,
  },
  bigTitle: {
    fontSize: isVerySmall ? 18 : isSmall ? 20 : 24,
    fontWeight: 'bold', color: COLORS.accent, textAlign: 'center',
  },
  sub: {
    color: COLORS.white, textAlign: 'center',
    marginTop: 8, paddingHorizontal: 16,
    fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
  },
  finTitle: {
    fontSize: isVerySmall ? 18 : isSmall ? 20 : 22,
    fontWeight: 'bold', color: COLORS.success,
    marginBottom: 8, textAlign: 'center',
  },
  finSub: {
    color: COLORS.white,
    fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
    textAlign: 'center',
  },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: isVerySmall ? 14 : 20,
    paddingTop: TOP_OFFSET, paddingBottom: 2,
  },
  icon: { fontSize: isVerySmall ? 22 : 26, color: COLORS.white },
  counter: {
    textAlign: 'center', color: COLORS.textMuted,
    fontSize: isVerySmall ? 11 : isSmall ? 12 : 13,
    marginBottom: isVerySmall ? 2 : 4,
  },
  scroll: {
    paddingHorizontal: isVerySmall ? 12 : 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 18,
  },
  contentCard: { marginTop: isVerySmall ? 4 : 8 },
  wordRow: {
    flexDirection: 'row', justifyContent: 'center',
    flexWrap: 'wrap',
    gap: isVerySmall ? 4 : isSmall ? 5 : 7,
    marginTop: isVerySmall ? 4 : isSmall ? 6 : 10,
    marginBottom: isVerySmall ? 8 : isSmall ? 10 : 12,
  },
  wrongTxt: {
    color: '#FFEB3B', textAlign: 'center',
    fontWeight: 'bold', marginTop: 6,
    fontSize: isVerySmall ? 12 : isSmall ? 13 : 14,
  },
  panel: {
    marginTop: isVerySmall ? 10 : isSmall ? 12 : 16,
    backgroundColor: '#1C2A4A',
    borderRadius: isVerySmall ? 16 : 20,
    paddingTop: isVerySmall ? 8 : 10,
    paddingHorizontal: H_PAD,
    paddingBottom: isVerySmall ? 10 : Platform.OS === 'ios' ? 18 : 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 8,
  },
  kbContainer: {
    backgroundColor: '#243050',
    borderRadius: isVerySmall ? 12 : 14,
    paddingVertical: isVerySmall ? 6 : 8,
    paddingHorizontal: isVerySmall ? 4 : 6,
    marginBottom: isVerySmall ? 8 : 10,
  },
  continueBtn: {
    backgroundColor: COLORS.accent, borderRadius: 30,
    paddingVertical: isVerySmall ? 10 : isSmall ? 11 : 13,
    alignItems: 'center',
  },
  continueTxt: {
    color: COLORS.white, fontWeight: 'bold',
    fontSize: isVerySmall ? 14 : isSmall ? 15 : 16,
  },
});

const kb = StyleSheet.create({
  wrap: { gap: isVerySmall ? 3 : isSmall ? 4 : 5 },
  row: { flexDirection: 'row', justifyContent: 'center', gap: GAP },
  key: {
    width: K_W, height: K_H,
    backgroundColor: '#354B7A', borderRadius: isVerySmall ? 4 : 5,
    alignItems: 'center', justifyContent: 'center',
    borderBottomWidth: 2, borderBottomColor: '#1E2E50',
  },
  delKey: {
    width: K_W + (isVerySmall ? 6 : 10),
    backgroundColor: '#8B2020', borderBottomColor: '#5C1515',
  },
  dimKey: { opacity: 0.28 },
  keyTxt: {
    color: '#E8EFFF', fontWeight: '700',
    fontSize: isVerySmall ? 11 : isSmall ? 12 : 13,
  },
  delTxt: {
    color: '#FFB3B3', fontWeight: '700',
    fontSize: isVerySmall ? 12 : isSmall ? 13 : 14,
  },
});
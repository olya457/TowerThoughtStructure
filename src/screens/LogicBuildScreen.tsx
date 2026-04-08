import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { ScreenWrapper } from '../components/common/ScreenWrapper';
import { LevelTower }    from '../components/logic/LevelTower';
import { AnswerOption }  from '../components/logic/AnswerOption';
import { useLogicBuild } from '../hooks/useLogicBuild';
import { COLORS }        from '../constants/colors';
import { LAYOUT }        from '../constants/layout';

const { height } = Dimensions.get('window');
const isSmall    = height < 680;

const TOP_OFFSET =
  Platform.OS === 'android'
    ? (StatusBar.currentHeight ?? 24) + 20
    : 20;

export default function LogicBuildScreen() {
  const {
    started,
    taskIndex,
    levelIndex,
    level,
    selected,
    finished,
    showLevelResult,
    levelPerfect,
    currentTask,
    totalLevels,
    handleStart,
    handleAnswer,
    handleRestart,
    handleNextLevel,
    handleBackToStart,
  } = useLogicBuild();

  if (finished) {
    return (
      <ScreenWrapper>
        <View style={styles.centeredPage}>
          <Text style={styles.headerTitle}>Logic Build</Text>
          <LevelTower level={5} large />
          <Text style={styles.resultTitle}>All Levels Complete!</Text>
          <Text style={styles.resultSub}>
            You've built the entire tower — amazing work!
          </Text>
          <TouchableOpacity style={styles.retryBtn} onPress={handleRestart} activeOpacity={0.85}>
            <Text style={styles.retryBtnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  if (showLevelResult) {
    return (
      <ScreenWrapper>
        <View style={styles.centeredPage}>
          <Text style={styles.headerTitle}>Logic Build</Text>
          <Text style={styles.levelBadge}>
            Level {levelIndex + 1} / {totalLevels}
          </Text>

          <LevelTower level={level} large />

          {levelPerfect ? (
            <>
              <Text style={styles.resultTitle}>Level Complete!</Text>
              <Text style={styles.resultSub}>
                All 6 answered correctly — great work!
              </Text>
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={handleNextLevel}
                activeOpacity={0.85}
              >
                <Text style={styles.nextBtnText}>Next Level →</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={[styles.resultTitle, { color: COLORS.error }]}>
                Not quite...
              </Text>
              <Text style={styles.resultSub}>
                Some answers were wrong. Try this level again!
              </Text>
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={handleRestart}
                activeOpacity={0.85}
              >
                <Text style={styles.retryBtnText}>Try Again</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScreenWrapper>
    );
  }

  if (!started) {
    return (
      <ScreenWrapper>
        <View style={styles.centeredPage}>
          <Text style={styles.headerTitle}>Logic Build</Text>
          <Text style={styles.levelBadge}>
            Level {levelIndex + 1} / {totalLevels}
          </Text>

          <LevelTower level={level} large />

          <Text style={styles.bigTitle}>Start Building</Text>

          <TouchableOpacity
            style={styles.beginBtn}
            onPress={handleStart}
            activeOpacity={0.85}
          >
            <View style={styles.beginInner}>
              <Text style={styles.beginText}>Begin Round</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>

      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={handleBackToStart}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Logic Build</Text>

        <View style={{ width: 30 }} />
      </View>

      <View style={styles.indicatorRow}>
        <Text style={styles.levelLabel}>Level {levelIndex + 1}</Text>
        <Text style={styles.taskCounter}>Task {taskIndex + 1} / 6</Text>
      </View>

      <View style={styles.dotsRow}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < taskIndex  && styles.dotDone,
              i === taskIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>{currentTask.question}</Text>

        <View style={styles.options}>
          {currentTask.options.map((opt, i) => (
            <AnswerOption
              key={i}
              label={opt}
              index={i}
              selected={selected}
              correct={currentTask.correct}
              onPress={handleAnswer}
            />
          ))}
        </View>

        <View style={styles.towerWrap}>
          <LevelTower level={level} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({

  centeredPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: TOP_OFFSET,
  },

  headerTitle: {
    fontSize: isSmall ? 18 : 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  levelBadge: {
    color: COLORS.accent,
    fontSize: isSmall ? 13 : 15,
    fontWeight: '600',
    marginBottom: isSmall ? 8 : 12,
  },
  bigTitle: {
    fontSize: isSmall ? 22 : 26,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginTop: isSmall ? 8 : 14,
    marginBottom: isSmall ? 14 : 20,
  },

  beginBtn: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 4,
    width: LAYOUT.width * 0.55,
  },
  beginInner: {
    backgroundColor: '#444',
    borderRadius: 10,
    paddingVertical: isSmall ? 10 : 14,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#555',
  },
  beginText: {
    color: COLORS.accent,
    fontWeight: 'bold',
    fontSize: isSmall ? 14 : 16,
  },

  resultTitle: {
    fontSize: isSmall ? 20 : 24,
    fontWeight: 'bold',
    color: COLORS.success,
    marginTop: isSmall ? 8 : 14,
    textAlign: 'center',
  },
  resultSub: {
    color: COLORS.white,
    fontSize: isSmall ? 13 : 15,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: isSmall ? 14 : 20,
    paddingHorizontal: 16,
  },
  nextBtn: {
    backgroundColor: COLORS.success,
    borderRadius: 30,
    paddingVertical: isSmall ? 12 : 15,
    paddingHorizontal: 44,
  },
  nextBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: isSmall ? 14 : 16,
  },
  retryBtn: {
    backgroundColor: COLORS.error,
    borderRadius: 30,
    paddingVertical: isSmall ? 12 : 15,
    paddingHorizontal: 44,
  },
  retryBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: isSmall ? 14 : 16,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: TOP_OFFSET,
    paddingBottom: 4,
  },
  icon: {
    fontSize: 26,
    color: COLORS.white,
  },

  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 4,
  },
  levelLabel: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: isSmall ? 13 : 15,
  },
  taskCounter: {
    color: COLORS.textMuted,
    fontSize: isSmall ? 12 : 14,
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 4,
  },
  dot: {
    width: isSmall ? 10 : 12,
    height: isSmall ? 10 : 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotDone: {
    backgroundColor: COLORS.success,
  },
  dotActive: {
    backgroundColor: COLORS.accent,
    width: isSmall ? 22 : 26,
    borderRadius: 6,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  question: {
    fontSize: isSmall ? 18 : 22,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginTop: isSmall ? 8 : 12,
    marginBottom: isSmall ? 10 : 14,
  },
  options: {
    gap: isSmall ? 8 : 10,
  },
  towerWrap: {
    marginTop: isSmall ? 10 : 16,
    alignItems: 'center',
  },
});
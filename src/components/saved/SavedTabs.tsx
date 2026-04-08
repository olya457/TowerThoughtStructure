import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SavedTab } from '../../types';
import { COLORS } from '../../constants/colors';

interface Props { tab: SavedTab; onChangeTab: (t: SavedTab) => void; }

export const SavedTabs: React.FC<Props> = ({ tab, onChangeTab }) => (
  <View style={styles.wrap}>
    {(['facts', 'stories'] as SavedTab[]).map(t => (
      <TouchableOpacity key={t} style={styles.tabBtn} onPress={() => onChangeTab(t)}>
        <Text style={[styles.text, tab === t && styles.active]}>
          {t === 'facts' ? 'Saved Facts' : 'Saved Stories'}
        </Text>
        {tab === t && <View style={styles.line} />}
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', justifyContent: 'center', gap: 32, marginBottom: 6, paddingHorizontal: 16 },
  tabBtn: { alignItems: 'center' },
  text: { color: COLORS.white, fontSize: 15, paddingBottom: 4 },
  active: { color: COLORS.accent, fontWeight: 'bold' },
  line: { height: 2, backgroundColor: COLORS.accent, width: '100%', borderRadius: 2 },
});
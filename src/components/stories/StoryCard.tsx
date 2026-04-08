import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Story } from '../../types';
import { COLORS } from '../../constants/colors';

interface Props {
  story: Story;
  isOpen: boolean;
  saved: boolean;
  onToggleOpen: (id: string) => void;
  onToggleSave: (story: Story) => void;
}

export const StoryCard: React.FC<Props> = ({ story, isOpen, saved, onToggleOpen, onToggleSave }) => (
  <View style={styles.card}>
    <TouchableOpacity style={styles.row} onPress={() => onToggleOpen(story.id)} activeOpacity={0.8}>
      <Text style={styles.title}>{story.title}</Text>
      <View style={styles.rowRight}>
        <TouchableOpacity onPress={() => onToggleSave(story)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={[styles.star, saved && { color: COLORS.accent }]}>★</Text>
        </TouchableOpacity>
        <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
      </View>
    </TouchableOpacity>
    {isOpen && <Text style={styles.body}>{story.body}</Text>}
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.cardBg, borderRadius: 12, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  title: { fontWeight: 'bold', color: COLORS.cardText, fontSize: 15, flex: 1 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  star: { fontSize: 22, color: '#ccc' },
  chevron: { fontSize: 14, color: '#888' },
  body: { color: COLORS.cardText, fontSize: 13, lineHeight: 20, paddingHorizontal: 14, paddingBottom: 14 },
});
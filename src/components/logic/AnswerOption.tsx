import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props {
  label: string;
  index: number;
  selected: number | null;
  correct: number;
  onPress: (idx: number) => void;
}

export const AnswerOption: React.FC<Props> = ({ label, index, selected, correct, onPress }) => {
  const getBg = (): string => {
    if (selected === null) return COLORS.accent;
    if (index === correct) return COLORS.success;
    if (index === selected) return COLORS.error;
    return COLORS.accent;
  };

  return (
    <TouchableOpacity
      style={[styles.option, { backgroundColor: getBg() }]}
      onPress={() => onPress(index)}
      activeOpacity={0.85}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: { borderRadius: 10, paddingVertical: 15, paddingHorizontal: 16 },
  text: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
});
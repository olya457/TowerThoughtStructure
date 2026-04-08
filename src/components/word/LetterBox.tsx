import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props {
  char: string;
  typed?: string;
}

export const LetterBox: React.FC<Props> = ({ char, typed }) => {
  const getBg = (): string => {
    if (!typed) return COLORS.letterBox;
    return typed === char ? COLORS.success : COLORS.error;
  };

  return (
    <View style={[styles.box, { backgroundColor: getBg() }]}>
      <Text style={styles.text}>{typed || '?'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 42,
    height: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontWeight: 'bold', fontSize: 18, color: COLORS.cardText },
});
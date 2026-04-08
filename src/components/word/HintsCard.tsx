import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props { hints: string[]; }

export const HintsCard: React.FC<Props> = ({ hints }) => (
  <View style={styles.box}>
    <Text style={styles.label}>Hints</Text>
    {hints.map((h, i) => <Text key={i} style={styles.hint}>• {h}</Text>)}
  </View>
);

const styles = StyleSheet.create({
  box: { backgroundColor: COLORS.overlayBlue, borderRadius: 14, padding: 16, marginTop: 16 },
  label: { color: COLORS.accent, fontWeight: 'bold', marginBottom: 8, fontSize: 15 },
  hint: { color: COLORS.white, marginBottom: 6, fontSize: 14 },
});
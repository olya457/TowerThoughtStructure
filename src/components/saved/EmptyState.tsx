import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

interface Props {
  title: string;
  sub: string;
  btnLabel: string;
  onPress: () => void;
}

export const EmptyState: React.FC<Props> = ({ title, sub, btnLabel, onPress }) => (
  <View style={styles.wrap}>
    <Image source={require('../../assets/img/saved_illustration.png')} style={styles.img} resizeMode="contain" />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.sub}>{sub}</Text>
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{btnLabel}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginTop: 30 },
  img: { width: LAYOUT.width * 0.62, height: LAYOUT.width * 0.48, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.accent, marginBottom: 6 },
  sub: { color: COLORS.white, marginBottom: 24 },
  btn: { backgroundColor: COLORS.accent, borderRadius: 30, paddingVertical: 15, paddingHorizontal: 40 },
  btnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
});
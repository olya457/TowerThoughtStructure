import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const IntroCard: React.FC = () => (
  <View style={styles.card}>
    <Image source={require('../../assets/img/stories_character.png')} style={styles.img} resizeMode="contain" />
    <View style={{ flex: 1 }}>
      <Text style={styles.from}>From the Builder</Text>
      <Text style={styles.text}>
        Every structure starts with small steps. Here are a few stories from experience — simple moments, real decisions, and lessons learned along the way.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: COLORS.overlayBlue,
    marginHorizontal: 16, borderRadius: 14, padding: 14,
    alignItems: 'center', marginBottom: 10,
  },
  img: { width: 64, height: 64, marginRight: 12 },
  from: { color: COLORS.accent, fontWeight: 'bold', fontSize: 13, marginBottom: 4 },
  text: { color: COLORS.white, fontSize: 12, lineHeight: 17 },
});
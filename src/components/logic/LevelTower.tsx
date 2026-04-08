import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { LAYOUT } from '../../constants/layout';

const LEVEL_IMAGES = [
  require('../../assets/img/level_1.png'),
  require('../../assets/img/level_2.png'),
  require('../../assets/img/level_3.png'),
  require('../../assets/img/level_4.png'),
  require('../../assets/img/level_5.png'),
  require('../../assets/img/level_6.png'),
];

interface Props { level: number; large?: boolean; }

export const LevelTower: React.FC<Props> = ({ level, large = false }) => (
  <Image
    source={LEVEL_IMAGES[Math.min(level, 5)]}
    style={large ? styles.large : styles.normal}
    resizeMode="contain"
  />
);

const styles = StyleSheet.create({
  large:  { width: LAYOUT.width * 0.65, height: LAYOUT.width * 0.65, alignSelf: 'center' },
  normal: { width: LAYOUT.width * 0.55, height: LAYOUT.width * 0.45, alignSelf: 'center', marginTop: 16 },
});
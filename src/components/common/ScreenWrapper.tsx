import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  bg?: string;
}

export const ScreenWrapper: React.FC<Props> = ({
  children, style, bg = COLORS.primary,
}) => (
  <SafeAreaView style={[styles.safe, { backgroundColor: bg }, style]}>
    <StatusBar barStyle="light-content" backgroundColor={bg} />
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
});
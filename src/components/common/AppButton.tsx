import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props {
  label: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const AppButton: React.FC<Props> = ({
  label, onPress, color = COLORS.accent,
  textColor = COLORS.white, style, textStyle, disabled = false,
}) => (
  <TouchableOpacity
    style={[styles.btn, { backgroundColor: color }, style]}
    onPress={onPress}
    activeOpacity={0.8}
    disabled={disabled}
  >
    <Text style={[styles.text, { color: textColor }, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: { borderRadius: 30, paddingVertical: 15, paddingHorizontal: 40, alignItems: 'center' },
  text: { fontWeight: 'bold', fontSize: 16 },
});
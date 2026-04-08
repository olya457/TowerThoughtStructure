import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { Fact } from '../../types';
import { COLORS } from '../../constants/colors';

interface Props {
  fact: Fact;
  saved: boolean;
  onToggleSave: (fact: Fact) => void;
}

export const FactCard: React.FC<Props> = ({ fact, saved, onToggleSave }) => {
  const handleShare = async () => {
    try { await Share.share({ message: `${fact.title}\n\n${fact.body}` }); } catch (e) {}
  };
  return (
    <View style={styles.card}>
      <Image source={require('../../assets/img/facts_illustration.png')} style={styles.img} resizeMode="contain" />
      <Text style={styles.title}>{fact.title}</Text>
      <Text style={styles.body}>{fact.body}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleShare} style={styles.actionBtn}>
          <Text style={styles.actionIcon}>↗</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onToggleSave(fact)} style={styles.actionBtn}>
          <Text style={[styles.actionIcon, saved && { color: COLORS.accent }]}>★</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg, borderRadius: 16, padding: 16,
    borderWidth: 2, borderColor: COLORS.cardBorder, borderStyle: 'dashed',
  },
  img: { width: '100%', height: 140, borderRadius: 12, marginBottom: 12 },
  title: { fontWeight: 'bold', fontSize: 15, color: COLORS.cardText, marginBottom: 8, textAlign: 'center' },
  body: { color: COLORS.cardText, fontSize: 13, lineHeight: 20 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 14, gap: 16 },
  actionBtn: { padding: 4 },
  actionIcon: { fontSize: 22, color: '#aaa' },
});
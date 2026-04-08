import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const RestartModal: React.FC<Props> = ({ visible, onConfirm, onCancel }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.close} onPress={onCancel}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Restart Level</Text>
        <Text style={styles.sub}>Your current progress will be reset</Text>
        <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.success }]} onPress={onConfirm}>
          <Text style={styles.btnText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.error, marginTop: 10 }]} onPress={onCancel}>
          <Text style={styles.btnText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: COLORS.modalOverlay, justifyContent: 'center', alignItems: 'center' },
  box: {
    backgroundColor: COLORS.modalBg, borderRadius: 16,
    padding: 28, width: LAYOUT.width * 0.78, alignItems: 'center',
    borderWidth: 2, borderColor: '#8B5A2B', borderStyle: 'dashed',
  },
  close: { position: 'absolute', top: 10, right: 14 },
  closeText: { color: COLORS.white, fontSize: 18 },
  title: { color: COLORS.accent, fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  sub: { color: COLORS.white, marginBottom: 20, textAlign: 'center' },
  btn: { borderRadius: 8, paddingVertical: 11, width: '80%', alignItems: 'center' },
  btnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
});
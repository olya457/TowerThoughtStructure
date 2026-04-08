import React from 'react';
import {
  Modal, View, Text, TouchableOpacity,
  StyleSheet, Dimensions, Share,
} from 'react-native';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

interface Props {
  visible:  boolean;
  onNext:   () => void;
  onExit:   () => void;
}

export const WordCompleteModal: React.FC<Props> = ({ visible, onNext, onExit }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={s.overlay}>
      <View style={s.box}>
        <Text style={s.title}>Word Complete!</Text>
        <Text style={s.sub}>The element is added to your build</Text>

        <TouchableOpacity style={[s.btn, { backgroundColor: COLORS.success }]} onPress={onNext} activeOpacity={0.85}>
          <Text style={s.btnTxt}>Next Word →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.btn, { backgroundColor: '#1565C0', marginTop: 10 }]}
          onPress={async () => {
            try {
              await Share.share({ message: 'I just built a word in Word Builder! 🏗️' });
            } catch {}
          }}
          activeOpacity={0.85}
        >
          <Text style={s.btnTxt}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.btn, { backgroundColor: COLORS.error, marginTop: 10 }]}
          onPress={onExit}
          activeOpacity={0.85}
        >
          <Text style={s.btnTxt}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    padding: 28,
    width: width * 0.82,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
  sub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    borderRadius: 30,
    paddingVertical: 13,
    width: '100%',
    alignItems: 'center',
  },
  btnTxt: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
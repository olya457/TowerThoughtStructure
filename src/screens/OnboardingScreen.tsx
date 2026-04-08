import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, Dimensions, SafeAreaView,
  StatusBar, Platform,
} from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');
const isSmall = height < 680;

interface Slide {
  img:   any;
  title: string;
  desc:  string;
  btn:   string;
}

const SLIDES: Slide[] = [
  {
    img:   require('../assets/img/onboard_1.png'),
    title: 'Build Through Answers',
    desc:  'Each correct choice adds a new part to your structure',
    btn:   'Start',
  },
  {
    img:   require('../assets/img/onboard_2.png'),
    title: 'See Your Progress',
    desc:  'Your structure grows step by step with each correct answer',
    btn:   'Continue',
  },
  {
    img:   require('../assets/img/onboard_3.png'),
    title: 'Construct Words',
    desc:  'Fill the blanks and complete parts of your build',
    btn:   'Next',
  },
  {
    img:   require('../assets/img/onboard_4.png'),
    title: 'Explore Facts',
    desc:  'Read detailed information connected to each topic',
    btn:   'Continue',
  },
  {
    img:   require('../assets/img/onboard_5.png'),
    title: 'Stories from the Builder',
    desc:  'Short insights and situations from experience',
    btn:   'Get Started',
  },
];

interface Props { onDone: () => void; }

export default function OnboardingScreen({ onDone }: Props) {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const next = () => {
    if (index < SLIDES.length - 1) setIndex(i => i + 1);
    else onDone();
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={s.container}>

        <View style={s.imgWrap}>
          <Image source={slide.img} style={s.img} resizeMode="contain" />
        </View>

        <View style={s.card}>
          <Text style={s.title}>{slide.title}</Text>
          <Text style={s.desc}>{slide.desc}</Text>
        </View>

        <TouchableOpacity style={s.btn} onPress={next} activeOpacity={0.85}>
          <Text style={s.btnText}>{slide.btn}</Text>
        </TouchableOpacity>

        <View style={s.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[s.dot, i === index && s.dotActive]}
            />
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
}

const IMG_H = isSmall ? height * 0.36 : height * 0.43;
const IMG_W = isSmall ? width  * 0.72 : width  * 0.78;

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: isSmall ? 12 : 20,
  },

  imgWrap: {
    width,
    height:          IMG_H,
    alignItems:      'center',
    justifyContent:  'center',
  },
  img: {
    width:  IMG_W,
    height: IMG_H,
  },

  card: {
    backgroundColor:  COLORS.overlayBlue,
    borderRadius:     18,
    paddingVertical:  isSmall ? 14 : 18,
    paddingHorizontal: 24,
    width:            width - 40,
    alignItems:       'center',
    justifyContent:   'center',
    minHeight:        isSmall ? height * 0.13 : height * 0.16,
    marginTop:        isSmall ? 8 : 12,
  },
  title: {
    color:        COLORS.accent,
    fontWeight:   'bold',
    fontSize:     isSmall ? 17 : 20,
    textAlign:    'center',
    marginBottom: isSmall ? 6 : 10,
  },
  desc: {
    color:      COLORS.white,
    fontSize:   isSmall ? 13 : 14,
    textAlign:  'center',
    lineHeight: isSmall ? 18 : 20,
  },

  btn: {
    backgroundColor:  COLORS.accent,
    borderRadius:     30,
    paddingVertical:  isSmall ? 12 : 15,
    paddingHorizontal: isSmall ? 50 : 70,
    marginTop:        isSmall ? 14 : 20,
  },
  btnText: {
    color:      COLORS.white,
    fontWeight: 'bold',
    fontSize:   isSmall ? 15 : 16,
  },

  dots: {
    flexDirection: 'row',
    marginTop:     isSmall ? 14 : 18,
    gap:           6,
  },
  dot: {
    width:        8,
    height:       8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: {
    backgroundColor: COLORS.white,
    width:           22,
    borderRadius:    4,
  },
});
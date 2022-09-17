// @flow

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

import { fs, wp, hp } from 'src/helpers';
import { colors, fonts } from 'src/variables';
import LinearGradient from 'react-native-linear-gradient';
import { img } from '../../../assets/img';

type Props = {
  setSelected(number): void,
  selected: number,
  number: number,
  answer: string,
};

const OnboardingQuestion = ({
  setSelected,
  selected,
  answer,
  number,
}: Props) => {
  const onPress = () => {
    setSelected(number, answer);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={colors.violetGradient}
        style={
          selected === number
            ? styles.answerWrapperSelected
            : styles.answerWrapper
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={styles.answerText}>{answer}</Text>
        {selected === number ? (
          <View style={styles.selected}>
            <Image
              style={styles.selectedImage}
              source={img.onboarding.selected}
            />
          </View>
        ) : (
          <View style={styles.circle} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default OnboardingQuestion;

const styles = StyleSheet.create({
  titleText: {
    marginBottom: hp('5%'),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.sfProSemibold,
    fontSize: fs(8.53),
    lineHeight: fs(10.67),
    color: colors.white,
  },
  answerWrapper: {
    opacity: 0.5,
    marginBottom: wp('4.2%'),
    backgroundColor: 'white',
    height: wp('17%'),
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerWrapperSelected: {
    marginBottom: wp('4.2%'),
    backgroundColor: 'white',
    height: wp('17%'),
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerText: {
    fontSize: fs(4.7),
    lineHeight: fs(6.4),
    marginLeft: 16,
    fontFamily: fonts.sfRegular,
    color: colors.white,
  },
  circle: {
    marginHorizontal: 18,
    alignSelf: 'center',
    width: 21,
    height: 21,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.white,
  },
  selected: {
    marginHorizontal: 18,
    width: 22,
    height: 22,
  },
  selectedImage: {
    width: 22,
    height: 22,
  },
});

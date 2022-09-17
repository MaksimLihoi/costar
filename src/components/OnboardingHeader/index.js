// @flow

import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { resources } from '../../shared';
import { wp } from 'src/helpers';
import { colors, fonts } from 'src/variables';
import { img } from '../../../assets/img';
import { useNavigation } from '@react-navigation/native';

type Props = {
  number: number,
};

const OnboardingHeader = ({ number }: Props) => {
  const navigation = useNavigation();
  const onBackPress = useCallback(() => {
    navigation.pop();
  });
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconContainer} onPress={onBackPress}>
        <Image source={img.onboarding.backArrow} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>
        {`${resources.t('ONBOARDING.STEP')} ${number} ${resources.t(
          'ONBOARDING.OF',
        )} 5`}
      </Text>
    </View>
  );
};

export default OnboardingHeader;

const styles = StyleSheet.create({
  header: {
    height: 56,
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  title: {
    fontFamily: fonts.sfProMedium,
    fontSize: 16,
    lineHeight: 19,
    color: colors.white,
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});

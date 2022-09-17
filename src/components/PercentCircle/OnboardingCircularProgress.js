// @flow

import React, { useCallback } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { resources } from '../../shared';
import { Animate } from 'src/helpers/Animations';
import progressCircle from 'assets/images/onboarding/progressCircle2.png';
import { colors, fonts } from 'src/variables';

type Props = {
  navigateToNextScreen(): void,
};

const OnboardingCircularProgress = ({ navigateToNextScreen }: Props) => {
  const onAnimationComplete = useCallback(() => {
    setTimeout(() => {
      navigateToNextScreen();
    }, 300);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Animated.Image
          style={{
            ...styles.progressCircleBackground,
            opacity: Animate({ duration: 400, useNativeDriver: true }),
          }}
          source={progressCircle}
          showWebviewLoader={false}
          resizeMode='contain'
        />
        <AnimatedCircularProgress
          size={226}
          width={12}
          fill={100}
          easing={Easing.ease}
          duration={5000}
          tintColor={colors.yellowGradient[0]}
          lineCap='round'
          style={styles.progressCircle}
          tintColorSecondary={colors.yellowGradient[1]}
          onAnimationComplete={onAnimationComplete}
        />
        <Animated.View
          style={{
            opacity: Animate({
              duration: 600,
              useNativeDriver: true,
            }),
          }}>
          <Text style={styles.text}>
            {resources.t('ONBOARDING.PERSONALIZING_THE_APP')}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default React.memo<Props>(OnboardingCircularProgress);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 60,
    alignItems: 'center',
  },
  progressCircleBackground: {
    width: 250,
    height: 250,
    position: 'absolute',
  },
  progressCircle: {
    position: 'absolute',
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: colors.white,
    fontFamily: fonts.sfProLight,
    textAlign: 'center',
  },
});

// @flow

import React, { useCallback, useEffect } from 'react';
import { Animated, ImageBackground, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as actions from 'src/store/actions';
import { resources } from 'src/shared/i18n/configuration';
import { Animate } from 'src/helpers/Animations';
import { img } from 'assets/img';
import purchasesInteractions from 'src/shared/purchases/interactions';
import type { PurchasesPackageType } from 'src/shared/purchases/types';
import BigButton from 'src/shared/components/BigButton';
import styles from './styles';
import { OnboardingStackNavigatorRouts } from '../../../variables/navigationRouts';
import { useNavigation } from '@react-navigation/native';
import { useAnalytics } from '../../../shared/analytics';
import { Events } from '../../../shared/analytics/events';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  setAvailablePurchases(Array<PurchasesPackageType>): void,
};

const WelcomeStep = ({ setAvailablePurchases }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const track = useAnalytics();

  useEffect(() => {
    setPurchaseStatus();
    setPurchases();
  }, []);

  const setPurchaseStatus = useCallback(async () => {
    await AsyncStorage.setItem('isActivePurchase', JSON.stringify(false));
  }, []);

  const setPurchases = useCallback(async () => {
    const { current } = await purchasesInteractions.getOfferings();

    if (current && current.availablePackages) {
      setAvailablePurchases(current.availablePackages);
    }
  }, []);

  const onStartPress = useCallback(() => {
    navigation.navigate(OnboardingStackNavigatorRouts.NameStep);
    track(Events.Onboarding.StartButtonClick);
  }, []);

  return (
    <ImageBackground
      source={img.onboarding.firstBg}
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}>
      <View style={styles.wrapper}>
        <View>
          <Animated.Image
            style={{
              ...styles.circle,
              opacity: Animate({
                duration: 600,
                delay: 100,
                useNativeDriver: true,
              }),
            }}
            source={img.onboarding.circleTopShadow}
            showWebviewLoader={false}
            resizeMode='contain'
          />
          <Animated.Image
            style={{
              ...styles.man,
              opacity: Animate({
                duration: 700,
                delay: 350,
                useNativeDriver: true,
              }),
            }}
            source={img.onboarding.firstScreenMan}
            showWebviewLoader={false}
            resizeMode='contain'
          />
          <Animated.Image
            style={{
              ...styles.seven,
              opacity: Animate({
                duration: 700,
                delay: 600,
                useNativeDriver: true,
              }),
            }}
            source={img.onboarding.seven}
            showWebviewLoader={false}
            resizeMode='contain'
          />
          <Animated.Image
            style={{
              ...styles.energy,
              opacity: Animate({
                duration: 700,
                delay: 400,
                useNativeDriver: true,
              }),
            }}
            source={img.onboarding.firstScreenEnergy}
            showWebviewLoader={false}
            resizeMode='contain'
          />
          <Animated.Image
            style={{
              ...styles.five,
              opacity: Animate({
                duration: 700,
                delay: 700,
                useNativeDriver: true,
              }),
            }}
            source={img.onboarding.five}
            showWebviewLoader={false}
            resizeMode='contain'
          />
          <Animated.Image
            style={{
              ...styles.head,
              opacity: Animate({
                duration: 700,
                delay: 800,
                useNativeDriver: true,
              }),
            }}
            source={img.onboarding.firstScreenHead}
            showWebviewLoader={false}
            resizeMode='contain'
          />
          <Animated.Image
            style={{
              ...styles.shadow,
              opacity: Animate({
                duration: 700,
                delay: 300,
                useNativeDriver: true,
              }),
            }}
            source={img.onboarding.shadow}
            showWebviewLoader={false}
            resizeMode='contain'
          />
        </View>
        <Text style={styles.titleText}>
          {resources.t('ONBOARDING.WELCOME.TITLE')}
        </Text>
        <Text style={styles.descriptionText}>
          {resources.t('ONBOARDING.WELCOME.DESCRIPTION')}
        </Text>
        <BigButton
          style={styles.buttonWrapper}
          onPress={onStartPress}
          buttonText={resources.t('ONBOARDING.BUTTONS.START')}
        />
      </View>
    </ImageBackground>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAvailablePurchases: (availablePurchases) =>
    dispatch(actions.setAvailablePurchases(availablePurchases)),
});

export default connect(
  null,
  mapDispatchToProps,
)(React.memo<Props>(WelcomeStep));

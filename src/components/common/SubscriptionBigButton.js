// @flow

import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors, fonts } from 'src/variables';
import { img } from 'assets/img';
import { wp } from 'src/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackNavigatorRouts } from '../../variables/navigationRouts';
import { useNavigation } from '@react-navigation/native';
import { useAnalytics } from '../../shared/analytics';
import { Events } from '../../shared/analytics/events';

type Props = {
  refresh(): Promise<void>,
  eventSource: string,
};

export const SubscriptionBigButton = (props) => {
  const track = useAnalytics();
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();

  const onPress = () => {
    const state = navigation.getState();
    const routeName = state.routes[state.index].name;

    const tab = routeName === 'daily' ? 'Daily numerology' : 'Personality';
    track(Events.TryFree, { tab });

    navigation.navigate(RootStackNavigatorRouts.SubscribeFirstVariant);
  };

  const onCloseBigButton = () => {
    setIsVisible(false);
    AsyncStorage.setItem('purchaseButtonVisibility', JSON.stringify(false));
  };

  const { buttonBottom } = props;
  return isVisible ? (
    <View style={[styles.container, { bottom: buttonBottom }]}>
      <LinearGradient
        colors={colors.yellowGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}>
        <TouchableOpacity
          onPress={onPress}
          style={styles.subscriptionBigButton}>
          <TouchableOpacity
            style={styles.subscriptionCircleCloseContainer}
            onPress={onCloseBigButton}>
            <Image
              source={img.iconClose}
              style={styles.subscriptionCircleClose}
            />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              resizeMode='contain'
              source={img.iconDiamond}
              style={styles.subscriptionCircleImage}
            />
          </View>
          <Text style={styles.subscriptionText}>3-Day Free Trial</Text>
          <Text style={styles.descriptionText}>Try it now!</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginHorizontal: 16,
    zIndex: 3,
    height: 64,
    width: wp('100%') - 32,
    shadowColor: colors.shadowGold,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  gradient: {
    borderRadius: 16,
  },
  subscriptionBigButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 16,
    right: 16,
  },
  subscriptionCircleImage: {
    width: 32,
    height: 32,
  },
  subscriptionCircleCloseContainer: {
    width: 24,
    height: 24,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    left: 16,
  },
  subscriptionCircleClose: {
    width: 14,
    height: 14,
  },
  descriptionText: {
    fontFamily: fonts.sfProMedium,
    fontSize: 12,
    lineHeight: 24,
    color: colors.white,
    marginBottom: 8,
  },
  subscriptionText: {
    fontFamily: fonts.sfProMedium,
    fontSize: 16,
    lineHeight: 24,
    color: colors.white,
    marginTop: 8,
  },
});

// @flow

import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, fonts } from 'src/variables';
import { img } from 'assets/img';
import { resources } from '../../shared';
import { RootStackNavigatorRouts } from '../../variables/navigationRouts';
import { Events } from '../../shared/analytics/events';
import { trackEvent } from '../../shared/analytics';
import { useNavigation } from '@react-navigation/native';

type State = {
  isVisible: boolean,
};

type Props = {
  refresh(): Promise<void>,
  eventSource: string,
};

const SubscriptionCircleButton = (props) => {
  const [isVisible, setState] = useState(true);
  const navigation = useNavigation();

  const onPress = () => {
    trackEvent(Events.TryFree.ButtonClick, { tab: 'Compatibility' });

    navigation.navigate(RootStackNavigatorRouts.SubscribeFirstVariant);
  };

  const onCloseCircleButton = async () => {
    setState(false);
  };

  return isVisible ? (
    <TouchableOpacity style={styles.subscriptionCircleButton} onPress={onPress}>
      <TouchableOpacity
        style={styles.subscriptionCircleCloseContainer}
        onPress={onCloseCircleButton}>
        <Image source={img.iconClose} style={styles.subscriptionCircleClose} />
      </TouchableOpacity>
      <Image
        resizeMode='contain'
        source={img.iconDiamond}
        style={styles.subscriptionCircleImage}
      />
      <Text style={styles.subscriptionCircleText}>
        {resources.t('SUBSCRIPTION.TRY_FREE')}
      </Text>
    </TouchableOpacity>
  ) : null;
};

export default SubscriptionCircleButton;

const styles = StyleSheet.create({
  subscriptionCircleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
    borderRadius: 50,
    right: 15,
    zIndex: 3,
    height: 80,
    width: 80,
    shadowColor: colors.shadowGold,
    backgroundColor: colors.gold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  subscriptionCircleImage: {
    width: 40,
    height: 40,
  },
  subscriptionCircleCloseContainer: {
    backgroundColor: colors.violet,
    borderRadius: 10,
    width: 20,
    height: 20,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 2,
    right: 2,
  },
  subscriptionCircleClose: {
    width: 10,
    height: 10,
  },
  subscriptionCircleText: {
    fontFamily: fonts.sfProMedium,
    fontSize: 12,
    lineHeight: 14,
    color: colors.white,
    marginTop: 3,
  },
});

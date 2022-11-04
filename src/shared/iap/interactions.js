// @flow

import { Alert } from 'react-native';
import RNIap from 'react-native-iap';
import { MATCHUP_SUBSCRIPTIONS } from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../../utils/logger';

const initConnection = async () => {
  try {
    const result = await RNIap.initConnection();
    return result;
  } catch (error) {
    logger.error(error);
  }
};

const getSubscriptions = async () => {
  try {
    const result = await RNIap.getSubscriptions([
      MATCHUP_SUBSCRIPTIONS.WEEK,
      MATCHUP_SUBSCRIPTIONS.WEEK_TRIAL,
      MATCHUP_SUBSCRIPTIONS.MONTH,
      MATCHUP_SUBSCRIPTIONS.MONTH_TRIAL,
      MATCHUP_SUBSCRIPTIONS.YEAR,
      MATCHUP_SUBSCRIPTIONS.YEAR2,
    ]);
    console.log(result);
    return result;
  } catch (err) {
    console.warn(err.code, err.message);
  }
};

const restorePurchase = async () => {
  try {
    const purchases = await RNIap.getAvailablePurchases();

    const restoredTitles = [];
    const isActiveSubscription = purchases.some(
      (purchase) =>
        purchase.productId === MATCHUP_SUBSCRIPTIONS.WEEK ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.WEEK_TRIAL ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.MONTH ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.MONTH_TRIAL ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.YEAR2 ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.YEAR,
    );
    if (isActiveSubscription) {
      await AsyncStorage.setItem('isActivePurchase', JSON.stringify(true));
      restoredTitles.push('Premium Version');
    }
    if (restoredTitles.length) {
      Alert.alert(
        'Restore is successful',
        `You successfully restored the following subscription: ${restoredTitles.join(
          ', ',
        )}`,
      );
    } else {
      Alert.alert('Restore failed', 'You have no subscriptions to restore');
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

const requestSubscription = async (sku: string) => {
  try {
    const result = await RNIap.requestPurchase(sku);
    console.log(result);
  } catch (error) {
    Alert.alert(error.message);
  }
};

const getAvailablePurchases = async () => {
  try {
    const purchases = await RNIap.getAvailablePurchases();
    const isActiveSubscription = purchases.some(
      (purchase) =>
        purchase.productId === MATCHUP_SUBSCRIPTIONS.WEEK ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.WEEK_TRIAL ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.MONTH ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.MONTH_TRIAL ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.YEAR2 ||
        purchase.productId === MATCHUP_SUBSCRIPTIONS.YEAR,
    );

    if (isActiveSubscription) {
      await AsyncStorage.setItem('isActivePurchase', JSON.stringify(true));
    } else {
      await AsyncStorage.setItem('isActivePurchase', JSON.stringify(false));
    }
  } catch (error) {
    logger.error(error);
  }
};

export default {
  initConnection,
  restorePurchase,
  getSubscriptions,
  requestSubscription,
  getAvailablePurchases,
};

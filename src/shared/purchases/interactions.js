// @flow

import { Alert } from 'react-native';
import Purchases from 'react-native-purchases';
import type { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actions from '../../store/actions';
import { REVENUECAT_PUBLIC_SDK_KEY } from './constants';
import type { PurchasesPackageType } from './types';
import logger from '../../utils/logger';

const setup = () => Purchases.setup(REVENUECAT_PUBLIC_SDK_KEY);

const setDebugLogsEnabled = () => Purchases.setDebugLogsEnabled(true);

const purchasePackage = async (purchase: PurchasesPackageType) => {
  const { purchaserInfo } = await Purchases.purchasePackage(purchase);
  if (
    purchaserInfo &&
    purchaserInfo.activeSubscriptions &&
    purchaserInfo.activeSubscriptions.length
  ) {
    await AsyncStorage.setItem('isActivePurchase', JSON.stringify(true));
    await AsyncStorage.setItem('isTrialAvailable', JSON.stringify(false));
  }
};

const restorePurchase = async () => {
  try {
    const restoredTitles = [];
    const restore = await Purchases.restoreTransactions();
    if (
      restore &&
      restore.activeSubscriptions &&
      restore.activeSubscriptions.length
    ) {
      await AsyncStorage.setItem('isActivePurchase', JSON.stringify(true));
      await AsyncStorage.setItem('isTrialAvailable', JSON.stringify(false));
      restoredTitles.push('Premium Version');
    }
    if (restoredTitles.length) {
      Alert.alert(
        'Restore is successful',
        `You successfully restored the following subscription: ${restoredTitles.join(
          ', ',
        )}`,
      );
      return true;
    } else {
      await getTrialStatus();
      Alert.alert('Nothing to restore');
      return false;
    }
  } catch (error) {
    Alert.alert('Restore failed', error.message);
  }
};

const getOfferings = () => Purchases.getOfferings();

const setAvailablePurchases = () => async (dispatch: Dispatch) => {
  try {
    const { current } = await getOfferings();
    if (current && current.availablePackages) {
      dispatch(actions.setAvailablePurchases(current.availablePackages));
    }
  } catch (error) {
    logger.error(error);
  }
};

const getPurchaserInfo = () => Purchases.getPurchaserInfo();

const getPurchaseStatus = async () => {
  try {
    const restore = await Purchases.restoreTransactions();
    const purchaserInfo = await Purchases.getPurchaserInfo();

    alert(JSON.stringify(purchaserInfo));

    if (
      purchaserInfo &&
      purchaserInfo.activeSubscriptions &&
      purchaserInfo.activeSubscriptions.length
    ) {
      await AsyncStorage.setItem('isActivePurchase', JSON.stringify(true));
      await AsyncStorage.setItem('isTrialAvailable', JSON.stringify(false));
    } else {
      await AsyncStorage.setItem('isActivePurchase', JSON.stringify(false));
    }

    if (
      restore &&
      restore.allPurchasedProductIdentifiers &&
      restore.allPurchasedProductIdentifiers.length > 0
    ) {
      await AsyncStorage.setItem('isTrialAvailable', JSON.stringify(false));
      alert(await AsyncStorage.getItem('isTrialAvailable'));
    } else {
      await AsyncStorage.setItem('isTrialAvailable', JSON.stringify(true));
    }
  } catch (error) {
    logger.error(error);
  }
};

const getTrialStatus = async () => {
  try {
    const transactions = await Purchases.restoreTransactions();
    if (
      transactions &&
      transactions.allPurchasedProductIdentifiers &&
      transactions.allPurchasedProductIdentifiers.length > 0
    ) {
      await AsyncStorage.setItem('isTrialAvailable', JSON.stringify(false));
    } else {
      await AsyncStorage.setItem('isTrialAvailable', JSON.stringify(true));
    }
  } catch (e) {
    logger.error(e);
  }
};

export default {
  setup,
  setDebugLogsEnabled,
  purchasePackage,
  restorePurchase,
  getOfferings,
  getPurchaserInfo,
  getPurchaseStatus,
  setAvailablePurchases,
  getTrialStatus,
};

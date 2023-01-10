import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackNavigatorRouts } from '../variables/navigationRouts';
import BottomTabNavigator from './BottomTabNavigator';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import Privacy from '../screens/Privacy';
import SubscribeFirstVariant from '../screens/Subscribe/SubscribeFirstVariant';
import Terms from '../screens/Terms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FAQ from '../screens/FAQ/FAQ';
import {
  setIsActivePurchase,
  setIsTrialAvailable,
  setIsTrialCompatibilityAvailable,
} from '../store/actions';
import { useDispatch } from 'react-redux';
import purchasesInteractions from '../shared/purchases/interactions';
import { AsyncStorageKeys } from '../variables/asyncStorageKeys';

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(null);
  const dispatch = useDispatch();

  const checkIfOnboardingComplete = async () => {
    const isComplete = await AsyncStorage.getItem(
      AsyncStorageKeys.IsSeenOnboarding,
    );
    setIsOnboardingComplete(!!isComplete);
  };

  useEffect(() => {
    checkIfOnboardingComplete();
  });

  const setPurchaseState = async () => {
    await purchasesInteractions.getPurchaseStatus();
    const isActivePurchase = JSON.parse(
      await AsyncStorage.getItem(AsyncStorageKeys.IsActivePurchase),
    );
    const isTrialAvailable = JSON.parse(
      await AsyncStorage.getItem(AsyncStorageKeys.IsTrialAvailable),
    );
    const isTrialCompatibilityAvailable = JSON.parse(
      await AsyncStorage.getItem(
        AsyncStorageKeys.IsTrialCompatibilityAvailable,
      ),
    );

    if (!isActivePurchase && isTrialCompatibilityAvailable === null) {
      await AsyncStorage.setItem(
        AsyncStorageKeys.IsTrialCompatibilityAvailable,
        JSON.stringify(true),
      );
      dispatch(setIsTrialCompatibilityAvailable(true));
    }
    dispatch(setIsActivePurchase(isActivePurchase));
    dispatch(setIsTrialAvailable(isTrialAvailable));
  };

  useEffect(() => {
    setPurchaseState();
  }, []);

  return isOnboardingComplete !== null ? (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboardingComplete && (
        <RootStack.Screen
          name={RootStackNavigatorRouts.Onboarding}
          component={OnboardingStackNavigator}
        />
      )}
      <RootStack.Screen
        name={RootStackNavigatorRouts.TabNavigator}
        component={BottomTabNavigator}
      />
      <RootStack.Screen
        name={RootStackNavigatorRouts.Privacy}
        component={Privacy}
      />
      <RootStack.Screen name={RootStackNavigatorRouts.FAQ} component={FAQ} />
      {/*<RootStack.Screen
        name={RootStackNavigatorRouts.Feedback}
        component={Feedback}
      />*/}
      <RootStack.Screen
        name={RootStackNavigatorRouts.SubscribeFirstVariant}
        component={SubscribeFirstVariant}
      />
      {/*<RootStack.Screen
        name={RootStackNavigatorRouts.Gift}
        component={Sample}
      />*/}
      <RootStack.Screen
        name={RootStackNavigatorRouts.Terms}
        component={Terms}
      />
    </RootStack.Navigator>
  ) : null;
};

export default RootStackNavigator;

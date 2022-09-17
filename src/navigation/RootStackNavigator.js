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

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(null);

  const checkIfOnboardingComplete = async () => {
    const isComplete = await AsyncStorage.getItem('isSeenOnboarding');
    setIsOnboardingComplete(!!isComplete);
  };

  useEffect(() => {
    checkIfOnboardingComplete();
  });

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

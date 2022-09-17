import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackNavigatorRouts } from '../variables/navigationRouts';
import NameStep from '../screens/Onboarding/NameStep';
import BirthdayStep from '../screens/Onboarding/BirthdayStep';
import ProgressStep from '../screens/Onboarding/ProgressStep';
import QuestionsStep from '../screens/Onboarding/QuestionsStep';
import WelcomeStep from '../screens/Onboarding/WelcomeStep';

const OnboardingStack = createStackNavigator();

const OnboardingStackNavigator = () => {
  return (
    <OnboardingStack.Navigator
      initialRouteName={OnboardingStackNavigatorRouts.WelcomeStep}
      screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen
        name={OnboardingStackNavigatorRouts.WelcomeStep}
        component={WelcomeStep}
      />
      <OnboardingStack.Screen
        name={OnboardingStackNavigatorRouts.NameStep}
        component={NameStep}
      />
      <OnboardingStack.Screen
        name={OnboardingStackNavigatorRouts.BirthdayStep}
        component={BirthdayStep}
      />
      <OnboardingStack.Screen
        name={OnboardingStackNavigatorRouts.ProgressStep}
        component={ProgressStep}
      />
      <OnboardingStack.Screen
        name={OnboardingStackNavigatorRouts.QuestionsStep}
        component={QuestionsStep}
      />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingStackNavigator;

import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from 'src/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import purchasesInteractions from './src/shared/purchases/interactions';
import { AMPLITUDE_API_KEY } from './src/shared/analytics';
import { init } from '@amplitude/analytics-react-native';
import { Settings } from 'react-native-fbsdk-next';
import appsFlyer from 'react-native-appsflyer';
import { activateAdapty, adapty } from 'react-native-adapty';

const persistor = persistStore(store);

appsFlyer.initSdk(
  {
    devKey: '8hJmMVGMEpUcMmUKkhwVpU',
    isDebug: false,
    appId: '1464015994',
  },
  (result) => {
    console.log('result', result);
  },
  (error) => {
    console.error('error', error);
  },
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    init(AMPLITUDE_API_KEY);
  }, []);

  useEffect(() => {
    activateAdapty({ sdkKey: 'public_live_fabSVYF8.r7jC2ljNCMWNTyjOy0RR' });
  }, []);

  useEffect(() => {
    appsFlyer.onInstallConversionData((installData) => {
      try {
        const networkUserId = appsFlyer.getAppsFlyerUID();
        adapty.updateAttribution(networkUserId, installData, 'AppsFlyer');
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  useEffect(() => {
    Settings.setAdvertiserTrackingEnabled(true);
  }, []);

  purchasesInteractions.setup();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootStackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

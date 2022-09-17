// @flow

import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Terms = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, marginTop: insets.top }}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://match-up.me/Home/TermsOfService' }}
      />
    </View>
  );
};

export default React.memo<any>(Terms);

// @flow

import React, { PureComponent } from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { img } from 'assets/img';
import CircularProgress from 'src/components/PercentCircle/OnboardingCircularProgress';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackNavigatorRouts } from '../../../variables/navigationRouts';
import { trackEvent } from '../../../shared/analytics';
import { Events } from '../../../shared/analytics/events';

class ProgressStep extends PureComponent {
  seenOnboarding = async () => {
    try {
      await AsyncStorage.setItem('isSeenOnboarding', JSON.stringify(true));
    } catch (error) {
      console.warn(error);
    }
  };

  componentDidMount() {
    trackEvent(Events.Onboarding.PersonalizationScreenShowed);
  }

  navigateToSubscribeScreenWithoutOnboarding = async () => {
    const { navigation } = this.props;
    this.seenOnboarding();

    navigation.navigate(RootStackNavigatorRouts.SubscribeFirstVariant, {
      screen: 'Onboarding',
    });
  };

  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <ImageBackground
            source={img.onboarding.firstBg}
            style={[
              styles.container,
              {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
              },
            ]}>
            <CircularProgress
              navigateToNextScreen={
                this.navigateToSubscribeScreenWithoutOnboarding
              }
            />
            {/* <BigButton
                            style={styles.buttonWrapper}
                            onPress={this.navigateToSubscribeScreenWithoutOnboarding}
                            buttonText={I18n.t('ONBOARDING.BUTTONS.START')}
                        /> */}
          </ImageBackground>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

export default connect()(ProgressStep);

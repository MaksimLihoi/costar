// @flow

import React, { PureComponent } from 'react';
import { Animated, ImageBackground, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import type { Dispatch as ReduxDispatch } from 'redux';

import { resources } from 'src/shared/i18n/configuration';
import { img } from 'assets/img';
import BigButton from 'src/shared/components/BigButton';
import OnboardingHeader from 'src/components/OnboardingHeader';
import { Animate } from 'src/helpers/Animations';
import {
  DeviceSize,
  getDeviceSize,
  getFormattedDate,
  getJoinedDate,
} from 'src/helpers';
import {
  getPrognosisToday,
  getPrognosisTomorrow,
  getPrognosisYesterday,
  getSingleCompatibility,
  getSkills,
} from 'src/store/actions';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingStackNavigatorRouts } from '../../../variables/navigationRouts';
import DatePicker from 'react-native-date-picker';
import { colors } from '../../../variables';
import { trackEvent } from '../../../shared/analytics';
import { Events } from '../../../shared/analytics/events';
import { AsyncStorageKeys } from '../../../variables/asyncStorageKeys';

type Props = {
  dispatch: ReduxDispatch,
};

type State = {
  date: Date,
  isAnimate: boolean,
};

class BirthdayStep extends PureComponent<Props, State> {
  state = {
    date: new Date(),
    isAnimate: true,
  };

  setIsAnimate = () => {
    this.setState({ isAnimate: false });
  };

  setDate = (date) => {
    this.setState({ date });
  };

  onButtonPress = async () => {
    const { date } = this.state;
    const { dispatch, navigation } = this.props;
    const formattedDate = getFormattedDate(date);
    await AsyncStorage.setItem(AsyncStorageKeys.UserBirthDate, formattedDate);
    await AsyncStorage.setItem(
      AsyncStorageKeys.UserBirthDateDaily,
      formattedDate,
    );
    const dateParts = formattedDate.split(':');
    const userBirthDate = getJoinedDate(dateParts);
    if (userBirthDate) {
      dispatch(getSingleCompatibility(userBirthDate));
      dispatch(getSkills(userBirthDate));
      dispatch(getPrognosisToday(userBirthDate));
      dispatch(getPrognosisYesterday(userBirthDate));
      dispatch(getPrognosisTomorrow(userBirthDate));
    }
    navigation.navigate(OnboardingStackNavigatorRouts.QuestionsStep, {
      number: 0,
    });
    trackEvent(Events.Onboarding.BirthdayNextButtonClick);
  };

  render() {
    const { date, isAnimate } = this.state;
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
            <OnboardingHeader number={2} />
            <View style={styles.content}>
              <View>
                <Text style={styles.titleText}>
                  {resources.t('ONBOARDING.BIRTHDAY.TITLE')}
                </Text>
                <Text style={styles.descriptionText}>
                  {resources.t('ONBOARDING.BIRTHDAY.DESCRIPTION')}
                </Text>
                {getDeviceSize() >= DeviceSize.normal ? (
                  <View style={styles.imageWrapper}>
                    <Animated.Image
                      source={img.onboarding.circleTopShadow}
                      style={{
                        ...styles.circle,
                        opacity: isAnimate
                          ? Animate({
                              duration: 600,
                              delay: 200,
                              useNativeDriver: true,
                            })
                          : 1,
                      }}
                      resizeMode='contain'
                    />
                    <Animated.Image
                      source={img.onboarding.baby}
                      style={{
                        ...styles.baby,
                        opacity: isAnimate
                          ? Animate({
                              duration: 900,
                              delay: 400,
                              useNativeDriver: true,
                            })
                          : 1,
                      }}
                      resizeMode='contain'
                    />
                    <Animated.Image
                      source={img.onboarding.one}
                      style={{
                        ...styles.one,
                        opacity: isAnimate
                          ? Animate({
                              duration: 600,
                              delay: 400,
                              useNativeDriver: true,
                            })
                          : 1,
                      }}
                      resizeMode='contain'
                    />
                    <Animated.Image
                      source={img.onboarding.six}
                      style={{
                        ...styles.six,
                        opacity: isAnimate
                          ? Animate({
                              duration: 600,
                              delay: 500,
                              useNativeDriver: true,
                            })
                          : 1,
                      }}
                      resizeMode='contain'
                    />
                    <Animated.Image
                      source={img.onboarding.zero}
                      style={{
                        ...styles.zero,
                        opacity: isAnimate
                          ? Animate(
                              {
                                duration: 600,
                                delay: 700,
                                useNativeDriver: true,
                              },
                              this.setIsAnimate,
                            )
                          : 1,
                      }}
                      resizeMode='contain'
                    />
                    <Animated.Image
                      source={img.onboarding.shadow}
                      style={{
                        ...styles.shadow,
                        opacity: isAnimate
                          ? Animate({
                              duration: 600,
                              delay: 400,
                              useNativeDriver: true,
                            })
                          : 1,
                      }}
                      resizeMode='contain'
                    />
                  </View>
                ) : null}
              </View>
              <View>
                <View style={styles.calendarWrapper}>
                  <DatePicker
                    mode='date'
                    maximumDate={new Date()}
                    textColor={colors.white}
                    date={date}
                    onDateChange={this.setDate}
                  />
                </View>
                <BigButton
                  style={styles.buttonWrapper}
                  onPress={this.onButtonPress}
                  buttonText={resources.t('ONBOARDING.BUTTONS.NEXT')}
                  withArrowIcon
                />
              </View>
            </View>
          </ImageBackground>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

export default connect()(BirthdayStep);

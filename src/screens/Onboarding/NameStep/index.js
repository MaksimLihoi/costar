// @flow

import React, { useState } from 'react';
import {
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import type { Dispatch as ReduxDispatch } from 'redux';

import { resources } from 'src/shared/i18n/configuration';
import { Animate } from 'src/helpers/Animations';
import { img } from 'assets/img';
import BigButton from 'src/shared/components/BigButton';
import OnboardingHeader from 'src/components/OnboardingHeader';
import { colors } from 'src/variables';
import { setUserName } from 'src/store/actions';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingStackNavigatorRouts } from '../../../variables/navigationRouts';
import { useNavigation } from '@react-navigation/native';
import { useAnalytics } from '../../../shared/analytics';
import { Events } from '../../../shared/analytics/events';

const { State: TextInputState } = TextInput;

type Props = {
  dispatch: ReduxDispatch,
};

type State = {
  value: string,
  shift: Object,
  isAnimate: boolean,
  placeholder: string,
};

const NameStep = (props) => {
  const textInput = React.createRef();
  const navigation = useNavigation();
  const track = useAnalytics();

  const [state, setState] = useState({
    value: '',
    shift: new Animated.Value(0),
    isAnimate: true,
    placeholder: resources.t('ONBOARDING.PLACEHOLDER'),
  });

  const onChangeText = (value) => {
    setState({ ...state, value });
  };

  const setIsAnimate = () => {
    setState({ ...state, isAnimate: false });
  };

  const onFocus = () => {
    setState({ ...state, placeholder: '' });
    track(Events.Onboarding.NameInputClick);
  };

  const onBlur = () => {
    setState({ ...state, placeholder: resources.t('ONBOARDING.PLACEHOLDER') });
  };

  const onButtonPress = async () => {
    const { dispatch } = props;
    const { value } = state;
    const userName = value.trim() || 'Name';
    textInput.current.blur();
    await AsyncStorage.setItem('name', userName);
    dispatch(setUserName(userName));
    navigation.navigate(OnboardingStackNavigatorRouts.BirthdayStep);
    track(Events.Onboarding.NameNextButtonClick);
  };

  const { value, isAnimate, placeholder } = state;
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
          <OnboardingHeader number={1} />
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.titleText}>
                {resources.t('ONBOARDING.NAME.TITLE')}
              </Text>
              <Text style={styles.descriptionText}>
                {resources.t('ONBOARDING.NAME.DESCRIPTION')}
              </Text>
              <View style={styles.imageWrapper}>
                <Animated.Image
                  style={{
                    ...styles.circle,
                    opacity: isAnimate
                      ? Animate({
                          duration: 600,
                          delay: 100,
                          useNativeDriver: true,
                        })
                      : 1,
                  }}
                  source={img.onboarding.circleTopShadow}
                  showWebviewLoader={false}
                  resizeMode='contain'
                />
                <Animated.Image
                  style={{
                    ...styles.man,
                    opacity: isAnimate
                      ? Animate({
                          duration: 700,
                          delay: 350,
                          useNativeDriver: true,
                        })
                      : 1,
                  }}
                  source={img.onboarding.firstScreenMan}
                  showWebviewLoader={false}
                  resizeMode='contain'
                />
                <Animated.Image
                  style={{
                    ...styles.seven,
                    opacity: isAnimate
                      ? Animate({
                          duration: 700,
                          delay: 600,
                          useNativeDriver: true,
                        })
                      : 1,
                  }}
                  source={img.onboarding.seven}
                  showWebviewLoader={false}
                  resizeMode='contain'
                />
                <Animated.Image
                  style={{
                    ...styles.energy,
                    opacity: isAnimate
                      ? Animate({
                          duration: 700,
                          delay: 400,
                          useNativeDriver: true,
                        })
                      : 1,
                  }}
                  source={img.onboarding.firstScreenEnergy}
                  showWebviewLoader={false}
                  resizeMode='contain'
                />
                <Animated.Image
                  style={{
                    ...styles.five,
                    opacity: isAnimate
                      ? Animate({
                          duration: 700,
                          delay: 700,
                          useNativeDriver: true,
                        })
                      : 1,
                  }}
                  source={img.onboarding.five}
                  showWebviewLoader={false}
                  resizeMode='contain'
                />
                <Animated.Image
                  style={{
                    ...styles.head,
                    opacity: isAnimate
                      ? Animate(
                          {
                            duration: 700,
                            delay: 800,
                            useNativeDriver: true,
                          },
                          setIsAnimate,
                        )
                      : 1,
                  }}
                  source={img.onboarding.firstScreenHead}
                  showWebviewLoader={false}
                  resizeMode='contain'
                />
                <Animated.Image
                  style={{
                    ...styles.shadow,
                    opacity: isAnimate
                      ? Animate({
                          duration: 700,
                          delay: 300,
                          useNativeDriver: true,
                        })
                      : 1,
                  }}
                  source={img.onboarding.shadow}
                  showWebviewLoader={false}
                  resizeMode='contain'
                />
              </View>
            </View>
            <KeyboardAvoidingView
              keyboardVerticalOffset={100}
              behavior={'position'}>
              <LinearGradient
                colors={colors.violetGradient}
                style={styles.inputWrapper}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <TextInput
                  ref={textInput}
                  style={styles.inputStyle}
                  onChangeText={onChangeText}
                  value={value}
                  placeholder={placeholder}
                  selectionColor={colors.white}
                  placeholderTextColor={colors.gray}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </LinearGradient>
              <BigButton
                style={styles.buttonWrapper}
                onPress={onButtonPress}
                buttonText={resources.t('ONBOARDING.BUTTONS.NEXT')}
                withArrowIcon
              />
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

export default connect()(NameStep);

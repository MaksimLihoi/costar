// @flow

import React, { PureComponent } from 'react';
import { Image, ImageBackground, ScrollView, View } from 'react-native';

import { connect } from 'react-redux';
import { ScrollIntoView, wrapScrollView } from 'react-native-scroll-into-view';
import * as StoreReview from 'react-native-store-review';
import SwitchSelector from 'react-native-switch-selector';

import Header from 'src/components/Header';
import { FixedButton } from 'src/components/common/FixedButton';
import { getJoinedDate } from 'src/helpers';
import purchasesInteractions from 'src/shared/purchases/interactions';
import { img } from 'assets/img';

import { Psychomatrix, Skills } from 'src/components';
import {
  getFAQ,
  getFeedbackLinks,
  getSingleCompatibility,
  getSkills,
  setAvailablePurchases,
} from 'src/store/actions';
import { colors } from 'src/variables';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { resources } from '../../shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackNavigatorRouts } from '../../variables/navigationRouts';
import { Events } from '../../shared/analytics/events';
import { trackEvent } from '../../shared/analytics';
import logger from '../../utils/logger';

type State = {
  userBirthDateParts: Array<string>,
  shouldShowFixedButton: boolean,
  section: string,
  purchaseButtonVisible: boolean,
};

type Props = {
  isActivePurchase: boolean,
  isFetching: boolean,
  singleCompatibility: Object,
  skills: Object,
  isFreeTrialAvailable: boolean,
};

const options = [
  {
    label: resources.t('PERSONALITY.SKILLS'),
    value: 'skills',
  },
  {
    label: resources.t('PERSONALITY.PSYCHOMATRIX'),
    value: 'psychomatrix',
  },
];

const EventOptions = {
  skills: Events.Personality.SkillsButtonClick,
  psychomatrix: Events.Personality.PsychomatrixButtonClick,
};

const CustomScrollView = wrapScrollView(ScrollView);

class SingleMatchup extends PureComponent<Props, State> {
  state = {
    userBirthDateParts: [],
    shouldShowFixedButton: false,
    section: 'skills',
    purchaseButtonVisible: false,
    buttonBottom: 20,
    scrollY: 0,
  };

  scrollView: ScrollView;

  matrixRef = React.createRef<any>();

  scrollIntoViewOptions = {
    align: 'top',
    insets: {
      top: 0,
    },
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const userBirthDate = await AsyncStorage.getItem('userBirthDate');
    const userBirthDateParts = userBirthDate.split(':');
    this.setState({
      userBirthDateParts,
    });
    const date = getJoinedDate(userBirthDateParts);
    if (date) {
      dispatch(getSkills(date));
    }
    dispatch(getFeedbackLinks());
    await this.getPurchaseStatus();
    const { current } = await purchasesInteractions.getOfferings();
    if (current && current.availablePackages) {
      dispatch(setAvailablePurchases(current.availablePackages));
    }

    await this.setPermissionAppStore();

    const { navigation } = this.props;
    navigation.addListener('focus', this.onDidFocus);
  }

  componentWillUnmount() {
    const { navigation } = this.props;
    navigation.removeListener('focus', this.onDidFocus);
  }

  onDidFocus = async () => {
    AsyncStorage.getItem('purchaseButtonVisibility').then((value) => {
      this.setState({
        purchaseButtonVisible: JSON.parse(value) !== false,
      });
    });
  };

  setPermissionAppStore = () => {
    if (StoreReview.isAvailable) {
      StoreReview.requestReview();
    }
  };

  onDateChange = async (userBirthDate) => {
    const { dispatch } = this.props;
    await AsyncStorage.setItem('userBirthDate', userBirthDate);
    const userBirthDateParts = userBirthDate.split(':');
    this.setState({ userBirthDateParts });
    const date = getJoinedDate(userBirthDateParts);
    if (date) {
      dispatch(getSkills(date));
      dispatch(getSingleCompatibility(date));
    }
    this.matrixRef.current.scrollIntoView();
  };

  getPurchaseStatus = async () => {
    try {
    } catch (error) {
      logger.error(error);
    }
  };

  onQuestionPress = () => {
    const { navigation, dispatch } = this.props;
    dispatch(getFAQ());
    navigation.navigate(RootStackNavigatorRouts.FAQ);
  };

  onScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y >= 400) {
      this.setState({ shouldShowFixedButton: true });
    } else {
      this.setState({ shouldShowFixedButton: false });
    }
    const buttonY = this.state.buttonBottom;
    const prevY = this.state.scrollY;
    const y = buttonY + nativeEvent.contentOffset.y - prevY;
    if (y <= 20 && y >= -80) {
      this.setState({
        buttonBottom: y,
        scrollY: nativeEvent.contentOffset.y,
      });
    } else {
      this.setState({ scrollY: nativeEvent.contentOffset.y });
    }
  };

  onSwitch = (value) => {
    trackEvent(EventOptions[value]);
    this.setState({ section: value });
  };

  //TODO:: Logic for fetching and navigating to subscribe button
  /*getSubscriptionButtonComponent = (
    isActivePurchase,
    purchaseButtonVisible,
    buttonBottom,
  ) => {
    const subscribeButton = getToSubscribeButton();

    if (subscribeButton === 'rectangle') {
      return (
        !isActivePurchase && (
          <SubscriptionBigButton
            buttonBottom={buttonBottom}
            refresh={this.getPurchaseStatus}
          />
        )
      );
    }
    if (subscribeButton === 'circle') {
      return (
        !isActivePurchase &&
        purchaseButtonVisible && (
          <SubscriptionCircleButton refresh={this.getPurchaseStatus} />
        )
      );
    }

    switch (subscribeButton) {
      case 'circle':
        return (
          !isActivePurchase &&
          purchaseButtonVisible && (
            <SubscriptionCircleButton refresh={this.getPurchaseStatus} />
          )
        );
      case 'rectangle':
        return (
          !isActivePurchase &&
          purchaseButtonVisible && (
            <SubscriptionBigButton
              buttonBottom={buttonBottom}
              refresh={this.getPurchaseStatus}
            />
          )
        );
      default:
        return null;
    }
  };*/

  render() {
    const {
      userBirthDateParts,
      shouldShowFixedButton,
      section,
      purchaseButtonVisible,
      buttonBottom,
    } = this.state;
    const {
      singleCompatibility,
      skills,
      isFetching,
      isActivePurchase,
      isFreeTrialAvailable,
    } = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground source={img.gradient} style={styles.background}>
          <View style={styles.viewContainer}>
            {!purchaseButtonVisible && (
              <FixedButton
                shouldShowFixedButton={shouldShowFixedButton}
                onPress={() => this.matrixRef.current.scrollIntoView()}
              />
            )}
            {/* {this.getSubscriptionButtonComponent(
                            isActivePurchase,
                            purchaseButtonVisible,
                            buttonBottom,
                        )} */}
            {/* {!isActivePurchase && purchaseButtonVisible && (
                            <SubscriptionCircleButton
                                refresh={this.getPurchaseStatus}
                            />
                        )} */}
            {/*{!isActivePurchase && isFreeTrialAvailable && (
              <SubscriptionBigButton
                buttonBottom={buttonBottom}
                refresh={this.getPurchaseStatus}
                // eventSource={
                //     this.props.navigation.state.routeName
                // }
              />
            )}*/}
            <CustomScrollView
              ref={(ref) => {
                this.scrollView = ref;
              }}
              onScroll={this.onScroll}>
              <View style={styles.contentContainer}>
                <Header
                  title={resources.t('PERSONALITY.SCREEN_TITLE')}
                  onQuestionPress={this.onQuestionPress}
                  userBirthDateParts={userBirthDateParts}
                  onDateChange={this.onDateChange}
                  typeDatePicker='single'
                />
                <ScrollIntoView
                  ref={this.matrixRef}
                  onMount={false}
                  scrollIntoViewOptions={this.scrollIntoViewOptions}>
                  <LinearGradient
                    colors={colors.violetGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.switchContainer}>
                    <Image
                      source={img.main.switcherBackground}
                      style={styles.switcherBackground}
                    />
                    <SwitchSelector
                      options={options}
                      style={styles.switchButtonsContainer}
                      height={28}
                      backgroundColor='transparent'
                      borderRadius={7}
                      initial={0}
                      buttonMargin={7}
                      textStyle={styles.switchText}
                      selectedTextStyle={styles.switchSelectedText}
                      buttonColor={colors.darkViolet}
                      onPress={this.onSwitch}
                    />
                  </LinearGradient>
                  {section === 'skills' ? (
                    <Skills
                      isFetching={isFetching}
                      data={skills}
                      isActivePurchase={isActivePurchase}
                      refresh={this.getPurchaseStatus}
                    />
                  ) : (
                    <Psychomatrix
                      isFetching={isFetching}
                      data={singleCompatibility}
                      isActivePurchase={isActivePurchase}
                      refresh={this.getPurchaseStatus}
                    />
                  )}
                </ScrollIntoView>
              </View>
            </CustomScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  singleCompatibility: state.singleCompatibility,
  skills: state.skills,
  isFetching: state.fetching,
  isActivePurchase: state.isActivePurchase,
  isFreeTrialAvailable: state.isFreeTrialAvailable,
  state,
});

export default connect(mapStateToProps, null)(SingleMatchup);

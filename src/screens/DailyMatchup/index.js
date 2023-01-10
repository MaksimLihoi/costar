// @flow

import React, { PureComponent } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';

import { connect } from 'react-redux';
import { ScrollIntoView, wrapScrollView } from 'react-native-scroll-into-view';
import SwitchSelector from 'react-native-switch-selector';

import { FixedButton, Header, Prognosis } from '../../components';
import { resources } from '../../shared';
import { getJoinedDate } from '../../helpers';
import { img } from '../../../assets/img';

import {
  getFAQ,
  getFeedbackLinks,
  getPrognosisToday,
  getPrognosisTomorrow,
  getPrognosisYesterday,
} from '../../store/actions';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContext } from '@react-navigation/native';
import { RootStackNavigatorRouts } from '../../variables/navigationRouts';
import { trackEvent } from '../../shared/analytics';
import { Events } from '../../shared/analytics/events';
import logger from '../../utils/logger';
import { AsyncStorageKeys } from '../../variables/asyncStorageKeys';

type State = {
  userBirthDateParts: Array<string>,
  shouldShowFixedButton: boolean,
  section: string,
  purchaseButtonVisible: boolean,
};

type Props = {
  isFetching: boolean,
  prognosisTomorrow: Object,
  prognosisYesterday: Object,
  prognosisToday: Object,
  isActivePurchase: boolean,
  isTrialAvailable: boolean,
};

const options = [
  {
    label: resources.t('DAILY_NUMEROLOGY.YESTERDAY'),
    value: 'yesterday',
  },
  {
    label: resources.t('DAILY_NUMEROLOGY.TODAY'),
    value: 'today',
  },
  {
    label: resources.t('DAILY_NUMEROLOGY.TOMORROW'),
    value: 'tomorrow',
  },
];

const DateEvent = {
  yesterday: Events.DailyNumerology.YesterdayButtonClick,
  today: Events.DailyNumerology.TodayButtonClick,
  tomorrow: Events.DailyNumerology.TomorrowButtonClick,
};

const CustomScrollView = wrapScrollView(ScrollView);

class DailyMatchup extends PureComponent<Props, State> {
  state = {
    userBirthDateParts: [],
    shouldShowFixedButton: false,
    section: 'today',
    purchaseButtonVisible: false,
    buttonBottom: 20,
    scrollY: 0,
  };

  scrollView: ScrollView;

  matrixRef = React.createRef<any>();
  static contextType = NavigationContext;

  scrollIntoViewOptions = {
    align: 'top',
    insets: {
      top: 0,
    },
  };

  onDidFocus = async () => {
    const { dispatch } = this.props;

    let userBirthDate = await AsyncStorage.getItem(
      AsyncStorageKeys.UserBirthDateDaily,
    );
    if (!userBirthDate) {
      userBirthDate = await AsyncStorage.getItem(
        AsyncStorageKeys.UserBirthDate,
      );
      await AsyncStorage.setItem(
        AsyncStorageKeys.UserBirthDateDaily,
        userBirthDate,
      );
    }
    const userBirthDateParts = userBirthDate.split(':');
    this.setState({
      userBirthDateParts,
    });

    AsyncStorage.getItem(AsyncStorageKeys.PurchaseButtonVisibility).then(
      (value) => {
        this.setState({
          purchaseButtonVisible: JSON.parse(value) !== false,
        });
      },
    );

    await this.getPurchaseStatus();

    const date = getJoinedDate(userBirthDateParts);
    if (date) {
      dispatch(getPrognosisToday(date));
      dispatch(getPrognosisTomorrow(date));
      dispatch(getPrognosisYesterday(date));
    }
  };

  async componentDidMount() {
    const { dispatch, navigation } = this.props;

    dispatch(getFeedbackLinks());

    navigation.addListener('focus', () => this.onDidFocus('addListener'));
  }

  componentWillUnmount() {
    const { navigation } = this.props;
    navigation.removeListener('focus', () => this.onDidFocus('removeListener'));
  }

  onDateChange = async (userBirthDate) => {
    const { dispatch } = this.props;
    await AsyncStorage.setItem(
      AsyncStorageKeys.UserBirthDateDaily,
      userBirthDate,
    );
    const userBirthDateParts = userBirthDate.split(':');
    this.setState({ userBirthDateParts });
    const date = getJoinedDate(userBirthDateParts);
    if (date) {
      dispatch(getPrognosisToday(date));
      dispatch(getPrognosisTomorrow(date));
      dispatch(getPrognosisYesterday(date));
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
    const { dispatch } = this.props;
    dispatch(getFAQ());
    let navigation = this.context;
    navigation.navigate(RootStackNavigatorRouts.FAQ);
  };

  onSwitch = (value) => {
    trackEvent(DateEvent[value]);
    this.setState({ section: value });
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

  render() {
    const {
      userBirthDateParts,
      shouldShowFixedButton,
      section,
      purchaseButtonVisible,
    } = this.state;
    const {
      prognosisToday,
      prognosisTomorrow,
      prognosisYesterday,
      isFetching,
      isTrialAvailable,
      isActivePurchase,
    } = this.props;

    let data = prognosisToday;

    if (section === 'tomorrow') {
      data = prognosisTomorrow;
    }

    if (section === 'yesterday') {
      data = prognosisYesterday;
    }

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
            {/* {!isActivePurchase && purchaseButtonVisible && (
                            <SubscriptionCircleButton
                                refresh={this.getPurchaseStatus}
                            />
                        )} */}
            {/*{!isActivePurchase && isFreeTrialAvailable && (
              <SubscriptionBigButton
                buttonBottom={buttonBottom}
                refresh={this.getPurchaseStatus}
              />
            )}*/}
            <CustomScrollView
              ref={(ref) => {
                this.scrollView = ref;
              }}
              onScroll={this.onScroll}>
              <View style={styles.contentContainer}>
                <Header
                  title={resources.t('DAILY_NUMEROLOGY.SCREEN_TITLE')}
                  onQuestionPress={this.onQuestionPress}
                  userBirthDateParts={userBirthDateParts}
                  onDateChange={this.onDateChange}
                  typeDatePicker='single'
                />
                <ScrollIntoView
                  ref={this.matrixRef}
                  onMount={false}
                  scrollIntoViewOptions={this.scrollIntoViewOptions}>
                  <SwitchSelector
                    options={options}
                    style={styles.switchButtonsContainer}
                    height={32}
                    backgroundColor='transparent'
                    initial={1}
                    textStyle={styles.switchText}
                    selectedTextStyle={styles.switchSelectedText}
                    buttonColor='transparent'
                    onPress={this.onSwitch}
                    textContainerStyle={styles.switchTextContainerStyle}
                    selectedTextContainerStyle={
                      styles.selectedTextContainerStyle
                    }
                  />
                  <Prognosis
                    data={data}
                    isFetching={isFetching}
                    isActivePurchase={isActivePurchase}
                    refresh={this.getPurchaseStatus}
                  />
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
  prognosisToday: state.prognosisToday,
  prognosisTomorrow: state.prognosisTomorrow,
  prognosisYesterday: state.prognosisYesterday,
  isFetching: state.fetching,
  isTrialAvailable: state.isTrialAvailable,
  isActivePurchase: state.isActivePurchase,
  state,
});

export default connect(mapStateToProps, null)(DailyMatchup);

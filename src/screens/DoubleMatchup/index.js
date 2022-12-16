// @flow

import React, { PureComponent } from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import purchasesInteractions from 'src/shared/purchases/interactions';
import PercentCircle from 'src/components/PercentCircle';
import { getDateParts, getJoinedDate } from 'src/helpers/dateParsers';

import { img } from 'assets/img';

import { resources } from 'src/shared/i18n/configuration';
import { getDoubleCompatibility, getFAQ } from 'src/store/actions';
import Header from 'src/components/Header';
import Card from 'src/components/common/card';
import SubscriptionCircleButton from 'src/components/common/SubscriptionCircleButton';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackNavigatorRouts } from '../../variables/navigationRouts';
import logger from '../../utils/logger';

type Props = {
  womanBirthDate: string,
  manBirthDate: string,
  doubleCompatibility: {
    result: number,
    text: string,
  },
};

type State = {
  firstDateParts: Array<string>,
  secondDateParts: Array<string>,
  isActivePurchase: boolean,
  isWomanActive: boolean,
  isManActive: boolean,
  purchaseButtonVisible: boolean,
};

class DoubleMatchup extends PureComponent<Props, State> {
  state = {
    firstDateParts: [],
    secondDateParts: [],
    isActivePurchase: false,
    isFreeTrialAvailable: false,
    isWomanActive: true,
    isManActive: true,
    purchaseButtonVisible: false,
    buttonBottom: -80,
    scrollY: 0,
  };

  async componentDidMount() {
    const { womanBirthDate, manBirthDate, navigation } = this.props;
    if (womanBirthDate && manBirthDate) {
      const firstDateParts = getDateParts(womanBirthDate);
      const secondDateParts = getDateParts(manBirthDate);
      this.setState({
        firstDateParts,
        secondDateParts,
        isManActive: false,
        isWomanActive: false,
      });
    }
    navigation.addListener('focus', this.onDidFocus);
  }

  componentWillUnmount() {
    const { navigation } = this.props;
    navigation.removeListener('focus', this.onDidFocus);
  }

  onDidFocus = async () => {
    await this.getPurchaseStatus();
  };

  getPurchaseStatus = async () => {
    try {
      await purchasesInteractions.getPurchaseStatus();
      await purchasesInteractions.checkIsTrialAvailable();

      const status = await AsyncStorage.getItem('isActivePurchase').then(
        (value) => JSON.parse(value),
      );
      const trialStatus = await AsyncStorage.getItem('isTrialAvailable').then(
        (value) => JSON.parse(value),
      );
      this.setState({ isActivePurchase: status });
      this.setState({ isFreeTrialAvailable: trialStatus });
    } catch (error) {
      logger.error(error);
    }
  };

  onFirstDateChange = (date: string) => {
    const { secondDateParts } = this.state;
    const { dispatch } = this.props;
    const firstDateParts = date.split(':');
    this.setState({ firstDateParts });
    const womanBirthDate = getJoinedDate(firstDateParts);
    const manBirthDate = getJoinedDate(secondDateParts);
    if (womanBirthDate) {
      this.setState({ isWomanActive: false });
    }
    if (manBirthDate) {
      this.setState({ isManActive: false });
    }
    if (womanBirthDate && manBirthDate) {
      dispatch(getDoubleCompatibility(womanBirthDate, manBirthDate));
    }
  };

  onSecondDateChange = (date: string) => {
    const { firstDateParts } = this.state;
    const { dispatch } = this.props;
    const secondDateParts = date.split(':');
    this.setState({ secondDateParts });
    const womanBirthDate = getJoinedDate(firstDateParts);
    const manBirthDate = getJoinedDate(secondDateParts);
    if (womanBirthDate) {
      this.setState({ isWomanActive: false });
    }
    if (manBirthDate) {
      this.setState({ isManActive: false });
    }
    if (womanBirthDate && manBirthDate) {
      dispatch(getDoubleCompatibility(womanBirthDate, manBirthDate));
    }
  };

  onQuestionPress = () => {
    const { navigation, dispatch } = this.props;
    dispatch(getFAQ());
    navigation.navigate(RootStackNavigatorRouts.FAQ);
  };

  render() {
    const {
      firstDateParts,
      secondDateParts,
      isActivePurchase,
      isFreeTrialAvailable,
      isWomanActive,
      isManActive,
    } = this.state;
    const { doubleCompatibility } = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground source={img.gradient} style={styles.background}>
          <View style={styles.viewContainer}>
            {!isActivePurchase && isFreeTrialAvailable && (
              <SubscriptionCircleButton refresh={this.getPurchaseStatus} />
            )}
            <ScrollView>
              <View style={styles.contentContainer}>
                <Header
                  title={resources.t('COMPATIBILITY.SCREEN_TITLE')}
                  onQuestionPress={this.onQuestionPress}
                  firstDateParts={firstDateParts}
                  secondDateParts={secondDateParts}
                  onFirstDateChange={this.onFirstDateChange}
                  onSecondDateChange={this.onSecondDateChange}
                  isWomanRipple={isWomanActive}
                  isManRipple={isManActive}
                />

                {doubleCompatibility ? (
                  <>
                    <View style={styles.circleTitleContainer}>
                      <Text style={styles.circleTitle}>
                        {resources.t(
                          'COMPATIBILITY.PERCENTAGE_CIRCLE_DESCRIPTION',
                        )}
                      </Text>
                    </View>
                    <PercentCircle
                      fill={doubleCompatibility.result} // circle percent
                      onAnimationComplete={() => null}
                    />
                    <View style={styles.cardContainer}>
                      <Card
                        title={resources.t('COMPATIBILITY.CARD_TITLE')}
                        titleIcon={img.iconHearts}
                        isActivePurchase={isActivePurchase}
                        description={doubleCompatibility.text}
                        refresh={this.getPurchaseStatus}
                        eventSource='compatibility'
                      />
                    </View>
                  </>
                ) : (
                  <View style={styles.compatibilityCouple}>
                    <View style={styles.coupleImageContainer}>
                      <Image
                        source={img.compatibility}
                        style={styles.coupleImage}
                      />
                    </View>
                    <Text style={styles.compatibilityDescription}>
                      {resources.t(
                        'COMPATIBILITY.EMPTY_SCREEN_IMAGE_DESCRIPTION',
                      )}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  doubleCompatibility: state.doubleCompatibility,
  womanBirthDate: state.womanBirthDate,
  manBirthDate: state.manBirthDate,
});

export default connect(mapStateToProps, null)(DoubleMatchup);

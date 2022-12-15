// @flow

import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import { img } from 'assets/img';
import purchasesInteractions from 'src/shared/purchases/interactions';
import { getMonthPrice } from 'src/helpers';
import { resources } from 'src/shared/i18n/configuration';
import { colors } from 'src/variables';
import reviewConfiguration from './reviewConfiguration';
import { Styles2 as styles } from './styles';
import { RootStackNavigatorRouts } from '../../variables/navigationRouts';
import { Events } from '../../shared/analytics/events';
import { trackEvent } from '../../shared/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionEvent = {
  annual: Events.Paywall.YearButtonClick,
  monthly: Events.Paywall.MonthButtonClick,
};

type Props = {
  selectedAnswer: string,
  availablePurchases: Array<Object>,
  annualPurchasePrice: string,
  annualPrice: string,
  monthPurchasePrice: string,
};

type State = {
  selectedSubscription: string,
  isFetching: boolean,
};

class SubscribeFirstVariant extends PureComponent<Props, State> {
  static navigationOptions = {
    header: null,
    headerTintColor: 'white',
    gesturesEnabled: false,
  };

  state = {
    selectedSubscription: 'annual',
    isFetching: false,
    isFreeTrialAvailable: false,
  };

  spinValue = new Animated.Value(0);

  animatedValue = new Animated.Value(0);

  animatedValue1 = new Animated.Value(0);

  async componentDidMount() {
    await purchasesInteractions.checkIsTrialAvailable();
    const status = await AsyncStorage.getItem('isTrialAvailable').then(
      (value) => JSON.parse(value),
    );
    this.setState({ isFreeTrialAvailable: status });
    this.animate();
    this.scale();
    this._interval = setInterval(() => {
      this.animate();
      this.scale();
    }, 1200);
    this.spin();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  scale = () => {
    this.animatedValue1.setValue(0);
    Animated.timing(this.animatedValue1, {
      toValue: 1,
      duration: 1100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  animate = () => {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 450,
      easing: Easing.linear,
      delay: 550,
      useNativeDriver: true,
    }).start();
  };

  spin = () => {
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  handleCardPress = (selectedSubscription: string) => {
    this.setState({ selectedSubscription });
    trackEvent(SubscriptionEvent[selectedSubscription]);
  };

  closeScreen = async (closeType: string) => {
    this.setState({ isFetching: false });
    const { route, navigation } = this.props;

    trackEvent(Events.Paywall.ExitIconClick);

    if (route.params && route.params.screen === 'Onboarding') {
      navigation.replace(RootStackNavigatorRouts.TabNavigator);
    } else {
      navigation.goBack();
    }
  };

  openPrivacy = () => {
    const { navigation } = this.props;
    navigation.navigate(RootStackNavigatorRouts.Privacy);
  };

  openTerms = () => {
    const { navigation } = this.props;
    navigation.navigate(RootStackNavigatorRouts.Terms);
  };

  removeSpinner = () => this.setState({ isFetching: false });

  purchasePackage = async () => {
    trackEvent(Events.Paywall.ContinueButtonClick);

    try {
      const { selectedSubscription } = this.state;
      const { availablePurchases } = this.props;
      this.setState({ isFetching: true });

      const purchase = availablePurchases.find(
        (availablePurchase) =>
          availablePurchase.packageType.toLowerCase() === selectedSubscription,
      );

      await purchasesInteractions.purchasePackage(purchase);

      this.setState({ isFetching: false });

      trackEvent(Events.Paywall.WinWinShowed);

      setTimeout(() => {
        this.closeScreen('automatically');
      }, 600);
    } catch (error) {
      this.setState({ isFetching: false });

      trackEvent(Events.Paywall.ErrorShowed, { message: error.message });

      if (!error.userCancelled) {
        Alert.alert(error.message);
      }
    }
  };

  restorePurchase = async () => {
    trackEvent(Events.Paywall.RestoreButtonClick);
    await purchasesInteractions.restorePurchase();
  };

  render() {
    const { selectedSubscription, isFetching } = this.state;
    const {
      selectedAnswer,
      annualPurchasePrice,
      annualPrice,
      monthPurchasePrice,
    } = this.props;
    const scaleButton = this.animatedValue1.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.05, 1],
    });
    return (
      <ImageBackground
        source={img.onboarding.subscribeBackground}
        style={styles.background}>
        <View style={styles.container}>
          <View style={styles.animateContainer}>
            <TouchableOpacity onPress={this.closeScreen} style={styles.close}>
              <Image
                style={styles.closeIcon}
                source={img.onboarding.closeIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.restorePurchase}
              style={styles.restoreContainer}>
              <Text style={styles.restore}>
                {resources.t('SUBSCRIPTION.RESTORE')}
              </Text>
            </TouchableOpacity>
          </View>

          <Animated.View
            style={{
              ...styles.content,
              opacity: this.spinValue,
            }}>
            <View style={styles.contentContainer}>
              <Text style={styles.contentTitle}>
                {this.state.isFreeTrialAvailable
                  ? resources.t('SUBSCRIPTION.FREE_FULL_ACCESS').toUpperCase()
                  : resources.t('SUBSCRIPTION.FULL_ACCESS').toUpperCase()}
              </Text>
              <LinearGradient
                colors={colors.purpleGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.topCard}>
                <Image source={img.onboarding.stars} style={styles.stars} />
                <Text style={styles.topCardDescription}>
                  {reviewConfiguration[selectedAnswer].review}
                </Text>
                <Text style={styles.topCardAuthor}>
                  {reviewConfiguration[selectedAnswer].author}
                </Text>
              </LinearGradient>
              <View style={styles.cardsContainer}>
                <TouchableOpacity
                  onPress={() => this.handleCardPress('annual')}>
                  <View style={styles.cardLabelContainer}>
                    <View style={styles.cardLabel}>
                      <Text style={styles.cardLabelText}>
                        {resources.t('SUBSCRIPTION.SAVE_80')}
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={
                      selectedSubscription === 'annual'
                        ? colors.purpleGradient
                        : colors.shadowPurpleGradient
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.card,
                      selectedSubscription === 'annual' &&
                        styles.activeSubscription,
                    ]}>
                    <View style={styles.topTextContainer}>
                      <Text style={styles.cardTopText}>
                        {resources.t('SUBSCRIPTION.YEAR').toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.buttonText}>
                      {`${annualPurchasePrice} ${resources.t(
                        'SUBSCRIPTION.BILLED_ANNUALLY',
                      )}`}
                    </Text>
                    <Text style={styles.smallFontText}>
                      {`${getMonthPrice(
                        annualPurchasePrice,
                        annualPrice,
                      )}/month`}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleCardPress('monthly')}>
                  <LinearGradient
                    colors={
                      selectedSubscription === 'monthly'
                        ? colors.purpleGradient
                        : colors.shadowPurpleGradient
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.card,
                      selectedSubscription === 'monthly' &&
                        styles.activeSubscription,
                    ]}>
                    <View style={styles.topTextContainer}>
                      <Text style={styles.cardTopText}>
                        {resources
                          .t('SUBSCRIPTION.BILLED_MONTHLY')
                          .toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.buttonText}>
                      {`${monthPurchasePrice} ${resources.t(
                        'SUBSCRIPTION.BILLED_MONTHLY',
                      )}`}
                    </Text>
                    <Text style={styles.smallFontText}>
                      {`${monthPurchasePrice}/month`}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.purchasePackage}>
                <Animated.View
                  style={[
                    styles.continueContainer,
                    {
                      transform: [{ scale: scaleButton }],
                    },
                  ]}>
                  <LinearGradient
                    colors={colors.yellowGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={
                      isFetching
                        ? styles.spinnerButtonContainer
                        : styles.continueButtonContainer
                    }>
                    <Animated.View
                      style={{
                        transform: [{ rotate: '45deg' }],
                        /*left,*/
                        position: 'absolute',
                        opacity: 0.5,
                        marginTop: -30,
                        height: 120,
                        width: 40,
                        backgroundColor: 'white',
                      }}
                    />
                    {!isFetching ? (
                      <>
                        <Text style={styles.buttonText}>
                          {resources.t('SUBSCRIPTION.CONTINUE').toUpperCase()}
                        </Text>
                        <Image
                          style={styles.continueArrow}
                          source={img.iconArrow}
                        />
                      </>
                    ) : (
                      <ActivityIndicator size='large' color={colors.white} />
                    )}
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
              <View>
                <View style={styles.privacyLinks}>
                  <TouchableWithoutFeedback onPress={this.openTerms}>
                    <Text style={styles.privacyLink}>
                      {resources.t('SUBSCRIPTION.TERMS_OF_SERVICE')}
                    </Text>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={this.openPrivacy}>
                    <Text style={styles.privacyLink}>
                      {resources.t('SUBSCRIPTION.PRIVACY_POLICY')}
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedAnswer: state.selectedAnswer,
  availablePurchases: state.availablePurchases,
  annualPurchasePrice:
    (state.availablePurchases &&
      state.availablePurchases.find(
        (purchase) => purchase.packageType === 'ANNUAL',
      ).product.price_string) ||
    '$39.99',
  monthPurchasePrice:
    (state.availablePurchases &&
      state.availablePurchases.find(
        (purchase) => purchase.packageType === 'MONTHLY',
      ).product.price_string) ||
    '$14.99',
  annualPrice:
    (state.availablePurchases &&
      state.availablePurchases.find(
        (purchase) => purchase.packageType === 'ANNUAL',
      ).product.price) ||
    14.99,
});

export default connect(mapStateToProps, null)(SubscribeFirstVariant);

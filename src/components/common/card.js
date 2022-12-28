// @flow

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { resources } from '../../shared';
import Button from 'src/shared/components/Button';
import { wp } from 'src/helpers';
import { colors, fonts } from 'src/variables';
import { img } from 'assets/img';
import { NavigationContext } from '@react-navigation/native';
import { RootStackNavigatorRouts } from '../../variables/navigationRouts';
import { Events } from '../../shared/analytics/events';
import { trackEvent } from '../../shared/analytics';

type Props = {
  isFetching: boolean,
  title: string,
  titleIcon: any,
  description: string,
  isActivePurchase: boolean,
  id: number,
  professions: ?Array<string>,
  eventSource: string,
};

const TitleEvent = {
  'Love compatibility': Events.Compatibility.LoveUnlockButtonClick,
  'Job / Business': Events.DailyNumerology.JobUnlockButtonClick,
  Prosperity: Events.DailyNumerology.ProsperityUnlockButtonClick,
  Love: Events.DailyNumerology.LoveUnlockButtonClick,
  Health: Events.DailyNumerology.HealthUnlockButtonClick,
  'Self development': Events.DailyNumerology.SelfUnlockButtonClick,
  Strength: Events.Personality.StrengthUnlockButtonClick,
  Weakness: Events.Personality.WeaknessUnlockButtonClick,
  Important: Events.Personality.ImportantUnlockButtonClick,
};

export class Card extends Component<Props> {
  static contextType = NavigationContext;
  onPress = (source) => {
    let navigation = this.context;
    const { title } = this.props;

    navigation.navigate(RootStackNavigatorRouts.SubscribeFirstVariant);

    if (source === 'button') {
      trackEvent(TitleEvent[title]);
    }
  };

  render() {
    const {
      title,
      description,
      isActivePurchase,
      titleIcon,
      id,
      professions,
      isFetching,
    } = this.props;
    let professionsText = '';
    if (professions) {
      professions.forEach((item, index) => {
        professionsText =
          professionsText +
          item +
          (professions.length - 1 === index ? '. ' : ', ');
      });
    }
    return (
      <View style={styles.container}>
        {isActivePurchase || id === 0 || professions ? (
          <>
            {title && (
              <View style={styles.titleContainer}>
                {titleIcon ? (
                  <Image
                    source={titleIcon}
                    resizeMode='contain'
                    style={styles.titleIcon}
                  />
                ) : null}
                <Text style={styles.title}>{title}</Text>
                {isFetching && (
                  <ActivityIndicator
                    style={styles.activityIndicator}
                    size='large'
                    color={colors.violet}
                  />
                )}
              </View>
            )}
            {professions ? (
              <>
                {description ? (
                  <Text style={styles.professionsDescription}>
                    {`${description}:`}
                  </Text>
                ) : null}
                <View style={styles.professionsContainer}>
                  <Text style={styles.description}>{professionsText}</Text>
                </View>
              </>
            ) : (
              <Text style={styles.description}>{description}</Text>
            )}
          </>
        ) : (
          <TouchableOpacity
            onPress={() => this.onPress('card')}
            style={styles.wrapper}>
            <View>
              {title && (
                <View style={styles.titleContainer}>
                  {titleIcon ? (
                    <Image
                      source={titleIcon}
                      resizeMode='contain'
                      style={styles.titleIcon}
                    />
                  ) : null}
                  <Text style={styles.title}>{title}</Text>
                </View>
              )}
              {description && (
                <View>
                  <Text
                    ellipsizeMode='tail'
                    numberOfLines={2}
                    style={[
                      styles.description,
                      { marginBottom: 0, width: 200 },
                    ]}>
                    {description}
                  </Text>
                </View>
              )}
              <View style={styles.buttonContainer}>
                <Button
                  textStyle={styles.buttonText}
                  buttonText={resources.t('PERSONALITY.UNLOCK')}
                  onPress={() => this.onPress('button')}
                  style={styles.button}
                />
              </View>
            </View>
            <Image
              source={img.main.lockIcon}
              resizeMode='contain'
              style={styles.lockIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Card;

const styles = StyleSheet.create({
  container: {
    width: wp('100%') - 32,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  title: {
    color: colors.violet,
    fontFamily: fonts.sfProSemibold,
    fontSize: 16,
    lineHeight: 19,
  },
  description: {
    color: colors.darkBlack,
    fontFamily: fonts.sfProRegular,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14,
    marginBottom: 16,
  },
  titleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    height: 24,
  },
  button: {
    paddingVertical: 10,
    width: 120,
    marginTop: 18,
    marginBottom: 18,
  },
  buttonText: {
    fontFamily: fonts.sfProSemibold,
  },
  buttonContainer: {
    shadowColor: colors.shadowViolet,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lockIcon: {
    width: 88,
    height: 88,
    marginBottom: 16,
    marginTop: 16,
  },
  professionsDescription: {
    color: colors.darkBlack,
    fontFamily: fonts.sfProMedium,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14,
    marginBottom: -8,
  },
  professionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activityIndicator: {
    position: 'absolute',
    right: -4,
    top: -4,
  },
});

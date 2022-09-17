// @flow

import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Button from 'src/shared/components/Button';
import { resources } from '../../shared';
import { colors, fonts } from 'src/variables';
import { wp } from 'src/helpers';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigatorRouts } from '../../variables/navigationRouts';
import { useAnalytics } from '../../shared/analytics';
import { Events } from '../../shared/analytics/events';

type Props = {
  getFAQ(): void,
};

const RouteEvent = {
  personality: Events.Personality.AskUsButtonClick,
  daily: Events.DailyNumerology.AskUsButtonClick,
};

const FeedbackPost = ({ getFAQ }: Props) => {
  const navigation = useNavigation();
  const track = useAnalytics();

  const onPress = useCallback(() => {
    const state = navigation.getState();
    const routeName = state.routes[state.index].name;

    track(RouteEvent[routeName]);

    getFAQ();
    navigation.navigate(RootStackNavigatorRouts.FAQ);
  }, [navigation]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>
            {resources.t('POST.ASK_US_DESCRIPTION')}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonText={resources.t('POST.ASK_US')}
            onPress={onPress}
            style={styles.button}
            withArrowIcon={false}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getFAQ: () =>
    dispatch({
      type: 'GET_FAQ_REQUEST',
    }),
});

export default connect(
  null,
  mapDispatchToProps,
)(React.memo<Props>(FeedbackPost));

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: wp('100%') - 32,
    paddingHorizontal: 16,
    paddingVertical: 28,
    marginBottom: 17,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    width: 88,
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
  leftContainer: {
    flexShrink: 1,
  },
  title: {
    fontFamily: fonts.sfProRegular,
    color: colors.darkBlack,
    fontSize: 16,
    lineHeight: 24,
    marginRight: 30,
  },
});

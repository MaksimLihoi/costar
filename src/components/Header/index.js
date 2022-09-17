// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { resources } from '../../shared';
import SingleDatePicker from '../../components/DatePickers/SingleDatePicker';
import DoubleDatePicker from '../../components/DatePickers/DoubleDatePicker';
import { wp } from '../../helpers';
import { colors, fonts } from '../../variables';

type Props = {
  onQuestionPress(): ?void,
  userBirthDateParts: ?Array<string>,
  onDateChange(string): ?void,
  title: string,
  typeDatePicker: ?string,
  firstDateParts: ?Array<string>,
  secondDateParts: ?Array<string>,
  onFirstDateChange(): ?void,
  onSecondDateChange(): ?void,
  isWomanRipple: ?boolean,
  isManRipple: ?boolean,
};

const Header = ({
  onQuestionPress,
  userBirthDateParts,
  onDateChange,
  title,
  typeDatePicker,
  firstDateParts,
  secondDateParts,
  onFirstDateChange,
  onSecondDateChange,
  isWomanRipple,
  isManRipple,
}: Props) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
    {/*{resources.t('PREFERENCES.REQUEST_LANGUAGE') === 'en' && (
      <TouchableOpacity
        hitSlop={styles.touchableArea}
        onPress={onQuestionPress}
        style={styles.questionIconContainer}>
        <Image source={img.feedback.question} style={styles.questionIcon} />
      </TouchableOpacity>
    )}*/}
    <Text style={styles.subtitle}>
      {resources.t('PERSONALITY.SCREEN_SUBTITLE')}
    </Text>
    {typeDatePicker === 'single' ? (
      <SingleDatePicker
        userBirthDateParts={userBirthDateParts}
        onDateChange={onDateChange}
      />
    ) : (
      <DoubleDatePicker
        firstDateParts={firstDateParts}
        secondDateParts={secondDateParts}
        onFirstDateChange={onFirstDateChange}
        onSecondDateChange={onSecondDateChange}
        isWomanRipple={isWomanRipple}
        isManRipple={isManRipple}
      />
    )}
  </View>
);

export default React.memo<Props>(Header);

const styles = StyleSheet.create({
  header: {
    width: wp('100%'),
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontFamily: fonts.sfProSemibold,
    fontSize: 24,
    lineHeight: 29,
    color: colors.white,
  },
  touchableArea: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  questionIconContainer: {
    position: 'absolute',
    right: 16,
  },
  questionIcon: {
    width: 22,
    height: 22,
  },
  subtitle: {
    fontFamily: fonts.sfProRegular,
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
    color: colors.gray,
  },
});

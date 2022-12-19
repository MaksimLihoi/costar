// @flow

import React, { useCallback, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { createDate, getFormattedDate } from 'src/helpers/dateParsers';
import { colors, fonts } from 'src/variables';
import { img } from 'assets/img';
import { useAnalytics } from '../../shared/analytics';
import { Events } from '../../shared/analytics/events';
import CustomDatePicker from 'src/shared/components/CustomDatePicker';

type Props = {
  userBirthDateParts: Array<string>,
  onDateChange(string): Promise<void>,
};

const SingleDatePicker = ({ userBirthDateParts, onDateChange }: Props) => {
  const track = useAnalytics();
  const [shouldShowModal, setShouldShowModal] = useState(false);

  const onConfirmPressed = useCallback((date: Date) => {
    hideModal();
    const formattedDate = getFormattedDate(date);
    onDateChange(formattedDate);
  }, []);

  const showModal = useCallback(() => {
    track(Events.Personality.DataButtonClick);
    setShouldShowModal(true);
  }, []);
  const hideModal = useCallback(() => setShouldShowModal(false), []);

  return (
    <TouchableWithoutFeedback onPress={showModal}>
      <View style={styles.datePickerContainer}>
        <Text style={styles.data}>{userBirthDateParts[0] || 'MM'}</Text>
        <View style={styles.separator} />
        <Text style={styles.data}>{userBirthDateParts[1] || 'DD'}</Text>
        <View style={styles.separator} />
        <Text style={styles.data}>{userBirthDateParts[2] || 'YYYY'}</Text>

        <Image source={img.doneIcon} style={styles.icon} />

        {shouldShowModal && (
          <CustomDatePicker
            onCancelPressed={hideModal}
            onConfirmPressed={onConfirmPressed}
            currentDate={createDate(userBirthDateParts)}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo<Props>(SingleDatePicker);

const styles = StyleSheet.create({
  datePickerContainer: {
    backgroundColor: colors.white,
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 10,
    height: 40,
    width: 176,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dataContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.8,
  },
  data: {
    fontFamily: fonts.sfProMedium,
    color: colors.darkGray,
    fontSize: 16,
    lineHeight: 19,
  },
  separator: {
    backgroundColor: colors.semiTransparentViolet,
    width: 1,
    height: 16,
    marginHorizontal: 12,
  },
  icon: {
    width: 12,
    height: 6,
    marginLeft: 12,
  },
});

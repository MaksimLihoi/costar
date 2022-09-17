// @flow

import React, { useCallback, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { resources } from '../../shared';
import TouchableCircleRipple from 'src/shared/components/TouchableCircle/TouchableCircleRipple';
import DatePicker from 'src/shared/components/DatePicker';
import { createDate, getFormattedDate } from 'src/helpers/dateParsers';
import { colors, fonts } from 'src/variables';
import { img } from 'assets/img';
import { useAnalytics } from '../../shared/analytics';
import { Events } from '../../shared/analytics/events';

type Props = {
  firstDateParts: Array<string>,
  onFirstDateChange(string): void,
  secondDateParts: Array<string>,
  onSecondDateChange(string): void,
  isWomanRipple: boolean,
  isManRipple: boolean,
};

const DoubleDatePicker = ({
  firstDateParts,
  secondDateParts,
  onFirstDateChange,
  onSecondDateChange,
  isWomanRipple,
  isManRipple,
}: Props) => {
  const track = useAnalytics();

  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [dateNumber, setDateNumber] = useState(1);

  const showModal = useCallback((number: number) => {
    setShouldShowModal(true);
    setDateNumber(number);
    track(
      number === 1
        ? Events.Compatibility.WomanClick
        : Events.Compatibility.ManClick,
    );
  }, []);

  const hideModal = useCallback(() => setShouldShowModal(false), []);

  const onConfirmPressed = useCallback(
    (date: Date) => {
      hideModal();
      const formattedDate = getFormattedDate(date);
      if (dateNumber === 1) {
        onFirstDateChange(formattedDate);
      } else {
        onSecondDateChange(formattedDate);
      }
    },
    [dateNumber],
  );

  return (
    <View style={styles.container}>
      <View style={styles.genderContainer}>
        <View style={styles.bottomSeparator}>
          <Image
            source={img.female}
            style={styles.genderIcon}
            resizeMode='contain'
          />
          <Text style={styles.genderText}>
            {resources.t('COMPATIBILITY.WOMAN')}
          </Text>
        </View>
        <View>
          <Image
            source={img.male}
            style={styles.genderIcon}
            resizeMode='contain'
          />
          <Text style={styles.genderText}>
            {resources.t('COMPATIBILITY.MAN')}
          </Text>
        </View>
      </View>
      <View style={styles.dateGroupRight}>
        <TouchableWithoutFeedback onPress={() => showModal(1)}>
          <View
            style={{
              ...styles.datePickerContainer,
              ...styles.bottomSeparator,
            }}>
            <View style={styles.dataContainer}>
              <Text style={styles.data}>{firstDateParts[0] || 'MM'}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.data}>{firstDateParts[1] || 'DD'}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.data}>{firstDateParts[2] || 'YYYY'}</Text>
              <View style={styles.iconContainer}>
                <TouchableCircleRipple
                  isVisible={isWomanRipple}
                  onPress={() => showModal(1)}>
                  <Image source={img.doneIcon} style={styles.icon} />
                </TouchableCircleRipple>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => showModal(2)}>
          <View style={styles.datePickerContainer}>
            <View style={styles.dataContainer}>
              <Text style={styles.data}>{secondDateParts[0] || 'MM'}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.data}>{secondDateParts[1] || 'DD'}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.data}>{secondDateParts[2] || 'YYYY'}</Text>
              <View style={styles.iconContainer}>
                <TouchableCircleRipple
                  isVisible={isManRipple}
                  onPress={() => showModal(2)}>
                  <Image source={img.doneIcon} style={styles.icon} />
                </TouchableCircleRipple>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {shouldShowModal && (
          <DatePicker
            onCancelPressed={hideModal}
            onConfirmPressed={onConfirmPressed}
            currentDate={
              dateNumber === 1
                ? createDate(firstDateParts)
                : createDate(secondDateParts)
            }
          />
        )}
      </View>
    </View>
  );
};

export default React.memo<Props>(DoubleDatePicker);

const styles = StyleSheet.create({
  container: {
    height: 104,
    marginTop: 8,
    marginHorizontal: 24,
    borderRadius: 16,
    backgroundColor: colors.white,
    paddingRight: 16,
    flexDirection: 'row',
  },
  datePickerContainer: {
    marginLeft: 16,
  },
  dataContainer: {
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
  },
  dateGroupRight: {
    flex: 1,
  },
  genderContainer: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderRightColor: colors.semiTransparentViolet,
    borderRightWidth: 1,
  },
  bottomSeparator: {
    height: 52,
    borderBottomColor: colors.semiTransparentViolet,
    borderBottomWidth: 1,
  },
  genderIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginTop: 9,
    marginBottom: 2,
  },
  genderText: {
    textAlign: 'center',
    color: colors.lightGray,
    fontFamily: fonts.sfProRegular,
    fontSize: 10,
    lineHeight: 12,
    marginBottom: 5,
  },
  data: {
    fontFamily: fonts.sfProMedium,
    color: colors.darkGray,
    fontSize: 16,
    lineHeight: 19,
  },
  separator: {
    color: colors.semiTransparentViolet,
    fontFamily: fonts.sfProRegular,
    fontSize: moderateScale(15, 1.4),
  },
  iconContainer: {
    marginRight: 9,
  },
  icon: {
    width: 12,
    height: 6,
  },
});

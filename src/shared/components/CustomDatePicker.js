// @flow

import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { colors, fonts } from 'src/variables';
import { resources } from '../i18n/configuration';

type Props = {
  currentDate: Date,
  onConfirmPressed(Date): void,
  onCancelPressed(): void,
};

const CustomDatePicker = ({
  currentDate,
  onConfirmPressed,
  onCancelPressed,
}: Props) => {
  const [value, setValue] = useState(currentDate);

  const handleConfirmPressed = useCallback(
    () => onConfirmPressed(value),
    [value],
  );
  const handleOnChange = useCallback((_, date) => setValue(date), []);

  return (
    <Modal animationType='fade' transparent visible>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.touchableArea}
          onPress={onCancelPressed}
        />
        <View style={styles.container}>
          <View style={styles.bar}>
            <TouchableOpacity style={styles.button} onPress={onCancelPressed}>
              <Text style={styles.cancel}>
                {resources.t('DATEPICKER.CANCEL')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleConfirmPressed}>
              <Text style={styles.confirm}>
                {resources.t('DATEPICKER.CONFIRM')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dataTimeContainer}>
            <DatePicker
              theme='light'
              date={value}
              maximumDate={new Date()}
              modal={false}
              onDateChange={setValue}
              timeZoneOffsetInMinutes={new Date().getTimezoneOffset() * -1}
              locale={resources.t('PREFERENCES.LANGUAGE')}
              mode={'date'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo<Props>(CustomDatePicker);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.semiTransparentBlack,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  touchableArea: {
    flex: 1,
  },
  bar: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: 270,
    width: '100%',
    backgroundColor: colors.white,
  },
  cancel: {
    fontFamily: fonts.sfProMedium,
    color: colors.darkGray,
    fontSize: 17,
  },
  confirm: {
    fontFamily: fonts.sfProMedium,
    color: colors.darkViolet,
    fontSize: 17,
  },
  dataTimeContainer: { width: '100%', alignItems: 'center' },
});

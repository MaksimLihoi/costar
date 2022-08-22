// @flow

import React, { useState, useCallback } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors, fonts } from 'src/variables';
import I18n from 'src/shared/i18n/configuration';

type Props = {
    currentDate: Date,
    onConfirmPressed(Date): void,
    onCancelPressed(): void,
};

const DatePicker = ({
    currentDate,
    onConfirmPressed,
    onCancelPressed,
}: Props) => {
    const [value, setValue] = useState(currentDate);

    const handleConfirmPressed = useCallback(() => onConfirmPressed(value), [
        value,
    ]);
    const handleOnChange = useCallback((event, date) => setValue(date), []);

    return (
        <Modal animationType="fade" transparent visible>
            <View style={styles.modalContainer}>
                <TouchableOpacity
                    style={styles.touchableArea}
                    onPress={onCancelPressed}
                />
                <View style={styles.container}>
                    <View style={styles.bar}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onCancelPressed}
                        >
                            <Text style={styles.cancel}>
                                {I18n.t('DATEPICKER.CANCEL')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleConfirmPressed}
                        >
                            <Text style={styles.confirm}>
                                {I18n.t('DATEPICKER.CONFIRM')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        value={value}
                        display="default"
                        locale={I18n.t('PREFERENCES.LANGUAGE')}
                        onChange={handleOnChange}
                        timeZoneOffsetInMinutes={
                            new Date().getTimezoneOffset() * -1
                        }
                    />
                </View>
            </View>
        </Modal>
    );
};

export default React.memo<Props>(DatePicker);

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
});

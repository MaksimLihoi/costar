// @flow

import { StyleSheet } from 'react-native';

import { colors, fonts } from 'src/variables';
import { wp } from 'src/helpers';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 20,
    },
    background: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        ...ifIphoneX({ paddingTop: 20 }, { paddingTop: 0 }),
    },
    switchContainer: {
        width: wp('100%') - 32,
        marginHorizontal: 16,
        height: 40,
        marginTop: 21,
        borderRadius: 8,
    },
    switcherBackground: {
        position: 'absolute',
        height: 32,
        width: wp('100%') - 48,
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 8.91,
    },
    switchButtonsContainer: {
        position: 'absolute',
        margin: 2,
        top: -3,
        left: 1,
        width: wp('100%') - 38,
    },
    switchText: {
        fontFamily: fonts.sfProRegular,
        fontSize: 16,
        lineHeight: 19,
        color: colors.white,
    },
    switchSelectedText: {
        fontFamily: fonts.sfProRegular,
        fontSize: 16,
        lineHeight: 19,
        color: colors.white,
        fontWeight: '600',
    },
});

export default styles;

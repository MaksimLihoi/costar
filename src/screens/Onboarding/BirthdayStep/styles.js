// @flow

import { StyleSheet } from 'react-native';
import { DeviceSize, fs, getDeviceSize, hp, wp } from 'src/helpers';
import { colors, fonts } from 'src/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkViolet,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageWrapper: {
    position: 'absolute',
    top: getDeviceSize() > DeviceSize.large ? 85 : 40,
    width: wp('100%'),
    height: wp('100%'),
  },
  calendarWrapper: {
    alignItems: 'center',
  },
  baby: {
    position: 'absolute',
    zIndex: 3,
    left: wp('37%'),
    bottom: wp('36%'),
    width: wp('30%'),
    height: wp('40%'),
  },
  one: {
    position: 'absolute',
    zIndex: 4,
    left: wp('30%'),
    bottom: wp('38%'),
    width: wp('8%'),
    height: wp('8%'),
  },
  six: {
    position: 'absolute',
    zIndex: 4,
    left: wp('38%'),
    top: wp('20%'),
    width: wp('8%'),
    height: wp('8%'),
  },
  shadow: {
    position: 'absolute',
    zIndex: 4,
    left: wp('35%'),
    bottom: wp('42%'),
    width: wp('30%'),
    height: wp('30%'),
  },
  zero: {
    position: 'absolute',
    zIndex: 4,
    right: wp('26%'),
    top: wp('30%'),
    width: wp('8%'),
    height: wp('8%'),
  },
  circle: {
    zIndex: 2,
    width: wp('75%'),
    height: wp('75%'),
    alignSelf: 'center',
  },
  titleText: {
    marginBottom: hp('1.97%'),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.sfProSemibold,
    fontSize: fs(8.53),
    lineHeight: fs(10.67),
    color: colors.white,
    zIndex: 100,
  },
  descriptionText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.sfProRegular,
    fontSize: fs(4.8),
    lineHeight: fs(7.2),
    color: colors.white,
    zIndex: 100,
  },
  buttonWrapper: {
    marginHorizontal: 16,
    marginBottom: 30,
    marginTop: wp('4.8%'),
  },
});

export default styles;

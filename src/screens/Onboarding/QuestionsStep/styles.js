// @flow

import { StyleSheet } from 'react-native';
import { DeviceSize, fs, getDeviceSize, wp } from 'src/helpers';
import { colors, fonts } from 'src/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkViolet,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  titleText: {
    marginBottom: getDeviceSize() <= DeviceSize.small ? 10 : wp('10.6%'),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.sfProSemibold,
    fontSize: fs(8.53),
    lineHeight: fs(10.67),
    color: colors.white,
  },
  questionTitle: {
    fontSize: fs(6.4),
    lineHeight: fs(8.53),
    marginBottom: wp('6.4%'),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.sfProMedium,
    color: colors.white,
  },
  buttonWrapper: {
    marginBottom: 30,
    marginTop: wp('5%'),
  },
});

export default styles;

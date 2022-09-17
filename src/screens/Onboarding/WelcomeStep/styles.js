// @flow

import { StyleSheet } from 'react-native';
import { fs, hp, wp } from 'src/helpers';
import { colors, fonts } from 'src/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkViolet,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  man: {
    position: 'absolute',
    zIndex: 5,
    width: wp('17%'),
    height: wp('55.624%'),
    left: '35%',
    bottom: '0%',
  },
  circle: {
    position: 'absolute',
    bottom: 0,
    left: -16,
    zIndex: 4,
    width: wp('100%'),
    height: wp('123.7%'),
  },
  seven: {
    position: 'absolute',
    left: wp('23%'),
    bottom: wp('74%'),
    width: wp('10.7%'),
    height: wp('16.4%'),
  },
  energy: {
    position: 'absolute',
    right: wp('8%'),
    bottom: wp('74%'),
    width: wp('7.2%'),
    height: wp('11.7%'),
  },
  five: {
    position: 'absolute',
    right: wp('12%'),
    bottom: wp('35%'),
    width: wp('15.2%'),
    height: wp('17.8%'),
    zIndex: 4,
  },
  head: {
    position: 'absolute',
    left: wp('9%'),
    bottom: wp('41%'),
    zIndex: 4,
    width: wp('8.5%'),
    height: wp('10.4%'),
  },
  shadow: {
    position: 'absolute',
    bottom: wp('18.7%'),
    left: wp('15.86%'),
    zIndex: 10,
    width: wp('60%'),
    height: wp('60%'),
  },
  titleText: {
    marginBottom: hp('5%'),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.sfProSemibold,
    fontSize: fs(10.66),
    lineHeight: fs(12.8),
    color: colors.white,
  },
  descriptionText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.sfProMedium,
    fontSize: fs(5.33),
    lineHeight: fs(6.4),
    color: colors.white,
  },
  buttonWrapper: {
    marginBottom: 30,
    marginTop: hp('5%'),
  },
});

export default styles;

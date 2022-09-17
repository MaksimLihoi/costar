// @flow

import { StyleSheet } from 'react-native';

import { colors, fonts } from 'src/variables';
import { moderateScale } from 'react-native-size-matters';
import { fs, hp } from 'src/helpers';
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
  circleTitle: {
    color: colors.white,
    fontFamily: fonts.sfProMedium,
    fontSize: 24,
    lineHeight: 29,
  },
  circleTitleContainer: {
    marginVertical: 23,
  },
  circleDesc: {
    marginTop: hp('5.667%'),
  },
  compatibilityCouple: {
    paddingTop: moderateScale(10, 2),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coupleImageContainer: {
    paddingLeft: moderateScale(30, 2),
  },
  coupleImage: {
    width: moderateScale(200, 2.2),
    height: moderateScale(244, 2.2),
  },
  compatibilityDescription: {
    paddingTop: moderateScale(10, 2),
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.sfProRegular,
    fontSize: fs(4.5),
  },
  cardContainer: {
    marginTop: 48,
  },
});

export default styles;

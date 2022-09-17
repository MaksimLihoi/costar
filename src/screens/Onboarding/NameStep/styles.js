// @flow

import { StyleSheet } from 'react-native';
import { fs, hp, wp } from 'src/helpers';
import { colors, fonts } from 'src/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkViolet,
  },
  flex: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  imageWrapper: {
    width: wp('60%'),
    height: wp('75%'),
    alignSelf: 'center',
  },
  man: {
    position: 'absolute',
    zIndex: 5,
    width: '16%',
    height: '50%',
    left: '35%',
    bottom: '0%',
  },
  circle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 4,
    width: '100%',
    height: '100%',
  },
  seven: {
    position: 'absolute',
    left: '29%',
    bottom: '59%',
    width: '9%',
    height: '15%',
  },
  energy: {
    position: 'absolute',
    right: '12%',
    bottom: '57%',
    width: '7%',
    height: '11%',
  },
  five: {
    position: 'absolute',
    right: '17%',
    bottom: '27%',
    width: '12%',
    height: '15%',
    zIndex: 4,
  },
  head: {
    position: 'absolute',
    left: '14%',
    bottom: '32%',
    zIndex: 4,
    width: '8.5%',
    height: '10.4%',
  },
  shadow: {
    position: 'absolute',
    bottom: '10%',
    left: '20%',
    zIndex: 10,
    width: '60%',
    height: '60%',
  },
  titleText: {
    marginBottom: hp('1.97%'),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.sfProSemibold,
    fontSize: fs(8.53),
    lineHeight: fs(10.67),
    color: colors.white,
  },
  descriptionText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.sfProRegular,
    fontSize: fs(4.4),
    lineHeight: fs(7.2),
    color: colors.white,
  },
  buttonWrapper: {
    marginBottom: 30,
    marginTop: wp('6.4%'),
  },
  inputWrapper: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    width: wp('100%') - 64,
    fontSize: 20,
    color: colors.white,
  },
});

export default styles;

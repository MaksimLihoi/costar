// @flow

import { StyleSheet } from 'react-native';

import { colors, fonts } from 'src/variables';
import { fs, wp } from 'src/helpers';

const styles = StyleSheet.create({
  container: {
    width: wp('27.5%'),
    height: wp('27.5%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: 24,
    width: 24,
  },
  value: {
    color: 'white',
    fontFamily: fonts.sfProMedium,
    fontSize: fs(4.2),
    lineHeight: fs(5),
  },
  title: {
    color: colors.white,
    fontFamily: fonts.sfProRegular,
    fontSize: fs(2.7),
    lineHeight: fs(3.2),
    paddingLeft: 6,
    paddingRight: 6,
    textAlign: 'center',
    marginBottom: 9,
  },
  imgContainer: {
    height: 24,
    marginTop: 16,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    marginBottom: 8,
    borderRadius: 8,
  },
  lockIcon: { width: 14, height: 20 },
});

export default styles;

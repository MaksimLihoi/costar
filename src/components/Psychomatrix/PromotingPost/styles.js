// @flow

import { StyleSheet } from 'react-native';

import { colors, fonts } from 'src/variables';
import { wp } from 'src/helpers';

const styles = StyleSheet.create({
  container: {
    width: wp('100%') - 32,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  leftContainer: {
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  title: {
    fontFamily: fonts.sfProRegular,
    color: colors.darkBlack,
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    paddingVertical: 10,
    width: 144,
  },
  buttonContainer: {
    shadowColor: colors.shadowViolet,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  icon: {
    width: 88,
    height: 88,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;

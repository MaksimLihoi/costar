// @flow

import { StyleSheet } from 'react-native';

import { colors, fonts } from 'src/variables';
import { wp } from 'src/helpers';

const styles = StyleSheet.create({
  container: {
    width: wp('100%') - 32,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  title: {
    color: colors.violet,
    fontFamily: fonts.sfProSemibold,
    fontSize: 16,
    lineHeight: 19,
  },
  description: {
    color: colors.darkBlack,
    fontFamily: fonts.sfProRegular,
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 16,
  },
  titleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  button: {
    paddingVertical: 10,
    width: 120,
    marginTop: 18,
    marginBottom: 18,
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
  buttonText: {
    fontFamily: fonts.sfProSemibold,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lockIcon: {
    width: 88,
    height: 88,
    marginBottom: 13,
    marginTop: 19,
  },
  activityIndicator: {
    position: 'absolute',
    right: -4,
    top: -4,
  },
});

export default styles;

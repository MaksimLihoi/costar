// @flow

import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../variables';
import { wp } from '../../helpers';
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
  switchButtonsContainer: {
    width: wp('100%') - 28,
    marginHorizontal: 14,
    marginTop: 24,
  },
  switchText: {
    fontFamily: fonts.sfProRegular,
    fontSize: 16,
    lineHeight: 19,
    color: colors.gray,
  },
  switchSelectedText: {
    fontFamily: fonts.sfProMedium,
    fontSize: 16,
    lineHeight: 19,
    color: colors.white,
    fontWeight: '500',
  },
  switchTextContainerStyle: {
    backgroundColor: colors.semiTransparentBlack10,
    marginHorizontal: 4,
    borderRadius: 24,
  },
  selectedTextContainerStyle: {
    backgroundColor: colors.semiTransparentBlack40,
    marginHorizontal: 4,
    borderRadius: 24,
  },
});

export default styles;

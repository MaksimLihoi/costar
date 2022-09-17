// @flow

import { StyleSheet } from 'react-native';
import { colors } from 'src/variables';
import { wp } from 'src/helpers';

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
  buttonWrapper: {
    marginBottom: 30,
    marginTop: wp('5%'),
  },
});

export default styles;

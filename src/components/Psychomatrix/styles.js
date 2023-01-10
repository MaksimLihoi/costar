// @flow

import { StyleSheet } from 'react-native';

import { fonts } from 'src/variables';

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.sfProMedium,
    fontSize: 24,
    lineHeight: 29,
    color: 'white',
  },
  titleContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  itemContainer: {
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default styles;

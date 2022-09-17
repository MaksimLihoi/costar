// @flow

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {img} from 'assets/img';
import {colors, fonts} from 'src/variables';

type Props = {
  onPress(): void,
  buttonText: string,
  style: StyleSheet.Styles,
  textStyle?: StyleSheet.Styles,
  withArrowIcon?: boolean,
};
const Button = ({
  onPress,
  buttonText,
  textStyle,
  style,
  withArrowIcon = false,
}: Props) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={colors.purpleGradient}
      style={[styles.container, style]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
      {withArrowIcon && (
        <Image
          source={img.psychomatrix.post.arrowIcon}
          style={styles.arrowIcon}
        />
      )}
    </LinearGradient>
  </TouchableOpacity>
);

export default React.memo<Props>(Button);

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.sfProMedium,
    alignSelf: 'center',
    fontSize: 16,
  },
  arrowIcon: {
    width: 22.5,
    height: 15,
  },
});

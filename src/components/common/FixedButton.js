// @flow

import React, { PureComponent } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from 'src/variables';
import { img } from 'assets/img';

type Props = {
  onPress(): void,
  shouldShowFixedButton: boolean,
};

export class FixedButton extends PureComponent<Props> {
  animatedValue = new Animated.Value(0);

  componentDidUpdate(prevProps) {
    const { shouldShowFixedButton } = this.props;
    if (
      prevProps.shouldShowFixedButton !== shouldShowFixedButton &&
      prevProps.shouldShowFixedButton === false
    ) {
      this.scaleIn();
    }
    if (
      prevProps.shouldShowFixedButton !== shouldShowFixedButton &&
      prevProps.shouldShowFixedButton === true
    ) {
      this.scaleOut();
    }
  }

  scaleIn = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  scaleOut = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { onPress } = this.props;
    const scaleButton = {
      transform: [{ scale: this.animatedValue }],
    };
    return (
      <Animated.View style={[styles.fixedButtonContainer, scaleButton]}>
        <TouchableOpacity onPress={onPress}>
          <Image source={img.arrowTop} style={styles.fixedButtonImage} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 15,
    borderRadius: 25,
    right: 20,
    zIndex: 3,
    height: 44,
    width: 44,
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedButtonImage: {
    width: 28,
    height: 15,
  },
});

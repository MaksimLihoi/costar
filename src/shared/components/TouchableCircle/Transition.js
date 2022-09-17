// @flow

import React, { PureComponent } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

type Props = {
  interval: number,
  borderColor: string,
  backgroundColor: string,
  size: number,
};

class Transition extends PureComponent<Props> {
  anim = new Animated.Value(0);

  componentDidMount() {
    const { interval } = this.props;
    Animated.timing(this.anim, {
      toValue: 1,
      easing: Easing.linear,
      duration: interval,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { borderColor, backgroundColor, size } = this.props;
    return (
      <View style={styles.wrapper}>
        <Animated.View
          style={[
            styles.border,
            {
              borderColor,
              backgroundColor,
              width: this.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [15, size],
              }),
              height: this.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [15, size],
              }),
              borderRadius: size / 2,
              opacity: this.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}
        />
      </View>
    );
  }
}

export default Transition;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
  border: {
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
});

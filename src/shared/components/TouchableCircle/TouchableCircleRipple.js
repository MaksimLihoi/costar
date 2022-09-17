// @flow

import React, { PureComponent } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';

import Transition from './Transition';

type Props = {
  isVisible: boolean,
  size?: number,
  interval?: number,
  duration?: number,
  borderColor?: string,
  backgroundColor?: string,
  onPress(): void,
  children: React.Node,
};

type State = {
  pulse: Array<number>,
};

class TouchableCircleRipple extends PureComponent<Props, State> {
  setInterval = null;

  anim = new Animated.Value(1);

  state = {
    pulse: [],
  };

  componentDidMount() {
    this.setCircleInterval();
  }

  setCircleInterval = () => {
    const { interval } = this.props;
    this.setInterval = setInterval(this.updateRipple.bind(this), interval);
    this.updateRipple();
  };

  updateRipple = () => {
    const { pulse } = this.state;
    this.setState({ pulse: [...pulse, 1] });
  };

  onPressIn = () => {
    const { duration } = this.props;
    Animated.timing(this.anim, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => clearInterval(this.setInterval));
  };

  onPressOut = () => {
    const { duration, onPress } = this.props;
    Animated.timing(this.anim, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(this.setCircleInterval);
    onPress();
  };

  render() {
    const {
      style,
      isVisible,
      backgroundColor,
      borderColor,
      size,
      interval,
      children,
    } = this.props;
    const { pulse } = this.state;
    return (
      <TouchableOpacity
        style={style}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {isVisible &&
          pulse &&
          pulse.map((element, index) => (
            <Transition
              key={index}
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              size={size}
              interval={interval}
            />
          ))}
        {children}
      </TouchableOpacity>
    );
  }
}

TouchableCircleRipple.defaultProps = {
  size: 50,
  interval: 750,
  pressInValue: 0.3,
  duration: 3,
  borderColor: '#4CAF50',
  backgroundColor: 'transparent',
};

export default TouchableCircleRipple;

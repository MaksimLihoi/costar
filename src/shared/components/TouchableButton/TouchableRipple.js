import React, { Component } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';
import Transition from './Transition';

type Props = {
  size: number,
  interval: number,
  pulseMax: number,
  pressInValue: number,
  Duration: number,
  borderColor: string,
  backgroundColor: string,
};

class TouchableRipple extends Component {
  constructor(props) {
    super(props);
    this.setInterval = null;
    this.anim = new Animated.Value(1);
  }

  static defaultProps = {
    size: 400,
    interval: 750,
    pressInValue: 0.3,
    Duration: 3,
    pressInEasing: Easing.in,
    pressOutEasing: Easing.in,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  };

  state = {
    pulse: [],
  };

  componentDidMount() {
    this.setIntervalEffect();
  }

  setIntervalEffect = () => {
    const { interval } = this.props;
    this.setInterval = setInterval(this.updateRipple.bind(this), interval);
    this.updateRipple();
  };

  updateRipple = () => {
    this.setState({ pulse: [...this.state.pulse, 1] });
  };

  onPressIn = () => {
    const { Duration, pressInValue, pressInEasing } = this.props;
    Animated.timing(this.anim, {
      toValue: pressInValue,
      duration: Duration,
      easing: pressInEasing,
      useNativeDriver: true,
    }).start(this.setIntervalEffect.bind(this));
  };

  onPressOut = () => {
    const { Duration, pressOutEasing, onPress } = this.props;
    Animated.timing(this.anim, {
      toValue: 1,
      duration: Duration,
      easing: pressOutEasing,
      useNativeDriver: true,
    }).start(() => clearInterval(this.setInterval));
    onPress();
  };

  render() {
    const { style, children } = this.props;
    const { pulse } = this.state;
    return (
      <TouchableOpacity
        style={style}
        onPressIn={this.onPressIn.bind(this)}
        onPressOut={this.onPressOut.bind(this)}>
        {pulse &&
          pulse.map((element, index) => (
            <Transition key={index} {...this.props} />
          ))}
        {children}
      </TouchableOpacity>
    );
  }
}

export default TouchableRipple;

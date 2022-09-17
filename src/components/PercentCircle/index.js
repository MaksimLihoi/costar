/*
 * некоторые пропсы захардкожены
 * https://github.com/bartgryszko/react-native-circular-progress#configuration
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import CircularProgress from './CircularProgress';

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class PercentCircle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fillAnimation: new Animated.Value(props.prefill),
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate() {
    this.animate(0);
    setTimeout(() => this.animate(), 500);
  }

  reAnimate(prefill, toVal, dur, ease) {
    this.setState(
      {
        fillAnimation: new Animated.Value(prefill),
      },
      () => this.animate(toVal, dur, ease),
    );
  }

  animate(toVal, dur, ease) {
    const { fill } = this.props;
    const toValue = toVal >= 0 ? toVal : fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;

    const { fillAnimation } = this.state;

    const anim = Animated.timing(fillAnimation, {
      toValue,
      easing,
      duration,
      useNativeDriver: false,
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  render() {
    const { fill, prefill, ...other } = this.props;
    const { fillAnimation } = this.state;

    return <AnimatedProgress {...other} fill={fillAnimation} />;
  }
}

PercentCircle.propTypes = {
  ...CircularProgress.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
};

PercentCircle.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
  useNativeDriver: true,
};

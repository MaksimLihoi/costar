// @flow

import { Animated } from 'react-native';

const AnimateOption = (
  startValue: number,
  endValue: number,
  options: Object = {},
) => {
  const param = new Animated.Value(startValue);

  Animated.timing(param, {
    toValue: endValue,
    ...options,
  }).start();

  return param;
};

const Animate = (options: Object = {}, callBack = () => {}) => {
  const param = new Animated.Value(0);

  Animated.timing(param, {
    toValue: 1,
    ...options,
  }).start(callBack);

  return param;
};

export { AnimateOption, Animate };

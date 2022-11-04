// @flow

import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const screenHeight =
  Platform.OS === 'android'
    ? Dimensions.get('window').height - StatusBar.currentHeight
    : Dimensions.get('window').height;

export const DeviceSize = Object.freeze({
  xsmall: 0,
  small: 1,
  normal: 2,
  large: 3,
  xlarge: 4,
});

export function getDeviceSize() {
  if (Platform.OS === 'ios') {
    if (
      (screenWidth <= 320 && screenHeight <= 480) ||
      (screenWidth <= 480 && screenHeight <= 320)
    ) {
      // iphone 4 spec
      return DeviceSize.xsmall;
    }
    if (
      (screenWidth <= 320 && screenHeight <= 568) ||
      (screenWidth <= 568 && screenHeight <= 320)
    ) {
      // iphone 5 spec
      return DeviceSize.small;
    }
    if (
      (screenWidth <= 375 && screenHeight <= 667) ||
      (screenWidth <= 667 && screenHeight <= 375)
    ) {
      // iphone 6 spec
      return DeviceSize.normal;
    }
    if (
      (screenWidth <= 414 && screenHeight <= 736) ||
      (screenWidth <= 736 && screenHeight <= 414)
    ) {
      // iphone 6 plus spec
      return DeviceSize.large;
    }
    // greater then inphone 6 plus, such as tablets
    return DeviceSize.xlarge;
  }

  // size spec from: https://developer.android.com/guide/practices/screens_support.html
  // xlarge screens are at least 960dp x 720dp
  // large screens are at least 640dp x 480dp
  // normal screens are at least 470dp x 320dp
  // small screens are at least 426dp x 320dp
  if (
    (screenWidth >= 960 && screenHeight >= 720) ||
    (screenWidth >= 720 && screenHeight >= 960)
  ) {
    return DeviceSize.xlarge;
  }
  if (
    (screenWidth >= 640 && screenHeight >= 480) ||
    (screenWidth >= 480 && screenHeight >= 640)
  ) {
    return DeviceSize.large;
  }
  if (
    (screenWidth >= 470 && screenHeight >= 320) ||
    (screenWidth >= 320 && screenHeight >= 470)
  ) {
    return DeviceSize.normal;
  }
  if (
    (screenWidth >= 426 && screenHeight >= 320) ||
    (screenWidth >= 320 && screenHeight >= 426)
  ) {
    return DeviceSize.small;
  }
  return DeviceSize.xsmall;
}

const widthPercentageToDP = (widthPercent: string) => {
  const elemWidth = parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (heightPercent: string) => {
  const elemHeight = parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export { widthPercentageToDP as wp, heightPercentageToDP as hp };

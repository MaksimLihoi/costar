import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import {
  Defs,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
  Svg,
} from 'react-native-svg';
import { wp } from '../../helpers';

import styles from './styles';

export default class CircularProgress extends PureComponent {
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  circlePath(x, y, radius, startAngle, endAngle) {
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ];
    return d.join(' ');
  }

  clampFill = (fill) => Math.min(100, Math.max(0, fill));

  render() {
    const {
      size,
      width,
      backgroundWidth,
      style,
      rotation,
      lineCap,
      arcSweepAngle,
      fill,
    } = this.props;

    const maxWidthCircle = backgroundWidth
      ? Math.max(width, backgroundWidth)
      : width;

    const backgroundPath = this.circlePath(
      size / 2,
      size / 2,
      size / 2 - maxWidthCircle / 2,
      0,
      arcSweepAngle,
    );
    const circlePath = this.circlePath(
      size / 2,
      size / 2,
      size / 2 - maxWidthCircle / 2,
      0,
      (arcSweepAngle * this.clampFill(fill)) / 100,
    );
    const offset = size - maxWidthCircle * 2;

    const localChildrenContainerStyle = {
      position: 'absolute',
      left: maxWidthCircle,
      top: maxWidthCircle,
      width: offset,
      height: offset,
      borderRadius: offset / 2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    };

    return (
      <View
        style={{
          height: wp('65.700%'),
          width: wp('65.700%'),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#6a36c4',
          borderRadius: 500,
        }}>
        <View style={style}>
          <Svg
            width={size}
            height={size}
            style={{ backgroundColor: 'transparent' }}>
            <G rotation={rotation} originX={size / 2} originY={size / 2}>
              <Defs>
                <LinearGradient id='innerGrad' x1='0' y1='0' x2='120' y2='0'>
                  <Stop offset='0' stopColor='#462DA1' stopOpacity='0.2' />
                  <Stop offset='1' stopColor='#5033AE' stopOpacity='0.6' />
                </LinearGradient>
                <RadialGradient
                  id='grad'
                  cx='150'
                  cy='75'
                  rx='85'
                  ry='55'
                  fx='150'
                  fy='75'
                  gradientUnits='userSpaceOnUse'>
                  <Stop offset='0' stopColor='#451c84' stopOpacity='1' />
                  <Stop offset='1' stopColor='#6311ad' stopOpacity='1' />
                </RadialGradient>
              </Defs>
              <Path
                d={backgroundPath}
                stroke='url(#grad)'
                strokeWidth={backgroundWidth || width}
                strokeLinecap={lineCap}
                fill='url(#innerGrad)'
              />
              {fill > 0 && (
                <Path
                  d={circlePath}
                  stroke='#977cff'
                  strokeWidth={width}
                  strokeLinecap={lineCap}
                  fill='transparent'
                />
              )}
            </G>
          </Svg>
          <View style={localChildrenContainerStyle}>
            <View style={styles.box}>
              <View>
                <Text style={styles.text}>{Math.round(fill)}</Text>
              </View>
              <View style={styles.percentSymbolContainer}>
                <Text style={styles.percentSymbol}>%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number,
  backgroundWidth: PropTypes.number,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
};

CircularProgress.defaultProps = {
  rotation: 90,
  lineCap: 'round',
  arcSweepAngle: 360,
  size: wp('58.454%'),
  width: wp('3.623%'),
  style: { borderRadius: 500 },
};

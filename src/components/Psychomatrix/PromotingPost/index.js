// @flow

import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Button from 'src/shared/components/Button';
import couple1 from 'assets/images/psychomatrix/post/couple1.png';
import couple2 from 'assets/images/psychomatrix/post/couple2.png';
import { resources } from '../../../shared';
import styles from './styles';
import { NavigationContext } from '@react-navigation/native';
import { BottomTabNavigatorRouts } from '../../../variables/navigationRouts';
import { trackEvent } from '../../../shared/analytics';
import { Events } from '../../../shared/analytics/events';

type Props = {
  index: number,
};

class PromotingPost extends PureComponent<Props> {
  static contextType = NavigationContext;

  onPress = () => {
    const { index } = this.props;

    let navigation = this.context;
    trackEvent(Events.Personality.TryItNowButtonClick);
    navigation.navigate(BottomTabNavigatorRouts.Compatibility);
  };

  render() {
    const { index } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrapper} onPress={this.onPress}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>
              {resources.t('POST.TRY_LOVE_COMPATIBILITY')}
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                buttonText={resources.t('POST.TRY_NOW')}
                onPress={this.onPress}
                style={styles.button}
                withArrowIcon
              />
            </View>
          </View>
          <View>
            {index === 0 ? (
              <Image source={couple1} style={styles.icon} />
            ) : (
              <Image source={couple2} style={styles.icon} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PromotingPost;

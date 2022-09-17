// @flow

import React, { useCallback } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { img } from 'assets/img';
import { colors, fonts } from 'src/variables';

type Props = {
  iconSource: any,
  name: string,
  link: string,
};

const Card = ({ iconSource, name, link, navigation }: Props) => {
  const handleClick = useCallback(() => {
    if (link) {
      Linking.openURL(link);
    }
  }, []);

  const handleFAQClick = useCallback(() => {
    navigation.navigate('FAQ');
  }, []);

  return (
    <TouchableOpacity
      onPress={link && name !== 'FAQ' ? handleClick : handleFAQClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={iconSource} style={styles.icon} />
          <Text style={styles.description}>{name}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Image
            source={img.feedback.externalLink}
            style={styles.externalLink}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo<Props>(Card);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 16,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 0.4,
    alignItems: 'flex-end',
  },
  icon: {
    width: 50,
    height: 50,
  },
  description: {
    color: colors.black,
    fontSize: 16,
    paddingLeft: 15,
    fontFamily: fonts.sfProMedium,
  },
  externalLink: {
    width: 20,
    height: 20,
  },
});

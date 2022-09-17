// @flow

import React, { PureComponent } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { verticalScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { img } from 'assets/img';

import { resources } from 'src/shared/i18n/configuration';
import { colors, fonts } from 'src/variables';
import Card from './Card';
import items from './configuration';

type Props = {
  feedbackLinks: Array<{ id: number, name: string, link: string }>,
};

class Feedback extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { feedbackLinks } = this.props;
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.scrollViewContainer}>
            <TouchableOpacity
              style={styles.iconBackContainer}
              onPress={this.goBack}>
              <Image source={img.iconBack} style={styles.iconBack} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {resources.t('FEEDBACK.SCREEN_TITLE')}
              </Text>
              <Text style={styles.subtitle}>
                {resources.t('FEEDBACK.SCREEN_SUBTITLE')}
              </Text>
            </View>
            <View style={styles.listContainer}>
              {feedbackLinks && feedbackLinks.length
                ? feedbackLinks.map((feedbackItem) => {
                    const foundItem = items.find(
                      (item) => item.name === feedbackItem.name,
                    );
                    return (
                      <Card
                        iconSource={foundItem.iconSource}
                        name={feedbackItem.name}
                        key={feedbackItem.name}
                        link={feedbackItem.link}
                      />
                    );
                  })
                : null}
              {resources.t('PREFERENCES.REQUEST_LANGUAGE') === 'en' && (
                <Card iconSource={img.feedback.faq} name='FAQ' link={null} />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  feedbackLinks: state.feedbackLinks,
});

export default connect(mapStateToProps, null)(Feedback);

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.lighterViolet,
  },
  container: {
    flex: 1,
    backgroundColor: colors.lighterViolet,
    alignItems: 'center',
  },
  scrollViewContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  titleContainer: {
    ...ifIphoneX({ paddingVertical: 30 }, { paddingTop: 15 }),
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontFamily: fonts.sfProMedium,
    textAlign: 'center',
    paddingBottom: verticalScale(10),
  },
  subtitle: {
    color: colors.white,
    fontFamily: fonts.sfProMedium,
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
  iconBack: {
    width: 20,
    height: 19.7,
  },
  iconBackContainer: {
    flex: 1,
    paddingTop: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

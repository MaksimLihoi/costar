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

import { colors, fonts } from 'src/variables';
import iconBack from 'assets/images/iconBack.png';
import AccordionView from './AccordionView';

type Props = {
  FAQItems: Array<Object>,
};

class FAQ extends PureComponent<Props> {
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { FAQItems } = this.props;
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.scrollViewContainer}>
            <TouchableOpacity
              style={styles.iconBackContainer}
              onPress={this.goBack}>
              <View style={styles.backButton}>
                <Image source={iconBack} style={styles.iconBack} />
                <Text style={styles.backText}>Feedback</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>FAQ</Text>
              <Text style={styles.subtitle}>How can we help you?</Text>
            </View>
            {FAQItems && FAQItems.length
              ? FAQItems.map((FAQItem) => (
                  <AccordionView sections={FAQItem} key={FAQItem[0].title} />
                ))
              : null}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const FAQItems = state.FAQ.map((item) => {
    const array = [];
    const newItem = {
      title: item.question,
      content: item.answer,
    };

    return [...array, newItem];
  });
  return {
    FAQItems,
  };
};

export default connect(mapStateToProps, null)(FAQ);

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
    paddingBottom: 20,
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
    height: 19.5,
  },
  iconBackContainer: {
    flex: 1,
    paddingTop: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: colors.white,
    fontFamily: fonts.sfProMedium,
    fontSize: 16,
    paddingLeft: 10,
  },
});

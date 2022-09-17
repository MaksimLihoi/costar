// @flow

import React, { PureComponent } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Accordion from 'react-native-collapsible/Accordion';
import { colors, fonts } from 'src/variables';
import { img } from 'assets/img';

type Props = {
  sections: Array<{ title: string, content: string }>,
};

type State = {
  activeSection: ?number,
  inactiveSection: ?number,
};

class AccordionView extends PureComponent<Props, State> {
  state = {
    activeSection: null,
    inactiveSection: null,
  };

  spinValue = new Animated.Value(0);

  spinner = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  renderHeader = (
    section: Array<{ title: string, content: string }>,
    index: number,
    isActive: boolean,
  ) => {
    const { inactiveSection } = this.state;
    if (isActive || inactiveSection === index) {
      this.spin();
    }
    return (
      <View style={isActive ? styles.activeHeader : styles.inactiveHeader}>
        <Text style={styles.headerText}>{section.title}</Text>
        <Animated.Image
          style={[
            (isActive || inactiveSection === index) && {
              transform: [{ rotate: this.spinner }],
            },
            styles.icon,
          ]}
          source={img.feedback.openIcon}
        />
      </View>
    );
  };

  renderContent = (
    section: Array<{ title: string, content: string }>,
    index: number,
    isActive: boolean,
  ) => (
    <Animatable.View
      duration={200}
      easing='ease-in-out-cubic'
      transition='backgroundColor'
      style={[
        isActive ? styles.activeColor : styles.inactiveColor,
        styles.content,
      ]}>
      <Text style={styles.contentText}>{section.content}</Text>
    </Animatable.View>
  );

  updateSections = (activeSections: Array<number>) => {
    const { activeSection } = this.state;

    this.setState({ inactiveSection: activeSection });
    this.setState({
      activeSection: activeSections.length ? activeSections[0] : null,
    });
  };

  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { activeSection } = this.state;
    const { sections } = this.props;
    return (
      <Accordion
        sections={sections}
        activeSections={activeSection !== null ? [activeSection] : []}
        renderHeader={this.renderHeader}
        touchableComponent={TouchableWithoutFeedback}
        renderContent={this.renderContent}
        onChange={this.updateSections}
      />
    );
  }
}

export default AccordionView;

const styles = StyleSheet.create({
  inactiveHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  activeHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    flex: 0.9,
    color: colors.black,
    fontFamily: fonts.sfProMedium,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    marginBottom: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.black,
    fontFamily: fonts.sfProLight,
  },
  activeColor: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactiveColor: {
    backgroundColor: 'rgba(245,252,255,0)',
  },
  icon: {
    height: 20,
    width: 20,
  },
});

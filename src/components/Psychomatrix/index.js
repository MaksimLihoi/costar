// @flow

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollIntoView } from 'react-native-scroll-into-view';

import { resources } from '../../shared';
import PsychosomaticPost from './PsychosomaticPost';
import PsychomatrixItem from './PsychomatrixItem';
import PromotingPost from './PromotingPost';
import FeedbackPost from './FeedbackPost';
import type { SectionType } from './configuration';
import { sections } from './configuration';
import styles from './styles';

type DataItemType = {
  result: string,
  text: string,
};

type DataType = {
  characterWill: DataItemType,
  healthBeauty: DataItemType,
  luck: DataItemType,
  vitalEnergy: DataItemType,
  logicIntuition: DataItemType,
  duty: DataItemType,
  cognitiveCreative: DataItemType,
  laborSkill: DataItemType,
  intellectMemory: DataItemType,
};

type Props = {
  isFetching: boolean,
  isActivePurchase: boolean,
  refresh(): Promise<void>,
  data: DataType,
};

type State = {
  resultIndexes: Array<number>,
};

class Psychomatrix extends PureComponent<Props, State> {
  state = {
    resultIndexes: [],
  };
  static navigationOptions = {
    header: null,
    headerTintColor: 'white',
  };

  sectionsRefs = sections.map(() => React.createRef<any>());

  scrollSectionIntoView = (section: number) => {
    const scrollIntoViewOptions = {
      align: 'top',
      insets: {
        top: 10,
      },
    };

    this.sectionsRefs[section].current.scrollIntoView(scrollIntoViewOptions);
  };

  renderPsychomatrixItem = (
    section: SectionType,
    data: DataType,
    index: number,
  ) => {
    const { resultIndexes } = this.state;
    console.log(resultIndexes);
    return (
      <TouchableOpacity
        key={section.key}
        onPress={() => this.scrollSectionIntoView(section.id)}>
        <PsychomatrixItem
          title={section.title}
          value={
            resultIndexes.find((item) => item === index) !== undefined
              ? data[section.key].result
              : 'NULL'
          }
          icon={section.icon}
        />
      </TouchableOpacity>
    );
  };

  renderPsychosomaticPosts = (
    section: SectionType,
    data: DataType,
    isActivePurchase: boolean,
    refresh: Object,
    isFetching: boolean,
  ) => (
    <React.Fragment key={section.key}>
      <ScrollIntoView ref={this.sectionsRefs[section.id]} onMount={false}>
        <PsychosomaticPost
          id={section.id}
          title={section.title}
          titleIcon={section.titleIcon}
          description={data[section.key].text}
          isActivePurchase={isActivePurchase}
          refresh={refresh}
          isFetching={isFetching}
        />
      </ScrollIntoView>
      {(section.id === 0 || section.id === 3) && (
        <PromotingPost index={section.id} />
      )}
      {section.id === 8 &&
        resources.t('PREFERENCES.REQUEST_LANGUAGE') === 'en' && (
          <FeedbackPost />
        )}
    </React.Fragment>
  );

  getRandomNumber = (firstNumber, count) => {
    const num = Math.floor(Math.random() * count);
    return firstNumber !== num ? num : this.getRandomNumber(firstNumber, count);
  };

  setRandomIndexes = () => {
    const { data } = this.props;
    const { resultIndexes } = this.state;
    const activeIndexes = [];
    sections.forEach(
      (item, index) =>
        data[item.key].result !== '-' && activeIndexes.push(index),
    );
    const firstRandomIndex = this.getRandomNumber(null, activeIndexes.length);
    const secondRandomIndex = this.getRandomNumber(
      firstRandomIndex,
      activeIndexes.length,
    );

    resultIndexes.push(
      activeIndexes[firstRandomIndex],
      activeIndexes[secondRandomIndex],
    );
  };

  render() {
    const { data, isActivePurchase, refresh, isFetching } = this.props;
    this.setRandomIndexes();
    return (
      <>
        <View style={styles.itemContainer}>
          {sections.map((section: SectionType, index) =>
            this.renderPsychomatrixItem(section, data, index),
          )}
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {resources.t('PERSONALITY.PSYCHOMATRIX_DESCRIPTION')}
          </Text>
        </View>

        <View style={styles.postContainer}>
          {sections.map((section: SectionType) =>
            this.renderPsychosomaticPosts(
              section,
              data,
              isActivePurchase,
              refresh,
              isFetching,
            ),
          )}
        </View>
      </>
    );
  }
}

export default Psychomatrix;

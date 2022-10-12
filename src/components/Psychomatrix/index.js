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

class Psychomatrix extends PureComponent<Props> {
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

  renderPsychomatrixItem = (section: SectionType, data: DataType) => (
    <TouchableOpacity
      key={section.key}
      onPress={() => this.scrollSectionIntoView(section.id)}>
      <PsychomatrixItem
        title={section.title}
        value={data[section.key].result}
        icon={section.icon}
      />
    </TouchableOpacity>
  );

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

  render() {
    const { data, isActivePurchase, refresh, isFetching } = this.props;
    return (
      <>
        <View style={styles.itemContainer}>
          {sections.map((section: SectionType) =>
            this.renderPsychomatrixItem(section, data),
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

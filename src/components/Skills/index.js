// @flow

import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import { resources } from '../../shared';
import { Card } from '../common';
import FeedbackPost from '../Psychomatrix/FeedbackPost';
import { img } from '../../../assets/img';
import styles from './styles';

type DataType = {
  result: number,
  description: string,
  strengthsDescription: string,
  weaknessesDescription: string,
  importantDescription: string,
  professionsArray: Array<string>,
};

type Props = {
  isActivePurchase: boolean,
  refresh(): Promise<void>,
  data: DataType,
  isFetching: boolean,
};

class Skills extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
    headerTintColor: 'white',
  };

  renderItem = (title, icon, description, professions) => {
    const { isActivePurchase, refresh, isFetching } = this.props;
    return (
      <Card
        eventSource='personality_skills'
        title={title}
        titleIcon={icon}
        description={description}
        isActivePurchase={isActivePurchase}
        refresh={refresh}
        professions={professions}
        isFetching={isFetching}
      />
    );
  };

  render() {
    const { data } = this.props;
    return data ? (
      <View style={styles.container}>
        <Text style={styles.title}>{resources.t('SKILLS.SKILLS_TITLE')}</Text>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{data.result}</Text>
        </View>
        {this.renderItem(
          resources.t('SKILLS.DESCRIPTION'),
          img.skills.skillsDescriptionIcon,
          data.description,
          data.professionsArray,
        )}
        {this.renderItem(
          resources.t('SKILLS.STRENGTH'),
          img.skills.skillsStrengthIcon,
          data.strengthsDescription,
        )}
        {this.renderItem(
          resources.t('SKILLS.WEAKNESS'),
          img.skills.skillsWeaknessIcon,
          data.weaknessesDescription,
        )}
        {this.renderItem(
          resources.t('SKILLS.IMPORTANT'),
          img.skills.skillsImportantIcon,
          data.importantDescription,
        )}
        {resources.t('PREFERENCES.REQUEST_LANGUAGE') === 'en' && (
          <FeedbackPost />
        )}
      </View>
    ) : null;
  }
}

export default Skills;

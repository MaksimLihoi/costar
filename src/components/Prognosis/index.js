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
  dayName: string,
  dayPhrase: string,
  job: string,
  prosperity: string,
  love: string,
  health: string,
  selfDevelopment: string,
};

type Props = {
  isActivePurchase: boolean,
  refresh(): Promise<void>,
  data: DataType,
  isFetching: boolean,
};

class Prognosis extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
    headerTintColor: 'white',
  };

  renderItem = (title, description, id, icon) => {
    const { isActivePurchase, refresh, isFetching } = this.props;
    return (
      <Card
        eventSource='daily'
        title={title}
        titleIcon={icon}
        description={description}
        isActivePurchase={isActivePurchase}
        refresh={refresh}
        isFetching={isFetching}
        id={id}
      />
    );
  };

  render() {
    const { data } = this.props;
    return data ? (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{data.result}</Text>
        </View>
        <Text style={styles.title}>{`${data.result} - ${data.dayName}`}</Text>
        {this.renderItem(
          resources.t('DAILY_NUMEROLOGY.DAY_PHRASE'),
          data.dayPhrase,
          0,
        )}
        {this.renderItem(
          resources.t('DAILY_NUMEROLOGY.JOB'),
          data.job,
          1,
          img.prognosis.job,
        )}
        {this.renderItem(
          resources.t('DAILY_NUMEROLOGY.PROSPERITY'),
          data.prosperity,
          2,
          img.prognosis.prosperity,
        )}
        {this.renderItem(
          resources.t('DAILY_NUMEROLOGY.LOVE'),
          data.love,
          3,
          img.prognosis.love,
        )}
        {this.renderItem(
          resources.t('DAILY_NUMEROLOGY.HEALTH'),
          data.health,
          4,
          img.prognosis.health,
        )}
        {this.renderItem(
          resources.t('DAILY_NUMEROLOGY.SELF_DEVELOPMENT'),
          data.selfDevelopment,
          5,
          img.prognosis.selfDevelopment,
        )}
        {resources.t('PREFERENCES.REQUEST_LANGUAGE') === 'en' && (
          <FeedbackPost />
        )}
      </View>
    ) : null;
  }
}

export default Prognosis;

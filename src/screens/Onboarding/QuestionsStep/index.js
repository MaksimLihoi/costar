// @flow

import React, { useCallback, useState, useEffect } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Dispatch as ReduxDispatch } from 'redux';

import { resources } from 'src/shared/i18n/configuration';
import { img } from 'assets/img';
import BigButton from 'src/shared/components/BigButton';
import OnboardingQuestion from 'src/components/OnboardingQuestion';
import OnboardingHeader from 'src/components/OnboardingHeader';
import { setSelectedAnswer } from 'src/store/actions';
import questionsConfiguration from '../questionsConfiguration';
import styles from './styles';
import { OnboardingStackNavigatorRouts } from '../../../variables/navigationRouts';
import { useAnalytics } from '../../../shared/analytics';
import { Events } from '../../../shared/analytics/events';

type Props = {
  dispatch: ReduxDispatch,
};

const StepEvent = {
  0: [
    Events.Onboarding.ProblemCheckboxClick,
    Events.Onboarding.ProblemNextButtonClick,
  ],
  1: [
    Events.Onboarding.QualitiesCheckboxClick,
    Events.Onboarding.QualitiesNextButtonClick,
  ],
  2: [
    Events.Onboarding.StrengthsCheckboxClick,
    Events.Onboarding.StrengthsNextButtonClick,
  ],
};

const QuestionsStep = ({ route, navigation, dispatch }: Props) => {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(0);
  const track = useAnalytics();

  const { number } = route.params;

  const onPress = useCallback(() => {
    if (number === 2) {
      dispatch(
        setSelectedAnswer(questionsConfiguration[2].answers[selected].key),
      );
      navigation.navigate(OnboardingStackNavigatorRouts.ProgressStep);
    } else {
      navigation.push(OnboardingStackNavigatorRouts.QuestionsStep, {
        number: number + 1,
      });
    }
    track(StepEvent[number][1]);
  }, [selected]);

  useEffect(() => {
    track(StepEvent[number][0], {
      value: questionsConfiguration[number].answers[0].value,
    });
  }, [number]);

  const handleOptionClick = (selectedNumber, value) => {
    setSelected(selectedNumber);
    track(StepEvent[number][0], { value });
  };

  return (
    <ImageBackground
      source={img.onboarding.firstQuestionScreen}
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}>
      <OnboardingHeader number={3 + number} />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.titleText}>
            {resources.t('ONBOARDING.QUESTION.TITLE')}
          </Text>
          <Text style={styles.questionTitle}>
            {questionsConfiguration[number].question}
          </Text>
          <OnboardingQuestion
            setSelected={handleOptionClick}
            selected={selected}
            number={0}
            answer={questionsConfiguration[number].answers[0].value}
          />
          <OnboardingQuestion
            setSelected={handleOptionClick}
            selected={selected}
            number={1}
            answer={questionsConfiguration[number].answers[1].value}
          />
          <OnboardingQuestion
            setSelected={handleOptionClick}
            selected={selected}
            number={2}
            answer={questionsConfiguration[number].answers[2].value}
          />
          <OnboardingQuestion
            setSelected={handleOptionClick}
            selected={selected}
            number={3}
            answer={questionsConfiguration[number].answers[3].value}
          />
        </View>
        <View>
          <BigButton
            style={styles.buttonWrapper}
            onPress={onPress}
            buttonText={resources.t('ONBOARDING.BUTTONS.NEXT')}
            withArrowIcon
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default connect()(React.memo<Props>(QuestionsStep));

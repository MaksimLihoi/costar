import { call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as types from '../../actions/types';
import * as request from './request';

export function* doubleMatchUp({ womanBirthDate, manBirthDate }) {
  try {
    const response = yield call(
      request.doubleMatchUpRequest,
      womanBirthDate,
      manBirthDate,
    );
    const doubleCompatibility = response.data;
    yield put({
      type: types.DOUBLE_COMPATIBILITY_SUCCESS,
      doubleCompatibility,
      womanBirthDate,
      manBirthDate,
    });
  } catch (error) {
    Alert.alert('Bad internet connection. Try again.');
    yield put({ type: types.DOUBLE_COMPATIBILITY_FAILURE, error });
  }
}

export function* singleMatchUp({ userBirthDate }) {
  try {
    const response = yield call(request.singleMatchUpRequest, userBirthDate);
    const singleCompatibility = response.data;
    yield put({
      type: types.SINGLE_COMPATIBILITY_SUCCESS,
      singleCompatibility,
      singleCompatibilityDate: userBirthDate,
    });
  } catch (error) {
    Alert.alert('Bad internet connection. Try again.');
    yield put({ type: types.SINGLE_COMPATIBILITY_FAILURE, error });
  }
}

export function* getSkills({ userBirthDate }) {
  try {
    const response = yield call(request.getSkillsRequest, userBirthDate);
    const skills = response.data;
    yield put({
      type: types.GET_SKILLS_SUCCESS,
      skills,
      singleCompatibilityDate: userBirthDate,
    });
  } catch (error) {
    Alert.alert('Bad internet connection. Try again.');
    yield put({ type: types.GET_SKILLS_FAILURE, error });
  }
}

export function* getPrognosisToday({ userBirthDate }) {
  try {
    const response = yield call(
      request.getPrognosisRequestToday,
      userBirthDate,
    );

    const prognosis = response.data;
    yield put({
      type: types.GET_PROGNOSIS_TODAY_SUCCESS,
      prognosis,
      singleCompatibilityDate: userBirthDate,
    });
  } catch (error) {
    Alert.alert('Bad internet connection. Try again.');
    yield put({ type: types.GET_PROGNOSIS_TODAY_FAILURE, error });
  }
}

export function* getPrognosisTomorrow({ userBirthDate }) {
  try {
    const response = yield call(
      request.getPrognosisRequestTomorrow,
      userBirthDate,
    );
    const prognosis = response.data;
    yield put({
      type: types.GET_PROGNOSIS_TOMORROW_SUCCESS,
      prognosis,
      singleCompatibilityDate: userBirthDate,
    });
  } catch (error) {
    Alert.alert('Bad internet connection. Try again.');
    yield put({ type: types.GET_PROGNOSIS_TOMORROW_FAILURE, error });
  }
}

export function* getPrognosisYesterday({ userBirthDate }) {
  try {
    const response = yield call(
      request.getPrognosisRequestYesterday,
      userBirthDate,
    );
    const prognosis = response.data;
    yield put({
      type: types.GET_PROGNOSIS_YESTERDAY_SUCCESS,
      prognosis,
      singleCompatibilityDate: userBirthDate,
    });
  } catch (error) {
    Alert.alert('Bad internet connection. Try again.');
    yield put({ type: types.GET_PROGNOSIS_YESTERDAY_FAILURE, error });
  }
}

export function* getFeedbackLinks() {
  try {
    const response = yield call(request.getFeedbackLinksRequest);
    const feedbackLinks = response.data;
    yield put({
      type: types.GET_FEEDBACK_LINKS_SUCCESS,
      feedbackLinks,
    });
  } catch (error) {
    Alert.alert('Bad internet connection. Try again.');
    yield put({ type: types.GET_FEEDBACK_LINKS_FAILURE, error });
  }
}

export function* getFAQ() {
  try {
    const response = yield call(request.getFAQRequest);
    const FAQ = response.data;
    yield put({
      type: types.GET_FAQ_SUCCESS,
      FAQ,
    });
  } catch (error) {
    Alert.alert('Bad internet connection. Try again.');
    yield put({ type: types.GET_FAQ_FAILURE, error });
  }
}

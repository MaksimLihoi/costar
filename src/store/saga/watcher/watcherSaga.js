import { all, takeLatest } from 'redux-saga/effects';
import * as types from '../../actions/types';
import * as api from '../request/apiSaga';

export function* watcherSaga() {
  yield all([
    takeLatest(types.SINGLE_COMPATIBILITY_REQUEST, api.singleMatchUp),
    takeLatest(types.DOUBLE_COMPATIBILITY_REQUEST, api.doubleMatchUp),
    takeLatest(types.GET_SKILLS_REQUEST, api.getSkills),
    takeLatest(types.GET_PROGNOSIS_TODAY_REQUEST, api.getPrognosisToday),
    takeLatest(types.GET_PROGNOSIS_TOMORROW_REQUEST, api.getPrognosisTomorrow),
    takeLatest(
      types.GET_PROGNOSIS_YESTERDAY_REQUEST,
      api.getPrognosisYesterday,
    ),
    takeLatest(types.GET_FEEDBACK_LINKS_REQUEST, api.getFeedbackLinks),
    takeLatest(types.GET_FAQ_REQUEST, api.getFAQ),
  ]);
}

import initialState from './state/initialState';
import * as types from '../actions/types';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTED_ANSWER:
      return { ...state, selectedAnswer: action.selectedAnswer };
    case types.SET_AVAILABLE_PURCHASES:
      return { ...state, availablePurchases: action.availablePurchases };
    case types.GET_FAQ_REQUEST:
      return { ...state, fetching: true, error: null };
    case types.GET_FAQ_SUCCESS:
      return {
        ...state,
        fetching: false,
        FAQ: action.FAQ,
      };
    case types.GET_FAQ_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.GET_FEEDBACK_LINKS_REQUEST:
      return { ...state, fetching: true, error: null };
    case types.GET_FEEDBACK_LINKS_SUCCESS:
      return {
        ...state,
        fetching: false,
        feedbackLinks: action.feedbackLinks,
      };
    case types.GET_FEEDBACK_LINKS_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.SINGLE_COMPATIBILITY_REQUEST:
      return { ...state, fetching: true, error: null };
    case types.SINGLE_COMPATIBILITY_SUCCESS:
      return {
        ...state,
        fetching: false,
        singleCompatibility: action.singleCompatibility,
        singleCompatibilityDate: action.singleCompatibilityDate,
      };
    case types.SINGLE_COMPATIBILITY_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.GET_SKILLS_REQUEST:
      return { ...state, fetching: true, error: null };
    case types.GET_SKILLS_SUCCESS:
      return {
        ...state,
        fetching: false,
        skills: action.skills,
        singleCompatibilityDate: action.singleCompatibilityDate,
      };
    case types.GET_SKILLS_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.GET_PROGNOSIS_TODAY_REQUEST:
      return { ...state, fetching: true, error: null };
    case types.GET_PROGNOSIS_TODAY_SUCCESS:
      return {
        ...state,
        fetching: false,
        prognosisToday: action.prognosis,
        singleCompatibilityDate: action.singleCompatibilityDate,
      };
    case types.GET_PROGNOSIS_TODAY_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.GET_PROGNOSIS_TOMORROW_REQUEST:
      return { ...state, fetching: true, error: null };
    case types.GET_PROGNOSIS_TOMORROW_SUCCESS:
      return {
        ...state,
        fetching: false,
        prognosisTomorrow: action.prognosis,
        singleCompatibilityDate: action.singleCompatibilityDate,
      };
    case types.GET_PROGNOSIS_TOMORROW_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.GET_PROGNOSIS_YESTERDAY_REQUEST:
      return { ...state, fetching: true, error: null };
    case types.GET_PROGNOSIS_YESTERDAY_SUCCESS:
      return {
        ...state,
        fetching: false,
        prognosisYesterday: action.prognosis,
        singleCompatibilityDate: action.singleCompatibilityDate,
      };
    case types.GET_PROGNOSIS_YESTERDAY_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.DOUBLE_COMPATIBILITY_REQUEST:
      return { ...state, fetching: true, error: null };
    case types.DOUBLE_COMPATIBILITY_SUCCESS:
      return {
        ...state,
        fetching: false,
        doubleCompatibility: action.doubleCompatibility,
        womanBirthDate: action.womanBirthDate,
        manBirthDate: action.manBirthDate,
      };
    case types.DOUBLE_COMPATIBILITY_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.SET_REMOTE_CONFIG:
      return { ...state, subscribeScreen: action.config };
    case types.SET_USER_NAME:
      return { ...state, userName: action.name };
    case types.SET_IS_ACTIVE_PURCHASE:
      return { ...state, isActivePurchase: action.isActivePurchase };
    case types.GET_IS_ACTIVE_PURCHASE:
      return state.isActivePurchase;
    default:
      return state;
  }
};

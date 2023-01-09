// @flow

import type { PurchasesPackageType } from 'src/shared/purchases/types';
import * as types from './types';

export const getDoubleCompatibility = (
  womanBirthDate: string,
  manBirthDate: string,
) => ({
  type: types.DOUBLE_COMPATIBILITY_REQUEST,
  womanBirthDate,
  manBirthDate,
});
export const getSingleCompatibility = (userBirthDate: string) => ({
  type: types.SINGLE_COMPATIBILITY_REQUEST,
  userBirthDate,
});

export const getSkills = (userBirthDate: string) => ({
  type: types.GET_SKILLS_REQUEST,
  userBirthDate,
});

export const getPrognosisToday = (userBirthDate: string) => ({
  type: types.GET_PROGNOSIS_TODAY_REQUEST,
  userBirthDate,
});

export const getPrognosisTomorrow = (userBirthDate: string) => ({
  type: types.GET_PROGNOSIS_TOMORROW_REQUEST,
  userBirthDate,
});

export const getPrognosisYesterday = (userBirthDate: string) => ({
  type: types.GET_PROGNOSIS_YESTERDAY_REQUEST,
  userBirthDate,
});

export const setSelectedAnswer = (selectedAnswer: string) => ({
  type: types.SET_SELECTED_ANSWER,
  selectedAnswer,
});

export const getFeedbackLinks = () => ({
  type: types.GET_FEEDBACK_LINKS_REQUEST,
});

export const getFAQ = () => ({
  type: types.GET_FAQ_REQUEST,
});

export const setAvailablePurchases = (
  availablePurchases: Array<PurchasesPackageType>,
) => ({
  type: types.SET_AVAILABLE_PURCHASES,
  availablePurchases,
});

export const setIsActivePurchase = (isActivePurchase: boolean) => ({
  type: types.SET_IS_ACTIVE_PURCHASE,
  isActivePurchase,
});

export const setIsTrialAvailable = (isTrialAvailable: boolean) => ({
  type: types.SET_IS_TRIAL_AVAILABLE,
  isTrialAvailable,
});

export const setIsTrialCompatibilityAvailable = (
  isTrialCompatibilityAvailable: boolean,
) => ({
  type: types.SET_IS_TRIAL_COMPATIBILITY_AVAILABLE,
  isTrialCompatibilityAvailable,
});

export const setRemoteConfig = (config: string) => ({
  type: types.SET_REMOTE_CONFIG,
  config,
});

export const setUserName = (name) => ({
  type: types.SET_USER_NAME,
  name,
});

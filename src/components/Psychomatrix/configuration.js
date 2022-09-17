// @flow

import Chess from 'assets/images/psychomatrix/chess.png';
import Clover from 'assets/images/psychomatrix/clover.png';
import Energy from 'assets/images/psychomatrix/energy.png';
import Handshake from 'assets/images/psychomatrix/handshake.png';
import Head from 'assets/images/psychomatrix/head.png';
import Heart from 'assets/images/psychomatrix/heart.png';
import Lamp from 'assets/images/psychomatrix/lamp.png';
import Path from 'assets/images/psychomatrix/path.png';
import Brain from 'assets/images/psychomatrix/brain.png';

import titleChess from 'assets/images/psychomatrix/post/icons/titleChess.png';
import titleClover from 'assets/images/psychomatrix/post/icons/titleClover.png';
import titleEnergy from 'assets/images/psychomatrix/post/icons/titleEnergy.png';
import titleHandshake from 'assets/images/psychomatrix/post/icons/titleHandshake.png';
import titleHead from 'assets/images/psychomatrix/post/icons/titleHead.png';
import titleHeart from 'assets/images/psychomatrix/post/icons/titleHeart.png';
import titleLamp from 'assets/images/psychomatrix/post/icons/titleLamp.png';
import titlePath from 'assets/images/psychomatrix/post/icons/titlePath.png';
import titleBrain from 'assets/images/psychomatrix/post/icons/titleBrain.png';

import {resources} from '../../shared';

export const sections: Array<SectionType> = [
  {
    id: 0,
    key: 'characterWill',
    title: resources.t('PSYCHOMATRIX.CHARACTER_WILL'),
    icon: Head,
    titleIcon: titleHead,
  },
  {
    id: 1,
    key: 'healthBeauty',
    title: resources.t('PSYCHOMATRIX.HEALTH_AND_BEAUTY'),
    icon: Heart,
    titleIcon: titleHeart,
  },
  {
    id: 2,
    key: 'luck',
    title: resources.t('PSYCHOMATRIX.LUCK'),
    icon: Clover,
    titleIcon: titleClover,
  },
  {
    id: 3,
    key: 'vitalEnergy',
    title: resources.t('PSYCHOMATRIX.VITAL_ENERGY'),
    icon: Energy,
    titleIcon: titleEnergy,
  },
  {
    id: 4,
    key: 'logicIntuition',
    title: resources.t('PSYCHOMATRIX.LOGIC_AND_INTUITION'),
    icon: Chess,
    titleIcon: titleChess,
  },
  {
    id: 5,
    key: 'duty',
    title: resources.t('PSYCHOMATRIX.DUTY'),
    icon: Handshake,
    titleIcon: titleHandshake,
  },
  {
    id: 6,
    key: 'cognitiveCreative',
    title: resources.t('PSYCHOMATRIX.COGNITIVE_AND_CREATIVE'),
    icon: Lamp,
    titleIcon: titleLamp,
  },
  {
    id: 7,
    key: 'laborSkill',
    title: resources.t('PSYCHOMATRIX.LABOR_AND_SKILL'),
    icon: Path,
    titleIcon: titlePath,
  },
  {
    id: 8,
    key: 'intellectMemory',
    title: resources.t('PSYCHOMATRIX.INTELLECT_AND_MEMORY'),
    icon: Brain,
    titleIcon: titleBrain,
  },
];

export type SectionType = {
  id: number,
  key: string,
  title: string,
  icon: any,
  titleIcon: any,
};

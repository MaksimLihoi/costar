import { useEffect } from 'react';
import { activateAdapty, adapty } from 'react-native-adapty';
import appsFlyer from 'react-native-appsflyer';
import logger from '../../utils/logger';

export const useAdapty = () => {
  useEffect(() => {
    activateAdapty({ sdkKey: 'public_live_fabSVYF8.r7jC2ljNCMWNTyjOy0RR' });
  }, []);

  useEffect(() => {
    appsFlyer.onInstallConversionData((installData) => {
      try {
        appsFlyer.getAppsFlyerUID((error, uid) => {
          if (error) {
            logger.error(error);
          } else {
            adapty.updateAttribution(uid, installData, 'AppsFlyer');
          }
        });
      } catch (error) {
        logger.error(error);
      }
    });
  }, []);
};

import Alert from "./Alert";
import * as heartRateAlertSettings from './heartrate';
import * as imuAlertSettings from './imu';
import * as arbitraryAlertSettings from './arbitrary';

export const hr = new Alert(heartRateAlertSettings);
export const imu = new Alert(imuAlertSettings);
export const arbitrary = new Alert(arbitraryAlertSettings);


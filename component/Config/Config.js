import DeviceInfo from 'react-native-device-info';
// 获取设备唯一ID
const uniqueid = DeviceInfo.getUniqueId();

global.APP_MOVIE = {
    base_url: 'http://172.18.28.82',
    uniqueid: uniqueid
}
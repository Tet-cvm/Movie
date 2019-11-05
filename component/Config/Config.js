import DeviceInfo from 'react-native-device-info';
// 获取设备唯一ID
const uniqueid = DeviceInfo.getUniqueId();
const brand = DeviceInfo.getBrand();

global.APP_MOVIE = {
    base_url: 'http://172.18.28.82',
    uniqueid: uniqueid,
    brand: brand,
    market: {
        xiaomi  : 'mimarket://details?id=com.tencent.mm',
        samsung : 'samsungapps://ProductDetail/com.tencent.mm',
        huawei  : 'appmarket://details?id=com.tencent.mm',
        oppo    : 'oppomarket://details?packagename=com.tencent.mm',
        vivo    : 'vivomarket://details?id=com.tencent.mm',
    }
}
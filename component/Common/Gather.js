import React from 'react';
import Toast from 'react-native-root-toast';
import RootSiblings from 'react-native-root-siblings';
import Spinner from 'react-native-loading-spinner-overlay';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import '../Config/Config';

// 接口请求
export function appAxios(url, data, status, aisle, encrypt) {
    return new Promise((res, rej) => {
        fetch(url, {
            method: 'POST',
            mode: "cors",
            body: encrypt ? data : JSON.stringify(data),
            headers: new Headers({
                'Content-Type': aisle ? aisle : 'application/json',
            })
        })
        .then((response) => response.json())
        .then((ret) => {
            res(ret);
        })
        .catch((err) =>{
            status ? rej(err) : appToast('网络错误~');
        });
    });
}

// taost
let toastStatus = true;
export function appToast(message) {
    if (toastStatus) {
        toastStatus = false;
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
        setTimeout(() => {
            toastStatus = true;
        }, 3500);
    }
}

// loading
let sibling;
export function appLoad(message, status) {
    if (status) {
        sibling = new RootSiblings(
            <Spinner
                visible={true}
                textContent={message}
                panelStyle={{
                    width: 82,
                    height: 82,
                    borderRadius: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.78)'
                }}
                textStyle={{
                    top: 26,
                    fontSize: 13,
                    color: '#ffffff',
                    height: 'auto',
                    fontWeight:'normal'
                }}
                color={'#ffffff'}
                animation={'fade'}
                overlayColor={'rgba(0, 0, 0, 0)'}
                size={'small'}
                />
        )
    } else {
        sibling.destroy();
    }
}

// 上报
export const appStorage = new Storage({
    size: 1000, // 最大容量100, 默认1000
    storageBackend: AsyncStorage, // rn => AsyncStorage;  web => window.localStorage
    defaultExpires: null, // 过期时间默认1天(1000 * 3600 * 24毫秒); 为空表示永不过期
    enableCache: true, // 数据缓存到内存中
    sync: { //数据未找到，或找到过期数据的返回
        
    }
})

function unionid(data) {
    return new Promise((res, rej) => {
        appStorage.load({key: data.key})
        .then(ret => {
            res(ret);
        })
        .catch(err => {
            rej(err)
        })
    })
}

export function appReport(sceneid, acttype, type) {
    unionid({
        key: 'unionid'
    })
    .then(res => {
        let userid = String(res); 
        let data = {
            sceneid: sceneid,
            userid: userid,
            acttype: acttype,
            type: type,
            uniqueid: APP_MOVIE.uniqueid,
            brand: APP_MOVIE.brand
            
        };
        axios(data);
    })
    .catch(err => {
        let userid = null;            
        let data = {
            sceneid: sceneid,
            userid: userid,
            acttype: acttype,
            type: type,
            uniqueid: APP_MOVIE.uniqueid,
            brand: APP_MOVIE.brand
            
        };
        axios(data);
    })
}

function axios(data) {
    appAxios(APP_MOVIE.base_url + '/report/report', data)
    .then((res) => {
        if (!res.status) {
            appToast(res.message);
        }
    })
}

// 两端通信
export function appMachine(event, navigate, navigation) {
    try {
        const data = JSON.parse(event.nativeEvent.data);
        switch(data.type)
        {
            case 'onPage':
                navigate('Page', {uri: data.uri})
                break;
            case 'onBack':
                navigation.goBack();
                break;
        }
    } catch(e) {
        console.log(e);
    }
}

export function appPrimal(navigate, uri) {
    try {
        navigate('Page', {uri: uri})
    } catch(e) {
        console.log(e);
    }
}
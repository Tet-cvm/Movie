import React, { Component } from 'react';

import '../Config/Config';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import {appAxios, appToast, appLoad} from '../Common/Gather';

export default class Public extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    // 调用方式
    // @ save Public.storage.save({key: 'key', data: 'data'})
    // @ load
    // Public.storage.load({key: 'key'})
    // .then(ret => {
    // })
    // .catch(err => {
    // })
    // @ remove Public.storage.remove({key: 'key'})
    static storage = new Storage({
        size: 1000, // 最大容量100, 默认1000
        storageBackend: AsyncStorage, // rn => AsyncStorage;  web => window.localStorage
        defaultExpires: null, // 过期时间默认1天(1000 * 3600 * 24毫秒); 为空表示永不过期
        enableCache: true, // 数据缓存到内存中
        sync: { //数据未找到，或找到过期数据的返回
            
        }
    });

    // 调用方式 Public.report();
    static unionid = (data) => {
        return new Promise((res, rej) => {
            Public.storage.load({key: data.key})
            .then(ret => {
                res(ret);
            })
            .catch(err => {
                rej(err)
            })
        })
    }

    static report = (sceneid, acttype, type)=> {
        this.unionid({
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
            this.axios(data);
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
            this.axios(data);
        })
    }

    static axios = (data) => {
        appAxios(APP_MOVIE.base_url + '/report/report', data)
        .then((res) => {
            if (!res.status) {
                // Public.toast(res.message);
                appToast(res.message);
            }
        })
    }

    // 两端通信
    static machine = (event, navigate, navigation) => {
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

    static primal = (navigate, uri) => {
        try {
            navigate('Page', {uri: uri})
        } catch(e) {
            console.log(e);
        }
    }
}
import React, { Component } from 'react';

import Toast from 'react-native-root-toast';
import RootSiblings from 'react-native-root-siblings';
import Spinner from 'react-native-loading-spinner-overlay';
import '../Config/Config';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

export default class Public extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    static sibling;

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

    // 调用方式: Public.toast('网络错误~');
    static toast = (message)=> {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
    }

    // 调用方式 Public.loadShow('登录中...');
    static loadShow = (message)=> {
        sibling =  new RootSiblings(
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
    }

    // 调用方式 Public.loadHide();
    static loadHide = ()=> {
        sibling.destroy();
    }

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
        fetch(APP_MOVIE.base_url + '/report/report', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if (!res.status) {
                Public.toast(res.message);
            }
        })
        .catch((error) =>{
            Public.toast('网络错误~');
        });
    }

    // 两端通信
    static machine = (event, navigate, navigation, that) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            switch(data.type)
            {
                case 'onPage':
                    navigate('Page', {
                        refresh:(data)=>{
                            that._refresh(data);
                        },
                        data: {
                            uri: data.uri
                        }
                    })
                    break;
                case 'onBack':
                    navigation.goBack();
                    navigation.state.params.refresh(data);
                    break;
            }
        } catch(e) {
            console.log(e);
        }
    }

}
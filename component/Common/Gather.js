import React, { Component } from 'react';
import Toast from 'react-native-root-toast';
import RootSiblings from 'react-native-root-siblings';
import Spinner from 'react-native-loading-spinner-overlay';
import {Alert} from 'react-native';

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
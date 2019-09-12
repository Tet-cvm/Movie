import React, { Component } from 'react';

import Toast from 'react-native-root-toast';
import RootSiblings from 'react-native-root-siblings';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Public extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    static sibling;

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
}
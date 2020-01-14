import React, { Component } from 'react';
import '../Config/Config';
import {StatusBar, StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, TouchableHighlight, Alert} from 'react-native';
import Round from '../Common/Round';
import Button from '../Common/Button';
import Public from '../Common/Public';
import {appAxios, appToast, appLoad} from '../Common/Gather';
import { Hoshi } from 'react-native-textinput-effects';
import DeviceInfo from 'react-native-device-info';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: '',
            verifyAccount: false,
            verifyPassword: false,
            disable: true,
            brand: '',
            system: '',
            uniqueid: ''
        }
    }

    componentDidMount() {
        // 设备品牌 & xiaomi
        const brand = DeviceInfo.getBrand();
        // 系统名称 & ios & Android
        const system = DeviceInfo.getSystemName();
        // 获取设备唯一ID
        const uniqueid = DeviceInfo.getUniqueId();

        this.setState({
            brand: brand,
            system: system,
            uniqueid: uniqueid
        });

        Public.report('00005', 'show', 1);
    }

    _onAccount = (account)=> {
        const p_valide = /(1[3-9]\d{9}$)/; //手机正则
        const e_valide = /^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/; //邮箱正则

        let phone = p_valide.test(account);
        let email = e_valide.test(account);

        const verify = (phone || email) ? true : false;
        this.setState({
            account: account,
            verifyAccount: verify
        }, function() {
            this._onToggle();
        });
    }

    _onPassword = (password)=> {
        const valide = /^\d{9,}$/; //验证数字
        let pwd = valide.test(password);
        const verify = pwd ? true : false;
        this.setState({
            password: password,
            verifyPassword: verify
        }, function() {
            this._onToggle();
        });
    }

    _onToggle = ()=> {
        if (this.state.verifyAccount && this.state.verifyPassword) {
            this.setState({disable: false});
        } else {
            this.setState({disable: true});
        }   
    }

    _onSubmit = ()=> {
        Public.report('00005', 'click', 1);
        if (this.state.verifyAccount && this.state.verifyPassword) {
            // Public.loadShow('登录中...');
            appLoad('登录中...', true);
            this._onFetch();
        } else {
            // Public.toast('账户密码输入有误');
            appToast('账户密码输入有误');
        }
    }

    _onFetch = ()=> {
        var data = {
            brand: this.state.brand,
            system: this.state.system,
            uniqueid: this.state.uniqueid,
            account: this.state.account,
            password: this.state.password
        };

        appAxios(APP_MOVIE.base_url + '/signin/register', data, true)
        .then((res) => {
            if (res.status) {
                // Public.loadHide();
                appLoad();
                // Public.toast(res.message);
                appToast(res.message);
                Public.storage.save({key: 'unionid', data: res.key})
                this.props.navigation.goBack();
                this.props.navigation.state.params.refresh();
            } else {
                // Public.loadHide();
                appLoad();
                // Public.toast(res.message);
                appToast(res.message);
            }
        })
        .catch((err) => {
            // Public.loadHide();
            appLoad();
            // Public.toast('网络错误~');
            appToast('网络错误~');
        })

        // fetch(APP_MOVIE.base_url + '/signin/register', {
        //     method: 'POST',
        //     mode: "cors",
        //     body: JSON.stringify(data),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // })
        // .then((response) => response.json())
        // .then((res) => {
        //     if (res.status) {
        //         Public.loadHide();
        //         Public.toast(res.message);
        //         Public.storage.save({key: 'unionid', data: res.key})
        //         this.props.navigation.goBack();
        //         this.props.navigation.state.params.refresh();
        //     } else {
        //         Public.loadHide();
        //         Public.toast(res.message);
        //     }
        // })
        // .catch((error) =>{
        //     Public.loadHide();
        //     Public.toast('网络错误~');
		// });
    }

    render() {
        return (
            <View style={styles.Login}>
                <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} hidden={false} />
                    <Round navigation={this.props.navigation}/>
                    <KeyboardAvoidingView style={styles.Panel} keyboardVerticalOffset={-130} behavior="padding">
                        <View style={styles.Contain}>
                            <Text style={styles.Title}>注册、登录</Text>
                            <Hoshi
                                label={'账户'}
                                placeholder={'请输入手机号或邮箱'}
                                style={{
                                    marginTop: 45,
                                }}
                                labelStyle={{
                                    fontSize: 16,
                                    color: '#333333',
                                }}
                                sageStyle={{
                                    fontSize: 14,
                                    color: '#666666',
                                }}
                                inputStyle={{
                                    fontSize: 17,
                                    color: '#333333',
                                    fontWeight: 'normal'
                                }}
                                selectionColor={'#333333'}
                                maskColor={'#ffffff'}
                                borderColor={'#09bb07'}
                                borderHeight={1}
                                maxLength={28}
                                onChangeText={(account) => this._onAccount(account)}
                                />
                            <Hoshi
                                label={'密码'}
                                placeholder={'请输入密码'}
                                style={{
                                    marginTop: 16
                                }}
                                labelStyle={{
                                    fontSize: 16,
                                    color: '#333333',
                                }}
                                sageStyle={{
                                    fontSize: 14,
                                    color: '#666666',
                                }}
                                inputStyle={{
                                    fontSize: 16,
                                    color: '#333333',
                                    fontWeight: 'normal'
                                }}
                                selectionColor={'#333333'}
                                maskColor={'#ffffff'}
                                borderColor={'#09bb07'}
                                borderHeight={1}
                                maxLength={9}
                                onChangeText={(password) => this._onPassword(password)}
                                />
                            <Button
                                label={'登 录'}
                                panelStyle={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 22,
                                    marginLeft: 17,
                                    width: 248,
                                    height: 38,
                                    backgroundColor: '#10aeff',
                                    borderRadius: 5,
                                }}
                                labelStyle={{
                                    fontSize: 18,
                                    color: '#ffffff',
                                }}
                                disable={this.state.disable}
                                onClick={() => this._onSubmit()}
                                />
                        </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Login: {
        flexDirection: 'column',
    },
    Panel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height-62
    },
    Contain: {
        marginTop: -230,
        width: 282,
    },
    Title: {
        fontSize: 24,
        color: '#333333',
        textAlign: 'center',
    }
})
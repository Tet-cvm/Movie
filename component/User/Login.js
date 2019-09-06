import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, TouchableHighlight, Alert} from 'react-native';
import Round from '../Common/Round';
import Button from '../Common/Button';
import { Hoshi } from 'react-native-textinput-effects';


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: '',
            verifyAccount: false,
            verifyPassword: false,
            disable: true
        }
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
        Alert.alert('_onSubmit');
    }

    render() {
        return (
            <View style={styles.Login}>
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
                                inputStyle={{
                                    fontSize: 16,
                                    color: '#333333',
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
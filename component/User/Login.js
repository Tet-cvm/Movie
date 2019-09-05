import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, Alert, KeyboardAvoidingView, TouchableOpacity} from 'react-native';

import Round from '../Common/Round';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            afocus: false,
            password: '',
            pfocus: false,
        }
    }

    componentDidMount() {
        this.refs.accountInput.focus();
    }

    render() {
        return (
            <View style={styles.Login}>
                <Round navigation={this.props.navigation}/>
                <View style={styles.Container}>
                    <View style={styles.Header}>
                        <Text style={styles.Title}>账号密码登录</Text>
                    </View>
                    <View style={styles.Panel}>
                        <TextInput ref="accountInput"
                            style={styles.Account}
                            placeholder="请输入手机号或邮箱"
                            placeholderTextColor="#999999"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            blurOnSubmit={true}
                            autoFocus={this.state.afocus}
                            onFocus={() => {Alert.alert('focus')}}
                            onChangeText={(account) => this.setState({account:account})}
                            />
                        {/* <TouchableOpacity style={styles.Password} underlayColor="transparent">
                            <TextInput ref="passwordInput"
                                style={{padding: 0}}
                                placeholder="请输入密码"
                                placeholderTextColor="#999999"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                                blurOnSubmit={true}
                                autoFocus={this.state.pfocus}
                                onSubmitEditing={(event) => this.refs.passwordInput.focus()}
                                onFocus={() => {}}
                                onChangeText={(password) => this.setState({password:password})}
                                />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Login: {

    },
    Container: {
        flex: 1,
        width: 375,
        height: '100%',
        position: 'relative',
        backgroundColor: 'cyan'
    },
    Header: {
        marginTop: 80,
        marginLeft: 30
    },
    Title: {
        fontSize: 18,
        color: '#333333'
    },
    Panel: {

    },
    keyboard: {


    },
    Account: {
        padding: 0,
        height: 50,
        backgroundColor: 'pink'
    },
    Password: {
        width: 375,
        height: 80,
        backgroundColor: 'cyan'
    }
})
import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Round from '../Common/Round';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.Login}>
                <Round navigation={this.props.navigation}/>
                <View style={styles.Container}>
                    <Text>Login</Text>
                    <Text>Login</Text>
                    <Text>Login</Text>
                    <Text>Login</Text>
                    <Text>Login</Text>
                    <Text>Login</Text><Text>Login</Text>
                    <Text>Login</Text><Text>Login</Text>
                    <Text>Login</Text><Text>Login</Text>
                    <Text>Login</Text><Text>Login</Text>
                    <Text>Login</Text><Text>Login</Text>
                    <Text>Login</Text><Text>Login</Text>
                    <Text>Login</Text><Text>Login</Text>
                    <Text>Login</Text><Text>Login</Text><Text>Login</Text><Text>Login</Text><Text>Login</Text><Text>Login</Text><Text>Login</Text>
                    <Text>Login</Text><Text>Login</Text><Text>Login</Text><Text>Login</Text>
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
    }
})
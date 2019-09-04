import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Round from '../Common/Round';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.Login}>
                <View>
                    <Round/>
                </View>
                <Text>Login</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'cyan'
    }
})
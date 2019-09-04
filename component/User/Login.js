import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.Login}>
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
    }
})
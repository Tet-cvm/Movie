import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Active extends Component {
    render() {
        return (
            <View style={styles.Active}>
                <Text>Active</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Active: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
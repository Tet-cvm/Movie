import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Active extends Component {
    render() {
        return (
            <View style={styles.Active}>
                <Image style={styles.Photo} source={require('../static/image/developing.png')}/>
                <Text style={styles.oning}>敬请期待...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Active: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Photo: {
        width: 120,
        height: 120
    },
    oning: {
        marginTop: 12,
        fontSize: 18,
        fontWeight: '400',
        color: '#666666'
    }
})
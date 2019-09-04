import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class Round extends Component {
    render() {
        return (
            <View style={styles.Round}>
                <Text>Round</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Round: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
    }
})
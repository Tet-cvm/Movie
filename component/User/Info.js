import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import Back from '../Common/Back';

export default class Info extends Component {
    render() {
        return (
            <View style={styles.Info}>
                <Back navigation={this.props.navigation}/>
                <View style={styles.Container}>
                    <Text>Info</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Info: {
        flex: 1,
        flexDirection: 'column'
    },
    Container: {
        flex: 1,
        backgroundColor: 'yellow'
    }
})
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Round extends Component {
    render() {
        return (
            <View style={styles.Round}>
                <TouchableHighlight style={styles.History} underlayColor="transparent" onPress={()=>{this.props.navigation.goBack()}}>
                    <Ionicons name='ios-arrow-back' size={26} color='#666666'/>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Round: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 45,
        height: 45,
        marginLeft: 14
    },
    History: {
        position: 'relative',
        flex: 1,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
    }
})
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Round extends Component {
    render() {
        return (
            <View style={styles.Round}>
                <TouchableHighlight style={styles.History} underlayColor="transparent" onPress={()=>{this.props.navigation.goBack()}}>
                    <Ionicons name='ios-close' size={28} color='#666666'/>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Round: {
        paddingTop: 18,
        paddingLeft: 14,
        width: 375,
        height: 62
    },
    History: {
        flex: 1,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45
    }
})
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Back extends Component {
    render() {
        return (
            <View style={styles.Back}>
                <View style={styles.Arrow}>
                    <TouchableHighlight style={styles.History} underlayColor="transparent" onPress={()=>{this.props.navigation.goBack()}}>
                        <Ionicons name='ios-arrow-back' size={26} color='#666666'/>
                    </TouchableHighlight>
                </View>
                <View style={styles.Menu}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Back: {
        width: 370,
        height: 45,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d1d1d1',
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    Arrow: {
        flex: 1
    },
    History: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 14,
        width: "100%"
    },
    Menu: {
        flex: 5
    }
})
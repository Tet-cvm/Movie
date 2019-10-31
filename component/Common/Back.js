import React, { Component } from 'react';
import {StyleSheet, Text, Alert, View, TouchableHighlight} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Back extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    _onBack = ()=> {
        this.props.navigation.goBack();
        if (this.props.active) {  // 返回刷新数据
            this.props.navigation.state.params.refresh();
        }
    }

    render() {
        return (
            <View style={styles.Back}>
                <View style={styles.Arrow}>
                    <TouchableHighlight style={styles.History} underlayColor="transparent" onPress={()=>this._onBack()}>
                        <Ionicons name='ios-arrow-back' size={26} color='#ffffff'/>
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
        backgroundColor: '#10aeff',
        flexDirection: 'row'
    },
    Arrow: {
        flex: 1
    },
    History: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 18,
        width: "100%"
    },
    Menu: {
        flex: 5
    }
})
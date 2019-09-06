import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableNativeFeedback} from 'react-native';

export default class Button extends Component {
    render() {
        const {label, disable, panelStyle, labelStyle, onClick} = this.props
        return (
            <TouchableNativeFeedback onPress={onClick.bind(this)}>
                <View style={[panelStyle,
                    {
                        opacity: disable ? 0.38 : 1
                    }
                    ]}>
                    <Text style={labelStyle}>{label}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import Back from '../Common/Back';

export default class Detail extends Component {
    render() {
        return (
            <View style={styles.Detail}>
                <Back navigation={this.props.navigation}/>
                <View style={styles.Container}>
                    <Text>Detail</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Detail: {
        flex: 1,
        flexDirection: 'column'
    },
    Container: {
        flex: 1,
        backgroundColor: 'yellow'
    }
})
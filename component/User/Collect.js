import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Back from '../Common/Back';

export default class Collect extends Component {
    render() {
        return (
            <View style={styles.Collect}>
                <Back navigation={this.props.navigation} active={false}/>
                <View style={styles.Panel}>
                    <Text>Collect</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Collect: {
        flex: 1
    },
    Panel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Back from '../Common/Back';

export default class About extends Component {
    render() {
        return (
            <View style={styles.About}>
                <Back navigation={this.props.navigation} active={false}/>
                <View style={styles.Panel}>
                    <Text>About</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    About: {
        flex: 1
    },
    Panel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
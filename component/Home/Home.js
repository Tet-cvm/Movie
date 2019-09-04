import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.Home}>
                <Text>Home</Text>
                <TouchableHighlight underlayColor="transparent" onPress={()=>{this.props.navigation.navigate('Login')}}>
                    <Text>Login</Text>
                </TouchableHighlight>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <TouchableHighlight underlayColor="transparent" onPress={()=>{this.props.navigation.navigate('Detail')}}>
                    <Text>Detail</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
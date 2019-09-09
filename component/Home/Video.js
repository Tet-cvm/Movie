import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Alert} from 'react-native';

import Back from '../Common/Back';

export default class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
        }
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        this.setState({id: params.id}, function() {
            this._onFetch();
        });
    }

    _onFetch = ()=> {
        fetch('https://mdqygl.cn/Test/movie.json')
        .then((response) => response.json())
        .then((res) => {
            // Alert.alert(res.url);
        })
        .catch((error) =>{

        });
    }

    render() {
        return (
            <View style={styles.Video}>
                <Back navigation={this.props.navigation}/>
                <View style={styles.Container}>
                    <Text>Video</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Video: {
        flex: 1,
        flexDirection: 'column'
    },
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})
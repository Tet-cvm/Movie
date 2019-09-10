import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Alert} from 'react-native';

import Back from '../Common/Back';

export default class Detail extends Component {
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
        fetch('https://mdqygl.cn/Test/detail.json')
        .then((response) => response.json())
        .then((res) => {
            // Alert.alert(res.id.toString());
        })
        .catch((error) =>{

        });
    }

    render() {
        return (
            <View style={styles.Detail}>
                <Back navigation={this.props.navigation}/>
                <View style={styles.Container}>
                    <Text>Detail</Text>
                    <Text>Detail</Text>
                    <TouchableHighlight underlayColor="transparent" onPress={()=>{this.props.navigation.navigate('Player', {id: this.state.id})}}>
                        <Text>go player</Text>
                    </TouchableHighlight>
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
        backgroundColor: '#ffffff'
    }
})
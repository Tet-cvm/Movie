import React, { Component } from 'react';
import {StyleSheet, Dimensions, WebView, Text, Alert, View, TouchableHighlight} from 'react-native';
import Public from '../Common/Public';

export default class Page extends Component {
    constructor(props) {
        super(props)
        this.webView = null;
        this.state = {
            uri: null,
            respond: null,
        }
    }

    // 返回刷新
    _refresh = (data)=> {
        this.setState({respond: data.data}, () => {
            this.webView.postMessage(JSON.stringify(this.state.respond));
        });
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        try {
            this.setState({uri: params.data.uri});
        } catch(e) {
            console.log(e)
        }        
    }

    _onMessage = (event)=> {
        Public.machine(event, this.props.navigation.push, this.props.navigation, this);
    }

    render() {
        return (
            <View style={styles.Page}>
                <WebView
                source={{uri: this.state.uri}}
                style={{width: Dimensions.get('window').width}}
                javaScriptEnabled={true}
                ref={( webView ) => this.webView = webView}
                onMessage={this._onMessage}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
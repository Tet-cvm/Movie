import React, { Component } from 'react';
import {StyleSheet, Dimensions, WebView, Text, Alert, View, TouchableHighlight} from 'react-native';
import {appAxios, appToast, appLoad, appReport, appStorage, appMachine, appPrimal} from '../Common/Gather';

export default class Page extends Component {
    constructor(props) {
        super(props)
        this.webView = null;
        this.state = {
            uri: null,
            respond: null,
        }
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        try {
            this.setState({uri: params.uri});
        } catch(e) {
            console.log(e)
        }        
    }

    _onMessage = (event)=> {
        appMachine(event, this.props.navigation.push, this.props.navigation);
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
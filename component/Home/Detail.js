import React, { Component } from 'react';
import {StyleSheet, Dimensions, Text, View, TouchableHighlight, Alert} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.Detail}>
                <ScrollableTabView
                    tabBarTextStyl={{
                        fontSize: 15,
                        color: '#333333',
                        fontweight: 'normal',
                        lineHeight: 15,
                    }}
                    tabBarUnderlineStyle={{
                        width: 26,
                        height: 2,
                        bottom: 0,
                        marginLeft: ((Dimensions.get('window').width / 3) -26) / 2,
                        backgroundColor: '#10aeff'
                    }}
                    tabBarInactiveTextColor={'#333333'}
                    tabBarActiveTextColor={'#10aeff'}
                    >
                    <View tabLabel="推荐" style={styles.Suggest}>
                        <Text>1111111</Text>
                    </View>
                    <View tabLabel="剧集" style={styles.Gather}>
                        <Text>2222222</Text>
                    </View>
                    <View tabLabel="详情" style={styles.Matter}>
                        <Text>3333333</Text>
                    </View>
                </ScrollableTabView> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Detail: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    Suggest: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    Gather: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    Matter: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
})
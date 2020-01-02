import React, { Component } from 'react';
import {StyleSheet, Dimensions, Text, View, TouchableHighlight, Alert, Image} from 'react-native';
import '../Config/Config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Public from '../Common/Public';

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    _onMap = () => {
        Public.primal(this.props.navigation.navigate, this.props.jump);
    }

    _onCollect = ()=> {
        if (this.props.login) {
            const data = {
                id: this.props.id,
                uniqueid: APP_MOVIE.uniqueid
            };
            fetch(APP_MOVIE.base_url + '/home/collect', {
                method: 'POST',
                mode: "cors",
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.status) {
                    this.props.onRefLove(res.collect);
                    Public.toast(res.message);
                }
            })
            .catch((error) =>{
                Public.toast('网络错误~');
            });
        } else {
            this.props.navigation.navigate('Login', {
                refresh:()=>{
                    this._refresh();
                }
            });
        }
    }

    // 登录返回刷新
    _refresh = ()=> {
        this.props.onRefLogin();
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
                        marginLeft: ((Dimensions.get('window').width / 2) -26) / 2,
                        backgroundColor: '#10aeff'
                    }}
                    tabBarInactiveTextColor={'#333333'}
                    tabBarActiveTextColor={'#10aeff'}
                    >
                    <View tabLabel="推荐" style={styles.Suggest}>
                        <TouchableHighlight underlayColor="transparent" style={styles.Dollar} onPress={()=>{ this._onMap() }}>
                            <Image style={styles.Map} source={this.props.imap ? {uri: this.props.imap} : require('../static/image/imap.jpg')}/>
                        </TouchableHighlight>
                    </View>
                    <View tabLabel="详情" style={styles.Matter}>
                        <View style={styles.Collect}>
                            <View>
                                <Text style={styles.Star}>作者: { this.props.data.star }</Text>
                                <Text style={styles.Series}>类型: { this.props.data.series }</Text>
                            </View>
                            <TouchableHighlight underlayColor="transparent" style={styles.Love} onPress={()=>{ this._onCollect() }}>
                                <AntDesign name='hearto' size={22} color={this.props.data.collect ? '#10aeff':'#333333'}/>
                            </TouchableHighlight>
                        </View>
                        <View>
                            <Text style={styles.Describe}>简介: { this.props.data.describe }</Text>
                        </View>
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
    Dollar: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    Map: {
        marginTop: 82,
        width: 280,
        height: 198,
        backgroundColor: '#c7c7c7',
    },
    Gather: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    Matter: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    Collect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Love: {
        marginRight: 24
    },
    Star: {
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 14,
        fontSize: 15,
        color: '#333333',
        fontWeight: '400'
    },
    Series: {
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 8,
        fontSize: 14,
        color: '#666666',
    },
    Describe: {
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 8,
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    }
})
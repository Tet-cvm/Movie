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

    _onStarry = () => {
        if (this.props.starry.url) {
            Public.primal(this.props.navigation.navigate, this.props.starry.url);
        }
    }

    _onChasm = () => {
        if (this.props.chasm.url) {
            Public.primal(this.props.navigation.navigate, this.props.chasm.url);
        }
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
                        <View>
                            <TouchableHighlight underlayColor="transparent" onPress={()=>{ this._onStarry() }}>
                                <Image style={styles.Starry} source={this.props.starry.image ? {uri: this.props.starry.image} : require('../static/image/starry.png')}/>
                            </TouchableHighlight>
                        </View>
                        <View>
                            <TouchableHighlight underlayColor="transparent" onPress={()=>{ this._onChasm() }}>
                                <Image style={styles.Chasm} source={this.props.chasm.image ? {uri: this.props.chasm.image} : require('../static/image/chasm.png')}/>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View tabLabel="详情" style={styles.Matter}>
                        <View style={styles.Collect}>
                            <View>
                                <Text style={styles.Star}>作者: { this.props.videoData.star }</Text>
                                <Text style={styles.Series}>类型: { this.props.videoData.series }</Text>
                            </View>
                            <TouchableHighlight underlayColor="transparent" style={styles.Love} onPress={()=>{ this._onCollect() }}>
                                <AntDesign name='hearto' size={22} color={this.props.videoData.collect ? '#10aeff':'#333333'}/>
                            </TouchableHighlight>
                        </View>
                        <View>
                            <Text style={styles.Describe}>简介: { this.props.videoData.describe }</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    Starry: {
        marginTop: 46,
        width: 280,
        height: 198,
    },
    Chasm: {
        width: Dimensions.get('window').width,
        height: 76,
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
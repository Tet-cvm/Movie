import React, { Component } from 'react';
import {StyleSheet, Dimensions, Text, View, ScrollView, TouchableHighlight, Alert, Image} from 'react-native';
import '../Config/Config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Public from '../Common/Public';
import {appAxios, appToast, appLoad} from '../Common/Gather';

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

            appAxios(APP_MOVIE.base_url + '/home/collect', data)
            .then((res) => {
                if (res.status) {
                    this.props.onRefLove(res.collect);
                    // Public.toast(res.message);
                    appToast(res.message);
                }
            })

            // fetch(APP_MOVIE.base_url + '/home/collect', {
            //     method: 'POST',
            //     mode: "cors",
            //     body: JSON.stringify(data),
            //     headers: new Headers({
            //         'Content-Type': 'application/json',
            //     })
            // })
            // .then((response) => response.json())
            // .then((res) => {
            //     if (res.status) {
            //         this.props.onRefLove(res.collect);
            //         Public.toast(res.message);
            //     }
            // })
            // .catch((error) =>{
            //     Public.toast('网络错误~');
            // });
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
        let playData = this.props.playData;
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
                    <ScrollView tabLabel="详情" style={styles.Matter}>
                        <View style={styles.Gather}>
                            {
                                playData && playData.map((item, index)=>(
                                    <View 
                                        style={{
                                            marginTop: 8,
                                            marginRight: 12,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            minWidth: 16,
                                            height: 30,
                                            borderColor: item.status ? '#10aeff' : '#d1d1d1',
                                            borderRadius: 3,
                                            borderWidth: 0.5
                                        }}
                                        key={index}
                                        >
                                        <TouchableHighlight underlayColor="transparent" onPress={() => this.props.onGather(index)}>
                                            <View style={styles.Pitch}>
                                                <Text style={{
                                                        fontSize: 15,
                                                        color: item.status ? '#10aeff' : '#666666'
                                                    }}>
                                                {item.gather}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>

                                ))
                            }
                        </View>
                        <View style={styles.Halve}></View>
                        <View style={styles.Collect}>
                            <View>
                                <Text style={styles.Star}>主演 : { this.props.videoData.star }</Text>
                                <Text style={styles.Series}>类型: { this.props.videoData.series }</Text>
                            </View>
                            <TouchableHighlight underlayColor="transparent" style={styles.Love} onPress={()=>{ this._onCollect() }}>
                                <AntDesign name='hearto' size={22} color={this.props.videoData.collect ? '#10aeff':'#333333'}/>
                            </TouchableHighlight>
                        </View>
                        <View>
                            <Text style={styles.Describe}>简介: { this.props.videoData.describe }</Text>
                        </View>
                    </ScrollView>
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
    Matter: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    Gather: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 12,
        paddingBottom: 12,
        marginLeft: 12,
        width: Dimensions.get('window').width - 12,
    },
    Halve: {
        marginLeft: 12,
        width: Dimensions.get('window').width - 24,
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 0.5,
    },
    Pitch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
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
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Switch, TouchableHighlight, Alert} from 'react-native';
import Back from '../Common/Back';
import DeviceInfo from 'react-native-device-info';

export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            icon: 'https://mdqygl.cn/Test/Logo.png',
            sex: '',
            signature: '',
        }

    }

    _onMessage = ()=> {

    }

    componentWillMount() {
        this._onFetch();
    }

    _onFetch = ()=> {
        // 获取设备唯一ID
        const uniqueid = DeviceInfo.getUniqueId();
        // 请求用户信息
        const data = {
            uniqueid: uniqueid,
        };

        fetch(APP_MOVIE.base_url + '/signin/member', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((res) => {
            // Alert.alert(JSON.stringify(res));

            if (res.status) {
                this.setState({
                    icon: res.data.icon,
                })
            }


            // if (res.status) {
            //     this.setState({
            //         nick: res.data.nick,
            //         icon: res.data.icon,
            //         sex:  res.data.sex,
            //         signature: res.data.signature,
            //     }, function() {
            //         this.setState({
            //             loginStatus: true
            //         })
            //     })
            // }
        })
        .catch((error) =>{
            Public.toast('网络错误~');
		});
    }

    render() {
        return (
            <View style={styles.Info}>
                <Back navigation={this.props.navigation}/>
                <View style={styles.Container}>
                    <TouchableHighlight underlayColor='#d9d9d9' onPress={()=>this._onMessage()}>
                        <View style={styles.Item}>
                            <View style={styles.Left}>
                                <Text>头像</Text>
                            </View>
                            <View style={styles.Right}>
                                <Image style={styles.Pic} source={{uri: this.state.icon}}/>
                            </View>
                        </View>
                    </TouchableHighlight>
                    {/* <TouchableHighlight underlayColor='#d9d9d9' onPress={()=>this._onMessage()}>
                        <View style={styles.Item}>
                            <View style={styles.Left}>
                                <Text>昵称</Text>
                            </View>
                            <View style={styles.Right}>
                                <Text style={styles.Txt}>陨落心炎</Text>
                            </View>
                        </View>
                    </TouchableHighlight> */}
                    {/* <View style={styles.Item}>
                        <View style={styles.Left}>
                            <Text>性别</Text>
                        </View>
                        <View style={styles.Right}>
                            <View style={{flexDirection: 'row'}}>
                            <View style={styles.Right}><Text style={styles.Txt}>{ this.state.sex ? "男" : "女" }</Text></View>
                            <Switch
                                style={{backgroundColor: '#f43530', borderRadius: 16}}
                                trackColor={'#f43530'}
                                value={this.state.sex}
                                onValueChange={()=>{
                                    this.setState({sex: !this.state.sex})
                                }}
                            />
                            </View>
                        </View>
                    </View> */}
                    {/* <TouchableHighlight underlayColor='#d9d9d9' onPress={()=>this._onMessage()}>
                        <View style={[styles.Item, styles.Signature]}>
                            <View style={styles.Left}>
                                <Text>签名</Text>
                            </View>
                            <View style={[styles.Right, styles.Motto]}>
                                <Text style={styles.Txt}>我本是舒碧湖的砍柴人</Text>
                            </View>
                        </View>
                    </TouchableHighlight> */}

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Info: {
        flex: 1,
        flexDirection: 'column'
    },
    Container: {
        flex: 1,
    },
    Item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 28,
        height: 52,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ededed',
    },
    Signature: {
        borderBottomWidth: 0,
        height: 'auto',
        minHeight: 40,
        maxHeight: 60,
    },
    Pic: {
        width: 36,
        height: 36,
        backgroundColor: 'gray',
        borderRadius: 18
    },
    Left: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    Right: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 28,
    },
    Txt: {
        color: '#999999'
    },
    Motto: {
        paddingTop: 12,
        paddingBottom: 12,
    },
})
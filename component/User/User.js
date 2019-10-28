import React, { Component } from 'react';
import '../Config/Config';
import {StatusBar, StyleSheet, Text, View, Image, TouchableHighlight, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Public from '../Common/Public';
import DeviceInfo from 'react-native-device-info';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            icon: 'https://mdqygl.cn/Test/Logo.png',
            level: Number,
            loginStatus:  false //true登陆了 false未登陆
        }
    }

    // 返回刷新
    _refresh = ()=> {
        this._onFetch();
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
            if (res.status) {
                this.setState({
                    nick: res.data.nick,
                    icon: res.data.icon,
                    level: this._onLevel(res.data.level),
                }, function() {
                    this.setState({
                        loginStatus: true
                    })
                })
            }
        })
        .catch((error) =>{
            Public.toast('网络错误~');
		});
    }

    _onLevel = (level)=> {
        switch(level)
        {
            case 1:
                return '侍从';
            break;
            case 2:
                return '剑士';
            break;
            case 3:
                return '骑士';
            break;
            case 4:
                return '圣骑士';
            break;
            case 5:
                return '圣主';
            break;
        }
    }

    render() {
        return (
            <View style={styles.User}>
                <StatusBar backgroundColor={'#10aeff'} hidden={false} />
                <View style={styles.Login}>
                    <View style={styles.Myself}>
                        <Text style={styles.Self}>我的</Text>
                    </View>
                    <View style={styles.Contain}>
                        {this.state.loginStatus ? 
                            (<TouchableHighlight underlayColor="transparent" onPress={()=>{this.props.navigation.navigate('Info')}}>
                                <View style={styles.Signin}>
                                    <View style={styles.Panel}>
                                        <Image style={styles.Photo} source={{uri: this.state.icon}}/>
                                        <View style={styles.Msg}>
                                            <Text style={styles.Name}>{ this.state.nick }</Text>
                                            <Text style={styles.Phone}>等级: { this.state.level }</Text>
                                        </View>
                                    </View>
                                    <Ionicons style={styles.Arrow} name='ios-arrow-forward' size={22} color='#ffffff'/>
                                </View>
                            </TouchableHighlight>):
                            (<TouchableHighlight underlayColor="transparent" onPress={()=>{this.props.navigation.navigate('Login', {
                                refresh:()=>{
                                    this._refresh();
                                }
                            })}}>
                                <View style={styles.Signin}>
                                    <View style={styles.Panel}>
                                        <Image style={styles.Photo} source={{uri: this.state.icon}}/>
                                        <View style={styles.Msg}>
                                            <Text style={styles.Enter}>注册 / 登录</Text>
                                        </View>
                                    </View>
                                    <Ionicons style={styles.Arrow} name='ios-arrow-forward' size={22} color='#ffffff'/>
                                </View>
                            </TouchableHighlight>)
                        }
                    </View>
                </View>
                <View style={styles.List}>
                    <Text>22222</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    User: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    Login: {
        height: 112,
        backgroundColor: '#10aeff'
    },
    Myself: {
        height: 34,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    Self: {
        fontSize: 18,
        color: '#f5f5f5'
    },
    Contain: {
        height: 72
    },
    Signin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Panel: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    Photo: {
        marginLeft: 16,
        width: 58,
        height: 58,
        borderWidth: 0.5,
        borderColor: '#bfbfbf',
        borderRadius: 3,
        backgroundColor: '#ffffff'
    },
    Msg: {
        marginLeft: 10
    },
    Name: {
        fontSize: 18,
        color: '#ffffff'
    },
    Phone: {
        marginTop: 9,
        fontSize: 14,
        color: '#ffffff'
    },
    Arrow: {
        marginRight: 16
    },
    List: {
        height: 45,
        backgroundColor: '#ffffff'
    },
    Enter: {
        fontSize: 18,
        color: '#ffffff'
    }
})
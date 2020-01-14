import React, { Component } from 'react';
import '../Config/Config';
import {StatusBar, StyleSheet, Text, View, Image, TouchableHighlight, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appAxios, appToast, appLoad, appReport, appStorage, appMachine, appPrimal} from '../Common/Gather';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            icon: '',
            has_icon: false,
            level: Number,
            loginStatus:  false //true登陆了 false未登陆
        }
    }

    // 返回刷新
    _refresh = ()=> {
        setTimeout(() => {
            this._onFetch();
        }, 800);
    }

    componentDidMount() {
        appReport('00004', 'show', 1);
    }

    componentWillMount() {
        this._onFetch();
    }

    _onFetch = ()=> {
        // 请求用户信息
        const data = {
            entry: 0,
            uniqueid: APP_MOVIE.uniqueid,
        };

        appAxios(APP_MOVIE.base_url + '/signin/member', data)
        .then((res) => {
            if (res.status) {
                appStorage.save({key: 'unionid', data: res.key});
                this.setState({
                    nick: res.data.nick,
                    icon: res.data.icon,
                    has_icon: (res.data.icon == '') ? false : true,
                    level: this._onLevel(res.data.level),
                }, function() {
                    this.setState({
                        loginStatus: true
                    })
                })
            }
        })
    }

    _onDetail = () => {
        appReport('00004', 'click', 2);
        this.props.navigation.navigate('Info', {
            refresh:()=>{
                this._refresh();
            }
        });
    }

    _onLogin = () => {
        appReport('00004', 'click', 1);
        this.props.navigation.navigate('Login',{
            refresh:()=>{
                this._refresh();
            }
        });
    }

    _onHistory = () => {
        appReport('00004', 'click', 3);
        this.props.navigation.navigate('History', {
            refresh:()=>{
                this._refresh();
            }
        });
    }

    _onCollect = () => {
        appReport('00004', 'click', 4);
        this.props.navigation.navigate('Collect', {
            refresh:()=>{
                this._refresh();
            }
        })
    }

    _onAbout = () => {
        appReport('00004', 'click', 5);
        return;
        this.props.navigation.navigate('About');
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
                            (<TouchableHighlight underlayColor="transparent" onPress={() => this._onDetail()}>
                                <View style={styles.Signin}>
                                    <View style={styles.Panel}>
                                        {
                                            this.state.has_icon
                                            ? <Image style={styles.Photo} source={{uri: this.state.icon}}/>
                                            : <Image style={styles.Photo} source={require('../static/image/member.png')}/>
                                        }
                                        <View style={styles.Msg}>
                                            <Text style={styles.Name}>{ this.state.nick }</Text>
                                            <Text style={styles.Phone}>等级: { this.state.level }</Text>
                                        </View>
                                    </View>
                                    <Ionicons style={styles.Arrow} name='ios-arrow-forward' size={22} color='#ffffff'/>
                                </View>
                            </TouchableHighlight>):
                            (<TouchableHighlight underlayColor="transparent" onPress={() => this._onLogin()}>
                                <View style={styles.Signin}>
                                    <View style={styles.Panel}>
                                        <Image style={styles.Photo} source={require('../static/image/default.png')}/>
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
                <TouchableHighlight underlayColor="transparent" onPress={() => this._onHistory()}>
                    <View style={styles.List}>
                        <Text style={styles.History}>观看记录</Text>
                        <Ionicons style={styles.Arrow} name='ios-arrow-forward' size={22} color='#d9d9d9'/>
                    </View>
                </TouchableHighlight>
                <View style={styles.Inner}>
                    <TouchableHighlight underlayColor="transparent" onPress={() => this._onCollect()}>
                        <View style={styles.List}>
                            <Text style={styles.History}>收藏</Text>
                            <Ionicons style={styles.Arrow} name='ios-arrow-forward' size={22} color='#d9d9d9'/>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.Linner}></View>
                    <View style={styles.List}>
                        <Text style={styles.History}>帮助与反馈</Text>
                        <Text style={styles.Help}>QQ: 3271468090</Text>
                    </View>
                    <View style={styles.Linner}></View>
                    <TouchableHighlight underlayColor="transparent" onPress={() => this._onAbout()}>
                        <View style={styles.List}>
                            <Text style={styles.History}>关于我们</Text>
                            <Ionicons style={styles.Arrow} name='ios-arrow-forward' size={22} color='#d9d9d9'/>
                        </View>
                    </TouchableHighlight>
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
        borderRadius: 3,
        backgroundColor: '#f5f5f5'
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        backgroundColor: '#ffffff'
    },
    History: {
        marginLeft: 16,
        fontSize: 16,
        color: '#666666'
    },
    Enter: {
        fontSize: 18,
        color: '#ffffff'
    },
    Inner: {
        marginTop: 22,
        backgroundColor: '#ffffff',
    },
    Help: {
        marginRight: 16,
        fontSize: 16,
        color: '#999999'
    },
    Linner: {
        marginLeft: 16,
        width: '100%',
        height: 0.5,
        backgroundColor: '#f5f5f5'
    }
})
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus:  false //true登陆了 false未登陆
        }
    }
    render() {
        return (
            <View style={styles.User}>
                <View style={styles.Login}>
                    <View style={styles.Myself}>
                        <Text style={styles.Self}>我的</Text>
                    </View>
                    <View style={styles.Contain}>
                        {this.state.loginStatus ? 
                            (<TouchableHighlight underlayColor="transparent" onPress={()=>{this.props.navigation.navigate('Info')}}>
                                <View style={styles.Signin}>
                                    <View style={styles.Panel}>
                                        <Image style={styles.Photo} source={{uri: "https://mdqygl.cn/Test/Logo.png"}}/>
                                        <View style={styles.Msg}>
                                            <Text style={styles.Name}>白衣沽酒绮罗生</Text>
                                            <Text style={styles.Phone}>上海</Text>
                                        </View>
                                    </View>
                                    <Ionicons style={styles.Arrow} name='ios-arrow-forward' size={22} color='#ffffff'/>
                                </View>
                            </TouchableHighlight>):
                            (<TouchableHighlight underlayColor="transparent" onPress={()=>{this.props.navigation.navigate('Login')}}>
                                <View style={styles.Signin}>
                                    <View style={styles.Panel}>
                                        <Image style={styles.Photo} source={{uri: "https://mdqygl.cn/Test/Logo.png"}}/>
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
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Self: {
        fontSize: 16,
        color: '#ffffff'
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
        borderWidth: 1.2,
        borderColor: '#bfbfbf',
        borderRadius: 3
    },
    Msg: {
        marginLeft: 10
    },
    Name: {
        fontSize: 15,
        color: '#ffffff'
    },
    Phone: {
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
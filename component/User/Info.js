import React, { Component } from 'react';
import '../Config/Config';
import {StyleSheet, Text, View, Image, Switch, TextInput, TouchableHighlight, Alert} from 'react-native';
import Back from '../Common/Back';
import Public from '../Common/Public';
import {appAxios, appToast, appLoad} from '../Common/Gather';
import ImagePicker from 'react-native-image-crop-picker';

export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            icon: '',
            has_icon: false,
            sex: Boolean,
            signature: ''
        }
    }

    componentWillMount() {
        this._onFetch();
    }

    componentDidMount() {
        Public.report('00006', 'show', 1);
    }

    _onImage = ()=> {
        ImagePicker.openPicker({
            width: 290,
            height: 290,
            cropping: true
        }).then(image => {
            this.setState({
                has_icon: true,
                icon: image.path
            })

            let file = {uri: image.path, type: 'multipart/form-data', name: 'image.png'};
            let data = new FormData();
            data.append('file', file);
            data.append('uniqueid', APP_MOVIE.uniqueid);

            appAxios(APP_MOVIE.base_url + '/signin/upload', data, null, 'multipart/form-data', true)
            .then((res) => {
            })
        });
    }

    _onNick = ()=> {
        const data = {
            type: 0,
            nick: this.state.nick,
            uniqueid: APP_MOVIE.uniqueid
        };
        this._onChange(data);
    }

    _onSex = ()=> {
        const data = {
            type: 1,
            sex: this.state.sex ? 0 : 1,
            uniqueid: APP_MOVIE.uniqueid
        };
        this._onChange(data);
    }

    _onSignature = ()=> {
        const data = {
            type: 2,
            signature: this.state.signature,
            uniqueid: APP_MOVIE.uniqueid
        };
        this._onChange(data);
    }

    _onChange = (data)=> {
        appAxios(APP_MOVIE.base_url + '/signin/modify', data)
        .then((res) => {
            if (!res.status) {
                appToast(res.message);
            }
        })
    }

    _onFetch = ()=> {
        // 请求用户信息
        const data = {
            uniqueid: APP_MOVIE.uniqueid
        };

        appAxios(APP_MOVIE.base_url + '/signin/member', data)
        .then((res) => {
            if (res.status) {
                this.setState({
                    icon: res.data.icon,
                    has_icon: (res.data.icon == '') ? false : true,
                    nick: res.data.nick,
                    sex: res.data.sex,
                    signature: res.data.signature
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.Info}>
                <Back navigation={this.props.navigation} active={true} before={false}/>
                <View style={styles.Container}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>this._onImage()}>
                        <View style={styles.Item}>
                            <View style={styles.Left}>
                                <Text>头像</Text>
                            </View>
                            <View style={styles.Right}>
                            {
                                this.state.has_icon
                                ? <Image style={styles.Pic} source={{uri: this.state.icon}}/>
                                : <Image style={styles.Pic} source={require('../static/image/member.png')}/>
                            }
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.Item}>
                        <View style={styles.Left}>
                            <Text>昵称</Text>
                        </View>
                        <View style={styles.Right}>
                            <TextInput
                                maxLength={8}
                                style={{height: 48}}
                                onChangeText={(nick) => this.setState({nick})}
                                onBlur={()=>this._onNick()}
                                value={this.state.nick}
                                />
                        </View>
                    </View>
                    <View style={styles.Item}>
                        <View style={styles.Left}>
                            <Text>性别</Text>
                        </View>
                        <View style={styles.Right}>
                            <View style={{flexDirection: 'row'}}>
                            <View style={styles.Right}><Text style={styles.Txt}>{ this.state.sex ? "男" : "女" }</Text></View>
                            <Switch
                                style={{backgroundColor: 'transparent', borderRadius: 16}}
                                trackColor={{true: '#f2f2f2', false: '#f2f2f2'}}
                                thumbColor={'#e5e5e5'}
                                value={this.state.sex}
                                onValueChange={()=>{
                                    this.setState({sex: !this.state.sex}, function() {
                                        this._onSex();
                                    })
                                }}
                            />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.Item, styles.Signature]}>
                        <View style={styles.Left}>
                            <Text>签名</Text>
                        </View>
                        <View style={[styles.Right, styles.Motto]}>
                        <TextInput
                            maxLength={30}
                            style={{height: 48}}
                            onChangeText={(signature) => this.setState({signature})}
                            onBlur={()=>this._onSignature()}
                            value={this.state.signature}
                            />
                        </View>
                    </View>
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
        backgroundColor: '#f5f5f5',
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
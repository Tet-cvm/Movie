import React, { Component } from 'react';
import {FlatList, TouchableHighlight, StyleSheet, Text, View, Image, Alert} from 'react-native';
import '../Config/Config';
import Back from '../Common/Back';
import Public from '../Common/Public';

export default class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            record: '',
            scene: -1, // 0有数据 1无数据 2未登录
        }
    }

    componentWillMount() {
        this._onHistory();
    }

    componentDidMount() {
        Public.report('00007', 'show', 1);
    }

    // 返回刷新
    _refresh = ()=> {
        this._onHistory();
    }

    _onHistory = ()=> {
        const data = {
            uniqueid: APP_MOVIE.uniqueid
        };
        fetch(APP_MOVIE.base_url + '/home/record', {
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
                this.setState({
                    record: res.data,
                    scene: 0
                });
            } else {
                if (res.login) {
                    this.setState({
                        scene: 1
                    });
                } else {
                    this.setState({
                        scene: 2
                    });
                }
            }
        })
        .catch((error) =>{
            Public.toast('网络错误~');
        });
    }

    _onFilter = (name)=> {
        if (name.length > 28) {
            name = name.substring(0, 28) + '..';
        }
        return name;
    }

    _onPlayer = (id) => {
        Public.report('00007', 'click', 1);
        this.props.navigation.navigate('Player', {
            id: id
        });
    }

    _onLogin = () => {
        Public.report('00007', 'click', 2);
        this.props.navigation.navigate('Login', {
            refresh:()=>{
                this._refresh();
            }
        })
    }

    render() {
        return (
            <View style={styles.History}>
                <Back navigation={this.props.navigation} active={true} before={false}/>
                <View style={styles.Panel}>
                    {
                        (this.state.scene == 0)
                        ? <FlatList
                            data={this.state.record}
                            numColumns={1}
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={({item}) =>
                                <TouchableHighlight style={styles.Items} underlayColor="#ededed" onPress={() => this._onPlayer(item.id)}>
                                    <View style={styles.List}>
                                        <Image style={styles.Photo} source={{uri: item.poster}}/>
                                        <View style={styles.Message}>
                                            <Text style={styles.Caption}>{ this._onFilter(item.name) }</Text>
                                            <Text style={styles.Timer}>{ item.time }</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            }
                            /> : null
                    }

                    {
                        (this.state.scene == 1)
                        ? <View style={styles.Login}>
                                <Image style={styles.Nodata} source={require('../static/image/miss.png')}/>
                                <Text style={styles.Goin}>暂无数据~</Text>
                        </View> : null
                    }

                    {
                        (this.state.scene == 2)
                        ? <TouchableHighlight style={styles.Login} underlayColor="transparent" onPress={() => this._onLogin()}>
                            <View style={styles.Login}>
                                <Image style={styles.Injustice} source={require('../static/image/signin.png')}/>
                                <Text style={styles.Goin}>您还不是会员, 去注册</Text>
                            </View>
                        </TouchableHighlight> : null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    History: {
        flex: 1
    },
    Panel: {
        flex: 1,
    },
    Items: {
        paddingTop: 6,
        paddingBottom: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ededed',
    },
    List: {
        flexDirection: 'row',
    },
    Photo: {
        marginLeft: 16,
        width: 92,
        height: 65,
    },
    Message: {
        width: 226,
        marginLeft: 14,
        justifyContent: 'space-between'
    },
    Caption: {
        marginTop: 3,
        fontSize: 15,
        fontWeight: '400',
        color: '#333333'
    },
    Timer: {
        marginBottom: 3,
        fontSize: 14,
        color: '#666666'
    },
    Login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Injustice: {
        width: 120,
        height: 120,
    },
    Goin: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '400',
        color: '#666666'
    },
    Nodata: {
        width: 120,
        height: 120,
    }
})
import React, { Component } from 'react';
import {FlatList, TouchableHighlight, StyleSheet, Text, View, Image, Alert} from 'react-native';
import '../Config/Config';
import Back from '../Common/Back';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class Collect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            record: '',
            scene: -1, // 0有数据 1无数据 2未登录
        }
    }

    componentWillMount() {
        this._onCollect();
    }

    // 返回刷新
    _refresh = ()=> {
        this._onCollect();
    }

    _onCollect = ()=> {
        const data = {
            uniqueid: APP_MOVIE.uniqueid
        };
        fetch(APP_MOVIE.base_url + '/home/star', {
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

    _onCancel = (row, id)=> {
        const data = {
            id: id
        };
        fetch(APP_MOVIE.base_url + '/home/cancel', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then((response) => response.json())
        .then((res) => {
            row[id].closeRow();
            const newData = [...this.state.record];
            const index = this.state.record.findIndex(
                item => item.id === id
            );
            newData.splice(index, 1);
            this.setState({ record: newData });
        })
        .catch((error) =>{
            Public.toast('网络错误~');
        });
    }

    render() {
        return (
            <View style={styles.Collect}>
                <Back navigation={this.props.navigation} active={true}/>
                <View style={styles.Panel}>
                    {
                        (this.state.scene == 0)
                        ? <SwipeListView
                            data={this.state.record}
                            keyExtractor={(data, index) => data.id.toString()}
                            renderItem={(data, row) => (
                                <TouchableHighlight style={styles.Items} underlayColor="#ededed" onPress={()=>{this.props.navigation.navigate('Player', {id: data.item.id})}}>
                                    <View style={styles.List}>
                                        <Image style={styles.Photo} source={{uri: data.item.poster}}/>
                                        <View style={styles.Message}>
                                            <Text style={styles.Caption}>{ this._onFilter(data.item.name) }</Text>
                                            <Text style={styles.Timer}>{ data.item.time }</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )}
                            renderHiddenItem={(data, row) => (
                                <View style={styles.Delete}>
                                    <TouchableHighlight underlayColor="transparent" onPress={()=>{ this._onCancel(row, data.item.id) }}>
                                        <View style={styles.Cancel}>
                                            <Text style={styles.Square}>取消</Text>
                                            <Text style={styles.Square}>收藏</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            )}
                            rightOpenValue={-75}
                            disableRightSwipe={true}
                        />
                        : (this.state.scene == 1)
                        ? <View style={styles.Login}>
                                <Image style={styles.Nodata} source={require('../static/image/nodata.png')}/>
                                <Text style={styles.Goin}>暂无数据~</Text>
                        </View>
                        : <TouchableHighlight style={styles.Login} underlayColor="transparent" onPress={()=>{this.props.navigation.navigate('Login', {
                            refresh:()=>{
                                this._refresh();
                            }
                        })}}>
                            <View style={styles.Login}>
                                <Image style={styles.Injustice} source={require('../static/image/injustice.png')}/>
                                <Text style={styles.Goin}>您还不是会员, 去注册</Text>
                            </View>
                        </TouchableHighlight>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Collect: {
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
        backgroundColor: '#ffffff'
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
    Delete: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    Cancel: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: 77,
        backgroundColor: '#e94f4f'
    },
    Square: {
        fontSize: 16,
        fontWeight: '400',
        color: '#ffffff'
    },
    Login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Injustice: {
        width: 120,
        height: 120,
        backgroundColor: '#10aeff'
    },
    Goin: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '400',
        color: '#666666'
    },
    Nodata: {
        width: 120,
        height: 70,
    }
})
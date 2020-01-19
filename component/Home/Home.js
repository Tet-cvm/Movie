import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar, StyleSheet, Dimensions, FlatList, Text, View, Image, TouchableHighlight, Alert, TouchableHighlightBase} from 'react-native';
import '../Config/Config';
import {appAxios, appToast, appLoad, appReport, appStorage, appMachine, appPrimal} from '../Common/Gather';
//图标
import Feather from 'react-native-vector-icons/Feather';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            limit: 1,
            movie: [],
            height: Dimensions.get('window').height,
            threshold: 0.1,
            tolerance: false,
            loading: true,
            rotate: 0,
        }
    }

    componentDidMount() {
        SplashScreen.hide();
        this._onFetch();
        setInterval(() => {
            let count = this.state.rotate + 8;
            this.setState({
                rotate: count
            });
        }, 60);
        appReport('00001', 'show', 1);
    }

    _onLayout = (event)=> {
        let height = event.nativeEvent.layout.height - 34;
        this.setState({height: height});
    }

    _onFetch = ()=> {
        if (!this.state.tolerance) {
            const data = {
                limit: this.state.limit,
            };
            appAxios(APP_MOVIE.base_url + '/home/movie', data)
            .then((res) => {
                if (res.status) {
                    if (res.data.length > 0) {
                        let movie = this.state.movie.concat(res.data);
                        let tolerance = res.data.length >= 18 ? false : true;
                        this.setState({
                            loading: false
                        }, () => {
                            this.setState({
                                movie: movie,
                                tolerance: tolerance,
                                limit: this.state.limit += 1
                            }, () => {
                                let count = Math.ceil(this.state.movie.length / 3);
                                let height = count * 173;
                                let threshold = (5 / height).toFixed(4);
                                this.setState({
                                    loading: !tolerance,
                                    threshold: threshold
                                });
                            })
                        });
                    } else {
                        this.setState({
                            loading: false,
                            tolerance: true
                        });
                    }
                } else {
                    appToast(res.message);
                }
            })
        }
    }

    _onFilter = (name)=> {
        if (name.length > 7) {
            name = name.substring(0, 7) + '..';
        }
        return name;
    }

    _onNavigation = (id) => {
        appReport('00001', 'click', id);
        this.props.navigation.navigate('Player', {id: id})
    }

    render() {
        return (
            <View style={styles.Home} onLayout={(event) => this._onLayout(event)}>
                <StatusBar backgroundColor={'#10aeff'} hidden={false} />
                <View style={styles.Header}>
                    <Text style={styles.Title}>漫动画</Text>
                </View>
                <View style={[styles.Panel, {height: this.state.height}]}>
                    <FlatList
                        data={this.state.movie}
                        numColumns={3}
                        onEndReached={() => this._onFetch()}
                        onEndReachedThreshold={this.state.threshold}
                        keyExtractor={(item, index) => index}
                        getItemLayout={(data, index) => (
                            {length: 173, offset: 173 * index, index}
                        )}
                        renderItem={({item}) =>
                            <View>
                                <TouchableHighlight style={styles.Items} underlayColor="transparent" onPress={() => this._onNavigation(item.id)}>
                                    <View style={styles.List}>
                                        <Image style={styles.Photo} source={{uri: item.poster}}/>
                                        <Text style={styles.Caption}>{ this._onFilter(item.name) }</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        }
                        ListFooterComponent={
                            this.state.loading
                            ? <View style={[styles.Rate, {
                                transform: [{rotate: this.state.rotate + 'deg'}]
                            }]}><Feather name='loader' size={21} color={'#999999'}/></View> 
                            : this.state.tolerance ? <View style={styles.Rate}><Text style={styles.Tolerance}>-- 我是有底线的 --</Text></View> : null
                        }
                        />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Home: {
        flex: 1
    },
    Header: {
        height: 34,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#10aeff'
    },
    Title: {
        fontSize: 18,
        color: '#f5f5f5'
    },
    Panel: {

    },
    Items: {
        marginTop: 8,
        width: Dimensions.get('window').width / 3,
        alignItems: 'center'
    },
    List: {
        width: 108
    },
    Photo: {
        width: 108,
        height: 152.5,
        borderRadius: 3
    },
    Caption: {
        marginTop: 3,
        fontSize: 13,
        color: '#666666'
    },
    Rate: {
        width: '100%',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Tolerance: {
        fontSize: 12,
        color: '#999999',
        textAlign: 'center'
    }
})
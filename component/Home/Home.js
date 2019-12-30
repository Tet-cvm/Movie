import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar, StyleSheet, Dimensions, FlatList, Text, View, Image, TouchableHighlight, Alert, RecyclerViewBackedScrollView} from 'react-native';
import '../Config/Config';
import Public from '../Common/Public';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: [],
            height: Dimensions.get('window').height
        }
    }

    componentDidMount() {
        SplashScreen.hide();
        this._onFetch();
        Public.report('00001', 'show', 1);
    }

    _onLayout = (event)=> {
        let height = event.nativeEvent.layout.height - 34;
        this.setState({height: height});
    }

    _onFetch = ()=> {
        fetch(APP_MOVIE.base_url + '/home/movie', {
            method: 'POST',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.status) {
                this.setState({movie: res.data});
            } else {
                Public.toast(res.message);
            }
        })
        .catch((error) =>{
            Public.toast('网络错误~');
        });
    }

    _onFilter = (name)=> {
        if (name.length > 7) {
            name = name.substring(0, 7) + '..';
        }
        return name;
    }

    _onNavigation = (id) => {
        Public.report('00001', 'click', id);
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
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({item}) =>
                            <TouchableHighlight style={styles.Items} underlayColor="transparent" onPress={() => this._onNavigation(item.id)}>
                                <View style={styles.List}>
                                    <Image style={styles.Photo} source={{uri: item.poster}}/>
                                    <Text style={styles.Caption}>{ this._onFilter(item.name) }</Text>
                                </View>
                            </TouchableHighlight>
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
    }
})
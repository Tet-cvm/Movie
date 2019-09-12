import React, { Component } from 'react';
import {StatusBar, StyleSheet, Dimensions, findNodeHandle, UIManager, FlatList, Text, View, Image, TouchableHighlight, Alert} from 'react-native';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: [],
            height: Dimensions.get('window').height
        }
    }

    componentDidMount() {
        this._onFetch();
    }

    _onLayout = (event)=> {
        let height = event.nativeEvent.layout.height-45;
        this.setState({height: height});
    }

    _onFetch = ()=> {
        fetch('https://mdqygl.cn/Test/Chapter000.json')
        .then((response) => response.json())
        .then((res) => {
            this.setState({movie: res.data});
        })
        .catch((error) =>{

        });
    }

    render() {
        return (
            <View style={styles.Home} onLayout={(event) => this._onLayout(event)}>
                <StatusBar backgroundColor={'#10aeff'} hidden={false} />
                <View style={styles.Header}>
                    <Text style={styles.Title}>电影</Text>
                </View>
                <View style={[styles.Panel, {height: this.state.height}]}>
                    <FlatList
                        data={this.state.movie}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({item}) =>
                            <TouchableHighlight style={styles.Items} underlayColor="transparent" onPress={()=>{this.props.navigation.navigate('Player', {id: item.id})}}>
                                <View style={styles.List}>
                                    <Image style={styles.Photo} source={{uri: item.image}}/>
                                    <Text style={styles.Caption}>{item.title}</Text>
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
        height: 136,
        borderRadius: 3
    },
    Caption: {
        marginTop: 2,
        fontSize: 13,
        color: '#666666'
    }
})
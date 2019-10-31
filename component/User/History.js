import React, { Component } from 'react';
import {FlatList, TouchableHighlight, StyleSheet, Text, View, Image, Alert} from 'react-native';
import '../Config/Config';
import Back from '../Common/Back';

export default class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            record: ''

        }
    }

    componentWillMount() {
        this._onCollect();
    }

    _onCollect = ()=> {
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
            this.setState({
                record: res.data
            });
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

    render() {
        return (
            <View style={styles.History}>
                <Back navigation={this.props.navigation} active={false}/>
                <View style={styles.Panel}>
                    <FlatList
                        data={this.state.record}
                        numColumns={1}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({item}) =>
                            <TouchableHighlight style={styles.Items} underlayColor="#ededed" onPress={()=>{this.props.navigation.navigate('Player', {id: item.id})}}>
                                <View style={styles.List}>
                                    <Image style={styles.Photo} source={{uri: item.poster}}/>
                                    <View style={styles.Message}>
                                        <Text style={styles.Caption}>{ this._onFilter(item.name) }</Text>
                                        <Text style={styles.Timer}>{ item.time }</Text>
                                    </View>
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
    }
})
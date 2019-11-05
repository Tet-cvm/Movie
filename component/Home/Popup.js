import React, { Component } from 'react';
import '../Config/Config';
import {StyleSheet, Text, View, Image, Alert, Linking, TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Popup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            watch: 3,
            close: false,
        }
    }

    componentDidMount() {
        let timer = setInterval(() => {
            let time = this.state.watch - 1;
            if (time >= 0) {
                this.setState({watch: time});
            } else {
                clearInterval(timer);
                this.setState({close: true});
            }
        }, 1000);
    }

    _onWake = ()=> {
        Linking.canOpenURL(this.props.app).then(supported => {
            if (!supported) {
                // 未安装跳应用市场
                return Linking.openURL(APP_MOVIE.market[APP_MOVIE.brand]);
            } else {
                return Linking.openURL(this.props.app);
            }
        }).catch(err => console.log(JSON.stringify(err)))
    }

    _onClose = ()=> {
        this.props.onRefPopup();
    }

    render() {
        return (
            <View style={styles.Popup}>
                <View style={styles.Panel}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 26,
                        height: 28,
                        borderWidth: 1.5,
                        borderColor: this.props.color,
                        borderRadius: 50,
                        zIndex: 777
                    }}>
                        {
                            this.state.close
                            ? <TouchableHighlight underlayColor="transparent" onPress={()=>{this._onClose()}}>
                                <Ionicons name='ios-close' size={22} color={this.props.color}/>
                            </TouchableHighlight>
                            : <Text style={{
                                fontSize: 15,
                                color: this.props.color,
                                fontWeight: '400'
                            }}>{ this.state.watch }</Text>
                        }
                    </View>
                    <TouchableHighlight underlayColor="transparent" onPress={()=>{this._onWake()}}>
                        <Image style={styles.Photo} source={{uri: this.props.ikon}}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Popup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.38)',
        width: '100%',
        height: '100%',
        zIndex: 999
    },
    Panel: {
        width: 280,
        height: 396,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        overflow: 'hidden'
    },
    Photo: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#c7c7c7',
        zIndex: 666,
    }
})
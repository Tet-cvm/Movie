import React, { Component } from 'react';
import {StyleSheet, StatusBar, Dimensions, ActivityIndicator, TouchableHighlight, View, Image, Text, Alert} from 'react-native';
import '../Config/Config';
import {appAxios, appToast, appLoad, appReport, appStorage, appMachine, appPrimal} from '../Common/Gather';

import Detail from '../Home/Detail'
import Popup from '../Home/Popup'
import {FadeIn, FadeOut} from '../Common/Fade'
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Slider from "react-native-slider";
import LinearGradient from 'react-native-linear-gradient';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
    function formatTime(second) {
        let h = 0, i = 0, s = parseInt(second);
        if (s > 60) {
            i = parseInt(s / 60);
            s = parseInt(s % 60);
        }
        // 补零
        let zero = function (v) {
            return (v >> 0) < 10 ? "0" + v : v;
        };
        return [zero(h), zero(i), zero(s)].join(":");
    }

export default class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false, // 登录状态
            videoData: { // 视频数据
                collect: false,
                name: null,
                poster: null,
                series: null,
                describe: null,
                star: null,
                score: null,
            },
            playData: [],
            bezel: { // 弹窗广告
                status: false,
                app: null,
                circle: '#d9d9d9',
                image: null
            },
            starry: { // 大图广告
                status: true,
                image: null,
                url: null
            },
            chasm: {// 底部广告
                status: true,
                image: null,
                url: null
            },
            id: Number,
            loadComplete: false, // 数据接口是否加载完成
            videoError: true,
            videoUrl: '',// 视频地址
            videoCover: "https://mdqygl.cn/Movie/videoCover.jpg", // 视频封面
            videoWidth: screenWidth,
            videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
            showVideoCover: true,    // 是否显示视频封面
            videoControl: true,  // 当前视频控制组件状态
            isPlaying: false,        // 视频是否正在播放
            playBtn: false,         // 播放按钮
            currentTime: 0,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
        }
    }

    // 请求数据
    componentWillMount() {
        // 广告
        const data = {
            uniqueid: APP_MOVIE.uniqueid
        };

        appAxios(APP_MOVIE.base_url + '/popup/dialog', data)
        .then((res) => {
            if (res.status) {
                this.setState({
                    bezel: res.bezel,
                    starry: res.starry,
                    chasm: res.chasm
                });
            } else {
                appToast(res.message);
            }
        })

        const {params} = this.props.navigation.state;
        this.setState({id: params.id}, function() {
            this._onFetch();
        });
    }

    componentDidMount() {
        appReport('00002', 'show', 1);
    }

    componentWillUnmount() {
        this._onHistory(); // 记录观看历史
        this.setState = (state, callback) => { // 防止内存泄漏
            return;
        }
    }

    _onHistory = ()=> {
        const data = {
            id: this.state.id,
            uniqueid: APP_MOVIE.uniqueid
        };

        appAxios(APP_MOVIE.base_url + '/home/history', data)
        .then((res) => {
        })
    }

    _onFetch = ()=> {
        const data = {
            id: this.state.id,
            uniqueid: APP_MOVIE.uniqueid
        };

        appAxios(APP_MOVIE.base_url + '/home/play', data)
        .then((res) => {
            setTimeout(()=>{
                this.setState({
                    login: res.login,
                    videoData: res.data,
                    playData: this._onLight(res.data.domains, 0),
                    videoUrl: res.data.domains[0].uri,
                    loadComplete: true,
                });
            }, 3000);
        })
    }

    _onLight = (data, index)=> {
        let arr = [];
        for (let i=0; i<data.length; i++){
            let li = {gather: data[i].gather, uri: data[i].uri, status: false};
            ( i == index ) ? li.status = true : li.status = false;
            arr.push(li);
        }
        return arr;
    }

    // 全屏判断
    _onLayout = (event) => {
        //获取根View的宽高
        let {width, height} = event.nativeEvent.layout;
        // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
        let isLandscape = (width > height);
        if (isLandscape){
            this.setState({
                videoWidth: width,
                videoHeight: height,
                isFullScreen: true,
            })
        } else {
            this.setState({
                videoWidth: width,
                videoHeight: width * 9/16,
                isFullScreen: false,
            })
        }
        Orientation.unlockAllOrientations();
    };

    // 视频开始加载时回调
    _onLoadStart = () => {
        this.setState({isPlaying: true}, ()=> {
            this.FadeOut._onToggle(0, 1, 600);
        });
    };

    // 视频加载完毕时回调
    _onLoadEnd = (data) => {
        this.setState({duration: data.duration});
    };

    // 视频播放进度
    _onProgress = (data) => {
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            });
        }
    };

    // 视频缓冲中...
    _onBuffering = () => {
        // Alert.alert('视频缓冲中');
    };

    // 视频播放完毕
    _onPlayEnd = () => {
        this.setState({
            currentTime: 0,
            isPlaying: false,
            playFromBeginning: true
        });
    };

    // 视频播放失败
    _onPlayError = () => {
        this.setState({
            videoError: false,
        });
    };

    // 控制播放器工具栏的显示和隐藏
    hideControl = ()=> {
        if (this.state.loadComplete) {
            if (this.state.videoControl) {
                this.FadeIn._onToggle(-42, 0, 600);
                this.FadeOut._onToggle(-36, 0, 600);
            } else {
                this.FadeIn._onToggle(0, 1, 600);
                this.FadeOut._onToggle(0, 1, 600);
            }
            this.setState({videoControl: !this.state.videoControl});
        }
    }

    // 工具栏上的播放和暂停
    _onPause = ()=> {
        this.setState({isPlaying: !this.state.isPlaying}, ()=> {
            this.setState({playBtn: !this.state.isPlaying});
        });
    }

    // video中间播放按钮
    _onPlay = ()=> {
        this.setState({
            isPlaying: true,
            playBtn: false,
        });
    }

    // 进度条值改变
    onSliderValueChanged(currentTime) {
        this.videoPlayer.seek(currentTime);
        if (this.state.isPlaying) {
            this.setState({currentTime: currentTime});
        } else {
            this.setState({
                currentTime: currentTime,
                isPlaying: true,
                showVideoCover: false
            });
        }
    }

    // 点击了工具栏上的全屏按钮
    onControlShrinkPress() {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
    }

    onBack = ()=> {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            this.props.navigation.goBack();
        }
    }

    onHeavy = ()=> {
        this.setState({
            videoError: true
        });
    }

    onRefFadeIn = (ref) => {
        this.FadeIn = ref;
    }

    onRefFadeOut = (ref) => {
        this.FadeOut = ref;
    }

    _onGather = (index)=> {
        let uri = this.state.playData[index].uri;
        let status = this._onLight(this.state.playData, index);
        this.setState({
            videoUrl: uri,
            playData: status
        })
    }

    _onRefLove = (value)=> {
        let toggle = Object.assign({}, this.state.videoData, {collect: value})
        this.setState({
            videoData: toggle
        });
    }

    _onRefLogin = ()=> {
        this.setState({
            login: true
        });
    }

    _onRefPopup = ()=> {
        let toggle = Object.assign({}, this.state.bezel, {status: false})
        this.setState({
            bezel: toggle
        });
    }

    render() {
        return (
            <View style={styles.Player} onLayout={this._onLayout}>
                <StatusBar backgroundColor={'#000000'} hidden={this.state.isFullScreen} />
                <View style={{ width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor:'#000000' }}>
                    {
                        this.state.loadComplete ?
                            this.state.videoError ?
                            <View>
                                <Video
                                    ref={(ref) => this.videoPlayer = ref}
                                    source={{uri: this.state.videoUrl}}
                                    rate={1.0}
                                    volume={1.0}
                                    muted={false}
                                    fullscreen={this.state.isFullScreen}
                                    paused={!this.state.isPlaying}
                                    resizeMode={'contain'}
                                    playWhenInactive={false}
                                    playInBackground={false}
                                    ignoreSilentSwitch={'ignore'}
                                    progressUpdateInterval={250.0}
                                    onLoadStart={this._onLoadStart}      // 视频开始加载是回调
                                    onLoad={this._onLoadEnd}             // 视频加载完毕回调
                                    onProgress={this._onProgress}        // 进度控制，每250ms调用一次，以获取视频播放的进度
                                    onEnd={this._onPlayEnd}              // 当视频播放完毕后的回调函数
                                    onError={this._onPlayError}          // Callback when video cannot be loaded
                                    onBuffer={this._onBuffering}         // Callback when remote video is buffering
                                    style={{width: this.state.videoWidth, height: this.state.videoHeight}}
                                    />
                            </View>
                            :<View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: (this.state.videoHeight - 30) / 2,
                                marginLeft: (this.state.videoWidth - 30) / 2,
                                width: 48,
                                height: 48,
                                zIndex: 999,
                            }}>
                                <TouchableHighlight underlayColor="transparent" onPress={()=>this.onHeavy()}>
                                    <MaterialCommunityIcons name='reload' size={34} color={'#ffffff'}/>
                                </TouchableHighlight>
                            </View>
                        :<View style={styles.Preheat}>
                            <Image
                                style={{
                                    position:'absolute',
                                    top: 0,
                                    left: 0,
                                    width: this.state.videoWidth,
                                    height: this.state.videoHeight,
                                }}
                                resizeMode={'cover'}
                                source={{uri: this.state.videoCover}}
                                />
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    }
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: this.state.videoWidth,
                        height: this.state.videoHeight,
                        justifyContent: 'space-between',
                        zIndex: 988
                    }}>
                        <FadeIn onRef={this.onRefFadeIn} opacity={1} top={0}>
                            <LinearGradient colors={['#000000', 'transparent', 'transparent']} style={{width: this.state.videoWidth, height: 42}}>
                                <TouchableHighlight underlayColor="transparent" style={styles.History} onPress={()=>this.onBack()}>
                                    <Ionicons name='ios-arrow-back' size={26} color='#ffffff'/>
                                </TouchableHighlight>
                            </LinearGradient>
                        </FadeIn>
                        {
                            this.state.playBtn ? 
                            <TouchableHighlight underlayColor="transparent" style={styles.Blank} onPress={() => { this._onPlay()}}>
                                <AntDesign name='playcircleo' size={36} color={'#ffffff'}/>
                            </TouchableHighlight>
                            :
                            <TouchableHighlight underlayColor="transparent" style={styles.Blank} onPress={() => {this.hideControl()}}>
                                <View></View>
                            </TouchableHighlight>
                        }
                        <FadeOut onRef={this.onRefFadeOut} opacity={0} bottom={-36}>
                            <LinearGradient colors={['transparent', 'transparent', '#000000']} style={[styles.Control, {width: this.state.videoWidth}]}>
                                <TouchableHighlight underlayColor="transparent" style={styles.PlayControl} onPress={() => {this._onPause()}}>
                                    {
                                        this.state.isPlaying ?
                                        <FontAwesome5  name='pause' size={18} color={'#ffffff'}/>
                                        :<FontAwesome5 name='play' size={18} color={'#ffffff'}/>
                                    }
                                </TouchableHighlight>
                                <Text style={styles.Time}>{formatTime(this.state.currentTime)}</Text>
                                <Slider
                                    style={{flex: 1}}
                                    maximumTrackTintColor={'#999999'}
                                    minimumTrackTintColor={'#10aeff'}
                                    thumbTintColor={'#10aeff'}
                                    thumbStyle={{width: 8, height: 8}}
                                    minimumValue={0}
                                    maximumValue={this.state.duration}
                                    value={this.state.currentTime}
                                    onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                                    />
                                <Text style={styles.Time}>{formatTime(this.state.duration)}</Text>
                                <TouchableHighlight underlayColor="transparent" style={styles.ShrinkControl} onPress={() => { this.onControlShrinkPress() }}>
                                    {
                                        this.state.isFullScreen ?
                                        <MaterialCommunityIcons name='arrow-collapse' size={18} color={'#ffffff'}/>
                                        :<MaterialCommunityIcons name='arrow-expand' size={18} color={'#ffffff'}/>
                                    }
                                </TouchableHighlight>
                            </LinearGradient>
                        </FadeOut>
                    </View>
                </View>
                {
                    this.state.isFullScreen ? null
                    : <Detail
                        id={this.state.id}
                        videoData={this.state.videoData}
                        playData={this.state.playData}
                        starry={this.state.starry}
                        chasm={this.state.chasm}
                        login={this.state.login}
                        navigation={this.props.navigation}
                        onGather={this._onGather}
                        onRefLove={this._onRefLove}
                        onRefLogin={this._onRefLogin}
                        />
                }
                {
                    this.state.bezel.status ? <Popup bezel={this.state.bezel}  onRefPopup={this._onRefPopup} /> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Player: {
        flex: 1
    },
    History: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 58,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },
    Blank: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 777
    },
    Preheat: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    PlayControl: {
        width: 52,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ShrinkControl: {
        width: 52,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Time: {
        fontSize: 12,
        color: 'white',
        marginLeft: 6,
        marginRight: 6
    },
    Control: {
        flexDirection: 'row',
        height: 36,
        alignItems:'center'
    }
})
import React, { Component } from 'react';
import {View, Dimensions, Image, Text, TouchableWithoutFeedback, TouchableOpacity, Button, StyleSheet} from 'react-native';

import Back from '../Common/Back';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Slider from "react-native-slider";

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
            videoUrl: "http://124.129.157.208:8810/SD/zhishidian/grade_8_1/wuli_shu/01.mp4",
            videoCover: "http://124.129.157.208:8889/data/uploads/kecheng/2018/01/18/5a600b2c99836.png@0o_0l_220w.png",
            videoWidth: screenWidth,
            videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
            showVideoCover: false,    // 是否显示视频封面
            showVideoControl: true, // 是否显示视频控制组件
            isPlaying: true,        // 视频是否正在播放
            currentTime: 0,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
        }
    }

/// -------Video组件回调事件-------
    _onLoadStart = () => {
        console.log('视频开始加载');
    };

    _onBuffering = () => {
        console.log('视频缓冲中...')
    };

    _onLoaded = (data) => {
        console.log('视频加载完成');
        this.setState({
            duration: data.duration,
        });
    };

    _onProgressChanged = (data) => {
        console.log('视频进度更新');
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            })
        }
    };

    _onPlayEnd = () => {
        console.log('视频播放结束');
        this.setState({
            currentTime: 0,
            isPlaying: false,
            playFromBeginning: true
        });
    };

    _onPlayError = () => {
        console.log('视频播放失败');
    };

    ///-------控件点击事件-------

    /// 控制播放器工具栏的显示和隐藏
    hideControl() {
        if (this.state.showVideoControl) {
            this.setState({
                showVideoControl: false,
            })
        } else {
            // 5秒后自动隐藏工具栏
            this.setState({showVideoControl: true,}, ()=> {
                setTimeout(() => {
                    this.setState({
                        showVideoControl: false
                    })
                }, 5000)
                })
            }
    }

    /// 点击了播放器正中间的播放按钮
    onPressPlayButton() {
        let isPlay = !this.state.isPlaying;
        this.setState({
            isPlaying: isPlay,
            showVideoCover: false
        });
        if (this.state.playFromBeginning) {
            this.videoPlayer.seek(0);
            this.setState({
                playFromBeginning: false,
            })
        }
    }

    /// 点击了工具栏上的播放按钮
    onControlPlayPress() {
        this.onPressPlayButton();
    }

    /// 点击了工具栏上的全屏按钮
    onControlShrinkPress() {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
    }

    /// 进度条值改变
    onSliderValueChanged(currentTime) {
        this.videoPlayer.seek(currentTime);
        if (this.state.isPlaying) {
            this.setState({currentTime: currentTime});
        } else {
            this.setState({
                currentTime: currentTime,
                isPlaying: true,
                showVideoCover: false
            })
        }
    }

    // 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
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

    /// -------外部调用事件方法-------

    ///播放视频，提供给外部调用
    playVideo() {
        this.setState({
            isPlaying: true,
            showVideoCover: false
        })
    }

    /// 暂停播放，提供给外部调用
    pauseVideo() {
        this.setState({
            isPlaying: false,
        })
    }

    /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
    switchVideo(videoURL, seekTime) {
        this.setState({
            videoUrl: videoURL,
            currentTime: seekTime,
            isPlaying: true,
            showVideoCover: false
        });
        this.videoPlayer.seek(seekTime);
    }

    render() {
        return (
            <View style={styles.Player} onLayout={this._onLayout}>
                { this.state.isFullScreen ? null: <Back navigation={this.props.navigation}/>}
                <View style={{ width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor:'cyan' }}>
                    <Video
                        ref={(ref) => this.videoPlayer = ref}
                        source={{uri: this.state.videoUrl}}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        paused={!this.state.isPlaying}
                        resizeMode={'contain'}
                        playWhenInactive={false}
                        playInBackground={false}
                        ignoreSilentSwitch={'ignore'}
                        progressUpdateInterval={250.0}
                        onLoadStart={this._onLoadStart}      // 视频开始加载是回调
                        onLoad={this._onLoaded}              // 视频加载完毕回调
                        onProgress={this._onProgressChanged} // 进度控制，每250ms调用一次，以获取视频播放的进度
                        onEnd={this._onPlayEnd}              // 当视频播放完毕后的回调函数
                        onError={this._onPlayError}          // Callback when video cannot be loaded
                        onBuffer={this._onBuffering}         // Callback when remote video is buffering
                        style={{width: this.state.videoWidth, height: this.state.videoHeight}}
                    />
                {
                    this.state.showVideoCover ?
                    <Image
                        style={{
                            position:'absolute',
                            top: 0,
                            left: 0,
                            width: this.state.videoWidth,
                            height: this.state.videoHeight
                        }}
                        resizeMode={'cover'}
                        source={{uri: this.state.videoCover}}
                        /> : null
                }
                <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: this.state.videoWidth,
                            height: this.state.videoHeight,
                            backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                    {
                    this.state.isPlaying ? null :
                    <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                        <AntDesign name='playcircleo' size={36} color={'#ffffff'}/>
                    </TouchableWithoutFeedback>
                    }
                    </View>
                </TouchableWithoutFeedback>
                {
                    this.state.showVideoControl ?
                        <View style={[styles.Control, {width: this.state.videoWidth}]}>
                            <TouchableOpacity style={styles.PlayControl} activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                                {
                                    this.state.isPlaying ?
                                    <FontAwesome5  name='pause' size={18} color={'#ffffff'}/>
                                    :<FontAwesome5 name='play' size={18} color={'#ffffff'}/>
                                }
                            </TouchableOpacity>
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
                            <TouchableOpacity style={styles.ShrinkControl} activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
                                {
                                    this.state.isFullScreen ?
                                    <MaterialCommunityIcons name='arrow-collapse' size={18} color={'#ffffff'}/>
                                    :<MaterialCommunityIcons name='arrow-expand' size={18} color={'#ffffff'}/>
                                }
                            </TouchableOpacity>
                        </View> : null
                }
                </View>
                {
                    this.state.isFullScreen ? null
                    :<View style={{backgroundColor: 'pink', flex: 1}}>
                    <Text>ddddddd</Text>
                    <Text>ddddddd</Text>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Player: {
        flex: 1,
        backgroundColor: 'red'
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
        height: 38,
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
})
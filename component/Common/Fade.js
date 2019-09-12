import React, { Component } from 'react';
import {Animated, StyleSheet, Text, View, TouchableHighlight, Alert} from 'react-native';

class FadeIn extends Component { // 上渐显
    constructor(props) {
        super(props)
        this.state = {
            top: new Animated.Value(this.props.top),
            opacity: new Animated.Value(this.props.opacity),
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    _onToggle = (top, opacity, time)=> {
        Animated.timing(
            this.state.top,
            {
                toValue: top,
                duration: time,
            }
        ).start();

        Animated.timing(
            this.state.opacity,
            {
                toValue: opacity,
                duration: time,
            }
        ).start();
    }

    render() {
        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    top: this.state.top,
                    opacity: this.state.opacity,
                }}
            >
                {this.props.children}
            </Animated.View>
        )
    }
}

class FadeOut extends Component { //下渐显
    constructor(props) {
        super(props)
        this.state = {
            bottom: new Animated.Value(this.props.bottom),
            opacity: new Animated.Value(this.props.opacity),
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    _onToggle = (bottom, opacity, time)=> {
        Animated.timing(
            this.state.bottom,
            {
                toValue: bottom,
                duration: time,
            }
        ).start();

        Animated.timing(
            this.state.opacity,
            {
                toValue: opacity,
                duration: time,
            }
        ).start();
    }

    render() {
        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    bottom: this.state.bottom,
                    opacity: this.state.opacity,
                }}
            >
                {this.props.children}
            </Animated.View>
        )
    }
}

export {FadeIn, FadeOut}
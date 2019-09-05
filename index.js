import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createStackNavigator } from 'react-navigation';
//图标
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// 组件
import Active from './component/Active/Active';
import Home from './component/Home/Home';
import Detail from './component/Home/Detail';
import User from './component/User/User';
import Info from './component/User/Info';
import Login from './component/User/Login';

import {name as appName} from './app.json';

const TabScreen = createBottomTabNavigator({
    Active: {
        screen: Active,
        navigationOptions: {
            tabBarLabel: '活动',
            tabBarIcon: ({focused, tintColor})=>{
                return <Feather name='feather' size={21} color={tintColor}/>;
            }
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({focused, tintColor})=>{
                return <AntDesign name='staro' size={21} color={tintColor}/>;
            }
        }
    },
    User: {
        screen: User,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor})=>{
                return <FontAwesome name='user-o' size={21} color={tintColor}/>;
            }
        }
    }
}, {
    initialRouteName: 'Home', //初次加载组件
    tabBarOptions: {
        activeTintColor: '#10aeff',
        inactiveTintColor: '#999999',
        showIcon: true,
        labelStyle: {
            fontSize: 12,
            marginTop: 0,
            marginBottom: 0,
        },
        style: {
            backgroundColor: '#FCFCFC',
            paddingBottom: 2
        },
        tabStyle: {

        }
    }
});

const AppNavigator = createStackNavigator({
    Home: TabScreen,
    Active: Active,
    User: User,
    Info: Info,
    Login: Login,
    Detail: Detail
}, {
    headerMode: 'none',
    mode: 'modal'
});

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);

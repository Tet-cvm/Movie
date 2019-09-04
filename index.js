import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createStackNavigator } from 'react-navigation';
// 组件
import Active from './component/Active/Active';
import Home from './component/Home/Home';
import User from './component/User/User';
import Login from './component/User/Login';

import {name as appName} from './app.json';

const TabScreen = createBottomTabNavigator({
    Active: Active,
    Home: Home,
    User: User,
}, {
    initialRouteName: 'Home', //初次加载组件
})

const AppNavigator = createStackNavigator({
    Home: TabScreen,
    Active: Active,
    User: User,
    Login: Login
}, {
    headerMode: 'none'
});

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);

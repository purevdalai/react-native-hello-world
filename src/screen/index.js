import React from 'react';
import { Text, View, TextInput, Button, Picker, StyleSheet } from 'react-native';

import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';
import HomeScreen from './home';
import TodoScreen from './todo';

const todoStack = createStackNavigator(
    {
        todo: { screen: TodoScreen }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#42f44b'
            },
            headerTintColor: '#FFFFFF',
            title: 'Todo'
        }
    }
)

const homeStack = createStackNavigator(
    {
        home: { screen: HomeScreen }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#42f44b'
            },
            headerTintColor: '#FFFFFF',
            title: 'Home'
        }
    }
)

const App = createBottomTabNavigator(
    {
        home: { screen: homeStack },
        todo: { screen: todoStack }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({

        })
    }
)

export default createAppContainer(App);
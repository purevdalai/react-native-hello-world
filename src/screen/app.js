import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

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
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if ( routeName === 'home' )  {
          iconName = 'home'
        } else if ( routeName === 'todo' ) {
          iconName = 'list'
        }
        return <Icon name={iconName} type='font-awesome' color={tintColor} size={24} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    }
  }
)

export default createAppContainer(App);
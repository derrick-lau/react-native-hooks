import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home.js'
import Search from '../screens/Search.js'
import Upload from '../screens/Upload.js'
import Activity from '../screens/Activity.js'
import Profile from '../screens/Profile.js'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
  {
    Home: { 
      screen: Home,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: () => (
          <Ionicons name='ios-home' size={32} />
        ) 
      }
    },
    Search: { 
      screen: Search,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: () => (
          <Ionicons name='ios-search' size={32} />
        ) 
      }
    },
    Upload: { 
      screen: Upload,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: () => (
          <Ionicons name='ios-add-circle-outline' size={32} />
        ) 
      }
    },
    Activity: { 
      screen: Activity,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons name={focused ? 'ios-heart' : 'ios-heart-empty'} size={32} />
        ) 
      }
    },
    Profile: { 
      screen: Profile,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: () => (
          <Ionicons name='ios-person' size={32} />
        ) 
      }
    }
  }, 
  { 
    tabBarOptions: {
      style: {
        paddingVertical: 10,
        height: 60
      }
    }
  }
);

export default createAppContainer(TabNavigator);
import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import Login from '../screens/Login'
import HomeScreen from '../screens/Home'
import SearchScreen from '../screens/Search'
import PostScreen from '../screens/Post'
import ActivityScreen from '../screens/Activity'
import ProfileScreen from '../screens/Profile'
import CameraScreen from '../screens/Camera'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableOpacity, Image } from 'react-native'

export const HomeNavigator = createAppContainer(createStackNavigator(
  {
    Home: { 
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <Image style={{width: 120, height: 35}} source={require('../assets/logo.jpg')} />,
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('Camera')} >
            <Ionicons style={{marginLeft: 10}} name={'ios-camera'} size={30}/>
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => console.log('Message')} >
            <Ionicons style={{marginRight: 10}} name={'ios-send'} size={30}/>
          </TouchableOpacity>
        ),
      })
    },
    Camera: { 
      screen: CameraScreen,
      navigationOptions: {
        header: null
      }
    }
  }
));

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.routes.some(route => route.routeName === 'Camera')) {
    tabBarVisible = false
  }
  return {
    tabBarVisible,
  }
}

export const SearchNavigator = createAppContainer(createStackNavigator(
  {
    Search: { 
      screen: SearchScreen,
      navigationOptions: {
        title: 'Search'
      }
    }
  }
));

export const PostNavigator = createAppContainer(createStackNavigator(
  {
    Post: { 
      screen: PostScreen,
      navigationOptions: {
        title: 'Post'
      }
    }
  }
));

export const ActivityNavigator = createAppContainer(createStackNavigator(
  {
    Activity: { 
      screen: ActivityScreen,
      navigationOptions: {
        title: 'Activity'
      }
    }
  }
));

export const ProfileNavigator = createAppContainer(createStackNavigator(
  {
    Profile: { 
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile'
      }
    }
  }
));
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import FriendPostsScreen from '../screens/FriendPostsScreen';
import SearchFriendsScreen from '../screens/SearchFriendsScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyPostsScreen from '../screens/MyPostsScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import PostEditScreen from '../screens/PostEditScreen';
import PostNotesListScreen from '../screens/PostNotesListScreen';
import CommentsScreen from '../screens/CommentsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ChatScreen from '../screens/ChatScreen';

const FriendPostsStack = createStackNavigator({
  FriendPosts: FriendPostsScreen,
  SearchFriends: SearchFriendsScreen,
  PublicProfile: PublicProfileScreen,
  FR_Friends: FriendsScreen,
  FriendPostComments: CommentsScreen,
  FriendPostNotes: PostNotesListScreen,
  Chat: ChatScreen
});

FriendPostsStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => (
    <AntDesign
      focused={focused}
      name={'team'}
      size={28}
      color={tintColor}
    />
  ),
};

const MyPostsStack = createStackNavigator({
  MyPosts: MyPostsScreen,
  PostCreate: PostCreateScreen,
  PostEdit: PostEditScreen,
  Comments: CommentsScreen,
  MyPostNotes: PostNotesListScreen,
  MY_PublicProfile: PublicProfileScreen,
  MY_Friends: FriendsScreen,
});

MyPostsStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      <AntDesign
        focused={focused}
        name={'user'}
        size={25}
        color={tintColor}
      />
    );
  },
};

const NotificationsStack = createStackNavigator({
  Notifications: NotificationsScreen,
});

NotificationsStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      Platform.OS === 'ios' ? (
        <Ionicons
          focused={focused}
          name={'ios-notifications-outline'}
          size={29}
          color={tintColor}
        />
      ) : (
        <Ionicons
          focused={focused}
          name={'md-notifications-outline'}
          size={29}
          color={tintColor}
        />
      )
    );
  },
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Friends: FriendsScreen,
  FriendProfile: PublicProfileScreen,
  ProfileChat: ChatScreen
});

ProfileStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      <AntDesign
        focused={focused}
        name={'profile'}
        size={25}
        color={tintColor}
      />
    );
  },
};

export default createBottomTabNavigator({
  FriendPostsStack,
  MyPostsStack,
  NotificationsStack,
  ProfileStack,
});

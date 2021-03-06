import React from 'react';
import { Block } from 'galio-framework';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Components from '../screens/Components';
import Articles from '../screens/Articles';
import Onboarding from '../screens/Onboarding';
import SettingsScreen from '../screens/Settings';
import Feeds from '../screens/Feeds';
import AddNewFeed from '../screens/AddNewFeed';
import AddSocialPost from '../screens/AddSocialPost'
// import AddSocialPost from '../screens/Video'; //test purpose

// drawer
import CustomDrawerContent from './Menu';
// header for screens
import { Header, Icon } from '../components';
import BusyScreen from '../components/BusyScreen';

import { nowTheme, tabs } from '../constants';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          navigationOptions: ({ navigation, scene }) => ({
            header: <Header title="Components" navigation={navigation} scene={scene} />,
          }),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Settings" mode="card" headerMode="screen">
      <Stackk.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" navigation={navigation} scene={scene} />
          ),
          backgroundcolor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="Signup" mode="card" headerMode="screen">
      <Stack.Screen
        name="Signup"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Create Account" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function LoginStack(props) {
  return (
    <Stack.Navigator initialRouteName="Login" mode="card" headerMode="screen">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Login" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Profile" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          // headerTransparent: true,
        }}
      />
      {/* <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      /> */}
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              // search
              // options
              // optionLeft={'Social'}
              // optionRight={'News'}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="Feed"
        component={Feeds}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Feed"
              back
              transparent
              navigation={navigation}
              scene={scene}
              bgColor={nowTheme.COLORS.ACTIVE}
              titleColor="white"
              iconColor="white"
            />
          ),
        }}
      />
      <Stack.Screen
        name="add-new-feed"
        component={AddNewFeed}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Add New"
              back
              transparent
              navigation={navigation}
              scene={scene}
              bgColor={nowTheme.COLORS.ACTIVE}
              titleColor="white"
              iconColor="white"
            />
          ),
        }}
      />
      <Stack.Screen
        name="add-social-post"
        component={AddSocialPost}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Add New"
              back
              transparent
              navigation={navigation}
              scene={scene}
              bgColor={nowTheme.COLORS.ACTIVE}
              titleColor="white"
              iconColor="white"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Components" component={ComponentsStack} />
      {/* <Drawer.Screen name="Articles" component={ArticlesStack} /> */}
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Signup" component={AccountStack} />
      <Drawer.Screen name="Login" component={LoginStack} />
      {/* <Drawer.Screen name="Settings" component={SettingsStack} /> */}
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <>
      <Stack.Navigator mode="card" headerMode="none">
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
      {/* <BusyScreen /> */}
    </>
  );
}

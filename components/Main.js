import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ProfileScreen from './main/Profile';
import BusinessProfileScreen from './main/BusinessProfile';
import BasicInfoScreen from './main/BasicInfo';
import MedicalInfoScreen from './main/MedicalInfo';
import CameraScreen from './main/Camera';
import SearchScreen from './main/Search';
import InviteScreen from './main/Invite';

const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="BasicInfo" component={BasicInfoScreen} />
        <Drawer.Screen name="MedicalInfo" component={MedicalInfoScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="BusinessProfile" component={BusinessProfileScreen} />
        <Drawer.Screen name="Camera" component={CameraScreen} />
        <Drawer.Screen name="Search" component={SearchScreen} />
        <Drawer.Screen name="Invite" component={InviteScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


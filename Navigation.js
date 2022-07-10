import React, {useState, useEffect, useCallback } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen'
import FavoriteScreen from './Screens/FavoriteScreen'
import BookingScreen from './Screens/BookingScreen'
import ProfileScreen from './Screens/ProfileScreen'
import SearchScreen from './Screens/SearchScreen'

import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Foundation, MaterialIcons, Entypo, FontAwesome, AntDesign, Feather  } from '@expo/vector-icons'
import {
    useFonts,
    Syne_400Regular,
    Syne_500Medium,
    Syne_600SemiBold,
    Syne_700Bold,
    Syne_800ExtraBold,
} from '@expo-google-fonts/syne';
import AppLoading from "expo-app-loading";

import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';


const Navigation = ({navigation}) => {

    const logged = false;


    let [fontsLoaded] = useFonts({
        Syne_400Regular,
        Syne_500Medium,
        Syne_600SemiBold,
        Syne_700Bold,
        Syne_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const Tab = createBottomTabNavigator();


    return (

        <Tab.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor:"#48B781",
                    height:80,
                    fontSize:30
                },
                tabBarItemStyle:{
                    height:100,
                    paddingBottom:20
                },
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#236d4d',
                tabBarLabelStyle:{
                    fontSize:16,
                },
                headerStyle: {
                    backgroundColor: '#48B781',
                    height:110,
                },
                headerTitleStyle: {
                    fontFamily:"Syne_700Bold",
                    color:"#FFF",
                    fontSize:20
                },
                headerTitleAlign: 'left',
                headerTitle:"Larguez les amarres",
               }}>



            {logged === false &&
                <Tab.Screen
                    name="HomeScreen" component={LoginScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<AntDesign name="login" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
                &&
                <Tab.Screen
                    name="HomeScreen" component={LoginScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<AntDesign name="register" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
            }

            {logged === true &&
                <Tab.Screen
                    name="HomeScreen" component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<Foundation name="home" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
                &&
                <Tab.Screen
                    name="Search" component={SearchScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            ( <Feather name="search" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
                &&
                <Tab.Screen
                    name="Favorite" component={FavoriteScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<MaterialIcons name="favorite" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
                &&
                <Tab.Screen
                    name="Booking"
                    component={BookingScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<Entypo name="calendar" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
                &&

                <Tab.Screen
                    name="Profil"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<FontAwesome name="user" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
            }

        </Tab.Navigator>
    );
};

export default Navigation
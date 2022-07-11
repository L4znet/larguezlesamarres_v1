import React, {useState, useEffect, useCallback } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FeedScreen from './Screens/FeedScreen'
import FavoriteScreen from './Screens/FavoriteScreen'
import BookingScreen from './Screens/BookingScreen'
import ProfileScreen from './Screens/ProfileScreen'
import SearchScreen from './Screens/SearchScreen'

import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'

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

const Tab = createBottomTabNavigator();

const Navigation = ({navigation}) => {

    // Est ce que l'utilisateur est connecté
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
                    height:120,
                },
                headerTitleStyle: {
                    fontFamily:"Syne_700Bold",
                    color:"#FFF",
                    fontSize:20
                },
                headerTitleAlign: 'left',
                headerTitle:"Larguez les amarres",
                headerRight: () => <TouchableOpacity style={styles.header.profil} onPress={() => { navigation.push('Profile'); }}>
                    <Text><AntDesign name="user" size={35} color="#48B781" /> </Text>
                </TouchableOpacity>}}>

            <Tab.Screen
                name="Feed" component={FeedScreen}
                options={{
                    tabBarIcon: ({focused}) =>
                        (<Foundation name="home" size={30} color={focused ? "#FFF" : "#348d65"}/>),
                    title: "",
                }}
            />
            <Tab.Screen
                name="Search" component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        ( <Feather name="search" size={30} color={focused ? "#FFF" : "#348d65"} />),
                    title:"",
                }}
            />

            {/** Si l'utilisateur est connecté, on lui affiche l'écran voulu, sinon on le redirige vers la page de connexion. **/}

            {logged == true &&
                <Tab.Screen
                    name="Favorite" component={FavoriteScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<MaterialIcons name="favorite" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
            }
            {logged == false &&
                <Tab.Screen
                    name="Favorite" component={LoginScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<MaterialIcons name="favorite" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
            }


            {logged == true &&
                <Tab.Screen
                    name="Booking"
                    component={BookingScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<Entypo name="calendar" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
            }
            {logged == false &&
                <Tab.Screen
                    name="Booking"
                    component={LoginScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            (<Entypo name="calendar" size={30} color={focused ? "#FFF" : "#348d65"} />),
                        title:"",
                    }}
                />
            }

        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    header:{
        profil:{
            width:60,
            height:60,
            backgroundColor:"#FFF",
            borderRadius:"50%",
            marginBottom:10,
            marginRight:10,
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }
    }
})

export default Navigation
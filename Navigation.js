import React, {useState, useEffect, useCallback } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen'
import FavoriteScreen from './Screens/FavoriteScreen'
import TchatScreen from './Screens/TchatScreen'
import BookingScreen from './Screens/BookingScreen'
import ProfileScreen from './Screens/ProfileScreen'
import SearchScreen from './Screens/SearchScreen'
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


const Navigation = (navigation) => {


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
                    height:110,
                    fontSize:30,
                    paddingTop:20,
                },
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#236d4d',
                tabBarLabelStyle:{
                    fontSize:16
                },
                headerStyle: {
                    backgroundColor: '#48B781',
                    height:130,
                },
                headerTitleStyle: {
                    fontFamily:"Syne_700Bold",
                    color:"#FFF",
                    fontSize:20
                },
                headerTitleAlign: 'left',
                headerTitle:"Larguez les amarres",
                headerRight: () => <TouchableOpacity style={styles.header.profil}>
                   <Text><AntDesign name="user" size={40} color="#48B781" /> </Text>
                </TouchableOpacity>}}>
            <Tab.Screen
                name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        (<Foundation name="home" size={30} color={focused ? "#FFF" : "#348d65"} />),
                    title:"Feed",
                }}
            />
            <Tab.Screen
                name="Search" component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        ( <Feather name="search" size={30} color={focused ? "#FFF" : "#348d65"} />),
                    title:"Recherche",
                }}
            />
            <Tab.Screen
                name="Favorite" component={FavoriteScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        (<MaterialIcons name="favorite" size={30} color={focused ? "#FFF" : "#348d65"} />),
                    title:"Vos favoris",
                }}
            />
            <Tab.Screen
                name="Booking"
                component={BookingScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        (<Entypo name="calendar" size={30} color={focused ? "#FFF" : "#348d65"} />),
                    title:"Réservations",
                }}
            />
        </Tab.Navigator>
    );
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
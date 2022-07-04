import React, {useState} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen'
import FavoriteScreen from './Screens/FavoriteScreen'
import TchatScreen from './Screens/TchatScreen'
import BookingScreen from './Screens/BookingScreen'
import ProfileScreen from './Screens/ProfileScreen'
import { Foundation, MaterialIcons, Entypo, FontAwesome  } from '@expo/vector-icons';

const Navigation = (navigation) => {


    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor:"#3FDEFF",
                    height:110,
                    fontSize:30,
                    paddingTop:20,
                },
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#198298',
                tabBarLabelStyle:{
                    fontSize:16
                }
            }}
        >
            <Tab.Screen
                name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        (<Foundation name="home" size={30} color={focused ? "#FFF" : "#198298"} />)
                }}
            />
            <Tab.Screen
                name="Favorite" component={FavoriteScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        (<MaterialIcons name="favorite" size={30} color={focused ? "#FFF" : "#198298"} />)
                }}
            />
            <Tab.Screen
                name="Tchat" component={TchatScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        (<Entypo name="message" size={30} color={focused ? "#FFF" : "#198298"} />)
                }}
            />
            <Tab.Screen
                name="Booking"
                component={BookingScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        (<Entypo name="calendar" size={30} color={focused ? "#FFF" : "#198298"} />)
                }}
            />
            <Tab.Screen
                name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        (<FontAwesome name="user"  size={30} color={focused ? "#FFF" : "#198298"} />)
                }}
            />
        </Tab.Navigator>
    );
};


export default Navigation
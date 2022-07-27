import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import HomeScreen from './Screens/HomeScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "./firebase";
import {useState} from "react";
import EditProfilScreen from "./Screens/EditProfilScreen";
import {Provider} from "react-redux";
import {store} from "./store";
import AddPostScreen from "./Screens/AddPostScreen";
import ShowPostScreen from "./Screens/ShowPostScreen";

const Stack = createNativeStackNavigator();

export default function App() {

    const [isUserLogged, setUserLogged] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserLogged(true)
        } else {
            setUserLogged(false)
        }
    });


  return (
      <Provider store={store}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="Tabs" component={Navigation} options={{ headerShown: false }} />
                  <Stack.Screen name="Login" options={{
                      title: 'Larguez les amarres',
                      headerStyle: {
                          backgroundColor: '#48B781',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                          fontWeight: 'bold',
                          fontFamily:"Syne_700Bold",
                          color:"#FFF",
                          fontSize:20
                      },
                      headerBackVisible:false
                  }}
                  component={LoginScreen} />
                  <Stack.Screen name="Register"
                                options={{
                                    title: 'Larguez les amarres',
                                    headerStyle: {
                                        backgroundColor: '#48B781',
                                    },
                                    headerTintColor: '#fff',
                                    headerTitleStyle: {
                                        fontWeight: 'bold',
                                        fontFamily:"Syne_700Bold",
                                        color:"#FFF",
                                        fontSize:20
                                    },
                                    headerBackVisible:false
                                }}
                                component={RegisterScreen} />


                  {isUserLogged === false &&
                      <Stack.Screen
                          name="Profile"
                          component={HomeScreen}
                          options={{
                              title: 'Larguez les amarres',
                              headerStyle: {
                                  backgroundColor: '#48B781',
                              },
                              headerTintColor: '#fff',
                              headerTitleStyle: {
                                  fontWeight: 'bold',
                                  fontFamily:"Syne_700Bold",
                                  color:"#FFF",
                                  fontSize:20
                              },
                              headerBackVisible:false
                          }}
                      />
                  }
                  {isUserLogged === true &&
                      <Stack.Screen options={{
                          title: 'Larguez les amarres',
                          headerStyle: {
                              backgroundColor: '#48B781'
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                              fontFamily:"Syne_700Bold",
                              color:"#FFF",
                              fontSize:20
                          },
                          headerBackVisible:false }}
                                    name="Profile"
                                    component={ProfileScreen} />
                  }

                  {isUserLogged === true &&
                      <Stack.Screen options={{
                          title: 'Larguez les amarres',
                          headerStyle: {
                              backgroundColor: '#48B781'
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                              fontFamily:"Syne_700Bold",
                              color:"#FFF",
                              fontSize:20
                          },
                          headerBackVisible:false }}
                                    name="EditProfil"
                                    component={EditProfilScreen} />
                  }

                  {isUserLogged === true &&
                      <Stack.Screen options={{
                          title: 'Larguez les amarres',
                          headerStyle: {
                              backgroundColor: '#48B781'
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                              fontFamily:"Syne_700Bold",
                              color:"#FFF",
                              fontSize:20
                          },
                          headerBackVisible:false }}
                                    name="AddPost"
                                    component={AddPostScreen} />
                  }
                  {isUserLogged === true &&
                      <Stack.Screen options={{
                          title: 'Larguez les amarres',
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                              fontFamily:"Syne_700Bold",
                              color:"#FFF",
                              fontSize:20
                          },
                          headerBackVisible:false,
                          headerShown:false
                      }}
                                    name="ShowPost"
                                    component={ShowPostScreen} />
                  }

              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
}


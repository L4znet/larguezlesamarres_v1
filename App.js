import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import HomeScreen from './Screens/HomeScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const logged = false;

export default function App() {

  return (
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
                            }}r
                            component={RegisterScreen} />


              {logged === false &&
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
              {logged === true &&
                  <Stack.Screen option={{
                      headerStyle: {
                          backgroundColor: '#f4511e',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                          fontWeight: 'bold',
                      },
                      headerTitleAlign: 'left',
                      headerTitle:"Larguez les amarres",
                  }}
                      name="Profile"
                      component={ProfileScreen} />
              }

          </Stack.Navigator>
      </NavigationContainer>

  );
}


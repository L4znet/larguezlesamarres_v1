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
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import EditPostScreen from "./Screens/EditPostScreen";
import ResultsScreen from "./Screens/ResultsScreen";
import OfferBookingScreen from "./Screens/OfferBookingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import {StripeProvider} from "@stripe/stripe-react-native";
import * as Linking from 'expo-linking';
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

    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: '#1bff00', borderLeftWidth:10, height:100}}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 20,
                    fontWeight: '400'
                }}
                text2Style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color:"#000",
                       width:"100%",
                }}
            />
        ),
        error: (props) => (
            <ErrorToast
                {...props}
                text1Style={{
                    fontSize: 20,
                    fontWeight: '400'
                }}
                text2Style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color:"#000"
                }}
            />
        ),
        tomatoToast: ({ text1, props }) => (
            <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
                <Text>{text1}</Text>
                <Text>{props.uuid}</Text>
            </View>
        )
    };

    const prefix = Linking.createURL('/');

    const linking = {
        prefixes: [prefix],
    };


    return (
        <StripeProvider
            publishableKey="pk_test_51LVn5JL4arJWUBbmOSkZphMuSBftatz3P54TS9huruc1XOCN1RqcIrLUmHxNwEtWE7R1m48BWkXoqEgDLCixHP2y00MPGChMt8"
            urlScheme={"larguezlesamarres://"}
            merchantIdentifier="merchant.com.larguezlesamarres"
        >
            <Provider store={store}>
                <NavigationContainer linking={linking} fallback={<Text>Loading....</Text>}>
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

                        {isUserLogged === true &&
                            <Stack.Screen
                                name="EditPost"
                                component={EditPostScreen}
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
                                          name="Results"
                                          component={ResultsScreen}
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
                                          name="Payment"
                                          component={PaymentScreen}
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
                                          name="OfferBooking"
                                          component={OfferBookingScreen}
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
                <Toast config={toastConfig} />
            </Provider>
        </StripeProvider>

  );
}


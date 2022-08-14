import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Modal, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useFetch from "react-fetch-hook";
import {useCallback, useEffect, useState} from "react";
import {auth, db} from "../firebase";
import axios from "axios";
import GestureRecognizer from "react-native-swipe-gestures";
import {collection, doc, getDoc, getDocs, query, where, onSnapshot, updateDoc, setDoc} from "firebase/firestore";
import {CardField, presentPaymentSheet, useStripe} from '@stripe/stripe-react-native';
import {uid} from "uid";

const DeclineBookingScreen = ({route, navigation}) => {

    const {id} = route.params;
    return (
        <View style={styles.box}>
            <Text style={styles.title}>Malheureusement</Text>
            <Text style={styles.title}>votre réservation a été refusée</Text>
            <Text style={styles.title}>par <Text style={styles.bold}>John Doe</Text></Text>
            <Text style={styles.subtitle}>Vous pouvez réserver de nouveau depuis l'offre</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate("ShowPost", {
                    id: id,
                });
            }}>
                <Text>Aller sur l'offre</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    box:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        marginTop:20
    },
    bold:{
        fontWeight:"bold"
    },
    title:{
        fontSize:30,
        fontWeight:"300",
        textAlign:"center",
        marginVertical:10,
    },
    subtitle:{
        fontSize:20,
        fontWeight:"300",
        textAlign:"center",
    },
    text:{
        marginTop:20,
        fontSize:20,
    },
    button:{
        width:300,
        height:80,
        marginTop:50,
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        borderRadius:15
    },
    normal:{
        backgroundColor:"#2686d0"
    },
    danger:{
        backgroundColor:"#c53e3e"
    },
    label:{
        color:"#FFF",
        fontSize:25
    }
})

export default DeclineBookingScreen;
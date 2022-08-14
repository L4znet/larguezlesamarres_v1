import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useFetch from "react-fetch-hook";
import {useCallback, useEffect, useState} from "react";
import {auth, db} from "../firebase";
import axios from "axios";
import GestureRecognizer from "react-native-swipe-gestures";
import {collection, doc, getDoc, getDocs, query, where, onSnapshot} from "firebase/firestore";
import navigation from "../Navigation";
import firebase from "firebase/compat";


const bookedItemHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={{ fontWeight: '800', fontSize: 23, color: '#000', textAlign:"center" }}>Votre historique de réservation</Text>
        </View>
    );
}

const BookedItem = (props) => {

    let state = ""
    let style = ""
    switch (JSON.parse(props.item).state) {
        case '0':
            state = "En attente"
            style = {color: "#3fbdf1"}
            break;
        case '1':
            state = "Acceptée"
            style = {color: "#56e12a"}
            break;
        case '2':
            state = "En cours"
            style = {color: "#006cff"}
            break;
        case '3':
            state = "Passée"
            style = {color: "#bababa"}
            break;
        case '-1':
            state = "Refusée"
            style = {color: "#e13838"}
            break;
    }

    let navigation = props.navigation

    const goToNextScreen = () => {

        if(JSON.parse(props.item).state === "1"){
            navigation.navigate("Payment", {
                item: JSON.parse(props.item)
            });
        } else if(JSON.parse(props.item).state === "-1") {
            navigation.navigate("DeclineBooking", {
                id: JSON.parse(props.item).post.id
            });
        }
    }

    return (
        <TouchableOpacity style={styles.item} onPress={() => goToNextScreen()}>
            <View style={{flexDirection:"column", display:"flex"}}>
                <Text style={styles.item.title}>{JSON.parse(props.item).post.title}</Text>
                <Text style={[styles.state, style]}>{state}</Text>
            </View>
        </TouchableOpacity>
    )
}


const BookingScreen = ({navigation, route}) => {
    const [modalState, setModalState] = useState(false);
    const [postData, setPostData] = useState([]);
    const [bookingData, setBookingData] = useState(null);
    const [clickedBooking, setClickedBooking] = useState([]);

    const getBooking = async () => {
       const q = query(collection(db, "messages"), where(firebase.firestore.FieldPath.documentId(), '==', auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let bookings = [];
            querySnapshot.forEach((doc) => {
                bookings.push(doc.data());
            });
            let bookingData = []
            for (const property in bookings[0]) {
                bookingData.push(JSON.stringify(bookings[0][property]))
            }

            setBookingData(bookingData)
        });
    }

    useEffect( () => {
         getBooking()
        return () => {
            setBookingData([]);
        };
    }, [])


    const formatDate = (dateToFormat) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };

        let date = new Date(dateToFormat)
        return date.toLocaleDateString("fr-FR", options)
    }



    return (
        <>
            <FlatList
                style={styles.recentlyItemContainer}
                ListHeaderComponent={bookedItemHeader}
                data={bookingData}
                renderItem={({ item }) => <BookedItem navigation={navigation} item={item}/>}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </>

    );
}


const styles = StyleSheet.create({
    button:{
        width:250,
        height:70,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10
    },
    button_label:{
        color:"#FFF",
        fontSize:30
    },
    accept:{
        backgroundColor:"#5bc737"
    },
    decline:{
        backgroundColor:"#e13838"
    },
    bold:{
        fontWeight:"bold"
    },
    explainingLabel:{
        fontWeight:"300"
    },
    label:{
        fontSize:27,
        color:"#000000",
        textAlign:"center"
    },
    modalBooking:{
        width:"100%",
        height:700,
        backgroundColor:"#ffffff",
        paddingVertical:100,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
        display:"flex",
        alignItems:"center"
    },
    state:{
        fontSize:17,
        fontWeight:"bold",
        display:"flex",
        justifyContent:"flex-end",
        marginRight:20,
    },

    header:{
        height:80,
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFF"
    },
    item:{
        width:"100%",
        height:100,
        backgroundColor:"#FFF",
        marginTop:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingLeft:20,
        title:{
            fontSize:20,
            width:"100%",
            fontWeight:"bold"
        },
        askedBy:{
            fontSize:18
        },
    },

    buttons:{
        width:"auto",
        display:"flex",
        flexDirection:"row",
        button:{
            paddingHorizontal:30,
            height:85,
            width:80
        },
        accept:{
            backgroundColor:"#52c848"
        },
        decline:{
            backgroundColor:"#c84848"
        }
    }

})

export default BookingScreen;
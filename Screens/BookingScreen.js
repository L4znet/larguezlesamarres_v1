import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useFetch from "react-fetch-hook";
import {useCallback, useEffect, useState} from "react";
import {auth, db} from "../firebase";
import axios from "axios";
import GestureRecognizer from "react-native-swipe-gestures";
import {collection, doc, getDoc, getDocs, query, where, onSnapshot} from "firebase/firestore";


const bookedItemHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={{ fontWeight: '800', fontSize: 23, color: '#000', textAlign:"center" }}>Votre historique de réservation</Text>
        </View>
    );
}

const BookedItem = ({item}) => {

    let state = ""
    let style = ""
    switch (JSON.parse(item).state) {
        case '0':
            state = "En attente"
            style = {color: "#3fbdf1"}
            break;
        case '1':
            state = "Acceptée"
            style = {color: "#56e12a"}
            break;
        case '2':
            state = "Passée"
            style = {color: "#bababa"}
            break;
        case '-1':
            state = "Refusée"
            style = {color: "#e13838"}
            break;
    }

    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            props.openModalProps()
        }}>
            <View style={{flexDirection:"column", display:"flex"}}>
                <Text style={styles.item.title}>{JSON.parse(item).post.title}</Text>
                <Text style={[styles.state, style]}>{state}</Text>
            </View>
        </TouchableOpacity>
    )
}


const BookingScreen = ({route}) => {
    const [modalState, setModalState] = useState(false);
    const [postData, setPostData] = useState([]);
    const [bookingData, setBookingData] = useState(null);
    const [clickedBooking, setClickedBooking] = useState([]);

    const getBooking = async () => {

        const colRef = collection(db, "messages");
        const docSnap = await getDocs(colRef);

        let bookings = []

        docSnap.forEach(doc => {
            bookings.push(doc.data());
        })
        let test = []
        for (const property in bookings[0]) {
            test.push(JSON.stringify(bookings[0][property]))
        }
        setBookingData(test)

    }


    useEffect( () => {

        const controller = new AbortController();
        controller.signal;
        getBooking()
        return () => controller.abort();
    }, [])



    const openModal = () => {
        setModalState(!modalState)
    }

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
                renderItem={({ item }) => <BookedItem item={item}/>}
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
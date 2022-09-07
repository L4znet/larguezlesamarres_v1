import * as React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useEffect, useState} from "react";
import {auth, db} from "../firebase";
import {collection, query, where, onSnapshot} from "firebase/firestore";
import firebase from "firebase/compat";
import Toast from "react-native-toast-message";


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

    console.log(typeof props.item.state)


    switch (props.item.state) {
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
            style = {color: "#aeaeae"}
            break;
        case '-1':
            state = "Refusée"
            style = {color: "#e13838"}
            break;
    }

    let navigation = props.navigation

    const goToNextScreen = () => {

        switch (props.item.state) {
            case "1":
                navigation.navigate("Payment", {
                    item: props.item
                });
            break;
            case "2":
                let todayDate = new Date();
                let endDate = new Date(props.item.endDate.seconds*1000);
                const monthTodayDate = todayDate.getMonth()+1;
                const monthDateToCheck = endDate.getMonth()+1;
                todayDate = todayDate.getDate()+"-"+monthTodayDate+"-"+todayDate.getFullYear()
                endDate = endDate.getDate()+"-"+monthDateToCheck+"-"+endDate.getFullYear()

                if(todayDate === endDate){

                    navigation.navigate("EndBooking", {
                        tenantId: props.item.tenantId,
                        offerId:props.item.post.id,
                        bookingId:props.item.bookingId,
                    });
                } else {
                    Toast.show({
                        type: 'info',
                        text1: 'Revenez plus tard',
                        text2: 'Votre réservation est en cours...'
                    });
                }
            break;
            case "-1":
                navigation.navigate("DeclineBooking", {
                    id: props.item.post.id
                });
            break;
        }


        console.log(state)
    }

    return (
        <TouchableOpacity style={styles.item} onPress={() => goToNextScreen()}>
            <View style={{flexDirection:"column", display:"flex"}}>
                <Text style={styles.item.title}>{props.item.post.title}</Text>
                <Text style={[styles.state, style]}>{state}</Text>
            </View>
        </TouchableOpacity>
    )
}


const BookingScreen = ({navigation, route}) => {
    const [bookingData, setBookingData] = useState(null);

    const getBooking = async () => {


       const q = query(collection(db, "messages"), where(firebase.firestore.FieldPath.documentId(), '==', auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let bookings = [];
            querySnapshot.forEach((doc) => {
                bookings.push(doc.data());
            });
            let bookingDataToSet = []
            let bookingData = []
            for (const property in bookings[0]) {
                bookingDataToSet.push(JSON.stringify(bookings[0][property]))
            }
            for (const property in JSON.parse(bookingDataToSet)) {
                bookingData.push(JSON.parse(bookingDataToSet)[property])
            }
            setBookingData(bookingData)
        });



    }

    useEffect( () => {
        const controller = new AbortController();
        controller.signal;
        getBooking()
        return () => controller.abort();
    }, [])


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
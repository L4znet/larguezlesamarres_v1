import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {auth, db} from "../firebase";
import {collection, doc, setDoc, updateDoc} from "firebase/firestore";

const EndBookingScreen = (props) => {

    const formatDate = () => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };

        let date = new Date()
        return date.toLocaleDateString("fr-FR", options)
    }

    let tenantId = props.route.params.tenantId
    let bookingId = props.route.params.bookingId
    let offerId = props.route.params.offerId
    let now = formatDate()


    const endBooking = async () => {
        const endBookingMessageRef = collection(db, "messages/")
        await setDoc(doc(endBookingMessageRef, tenantId), {
            [auth.currentUser.uid]: {
                [bookingId]: {
                    state: "3",
                }
            }
        }, {
            merge: true
        }).then(() => {
        });


        const endBookingRef = doc(db, "posts", offerId, "bookings", bookingId);
        await updateDoc(endBookingRef, {state: "3"});
    }


    return (
        <>
            <View style={styles.box}>
                <Text style={styles.title}>Nous somme le</Text>
                <Text style={styles.now}>{now}</Text>
                <Text style={styles.title}>Votre réservation prend fin aujourd'hui</Text>
                <Text style={styles.title}>Une dernière chose...</Text>
                <Text style={styles.subtitle}>Pouvez-vous confirmer avoir restitué son bien à son propriétaire, pour terminer cette réservation.</Text>
                <TouchableOpacity style={[styles.button, styles.normal]} onPress={() => { endBooking() }}>
                    <Text style={styles.label}>Je confirme !</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Nous vous en remercions !</Text>
            </View>
        </>
    )


}


const styles = StyleSheet.create({
    box:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        marginTop:20,
    },
    bold:{
        fontWeight:"bold"
    },
    title:{
        fontSize:30,
        fontWeight:"300",
        textAlign:"center",
        marginVertical:10,
        paddingHorizontal:10
    },
    now:{
        fontSize:30,
        fontWeight:"bold",
        textAlign:"center",
        paddingHorizontal:10,
        marginBottom:10
    },
    subtitle:{
        fontSize:20,
        fontWeight:"300",
        textAlign:"center",
        paddingHorizontal:10
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

export default EndBookingScreen;
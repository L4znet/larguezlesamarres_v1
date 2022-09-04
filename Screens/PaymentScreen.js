import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useEffect, useState} from "react";
import {auth, db} from "../firebase";
import {collection, doc, updateDoc, setDoc} from "firebase/firestore";
import {useStripe} from '@stripe/stripe-react-native';

const PaymentScreen = ({route, navigation}) => {
    const {item} = route.params;

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [totalamount, setTotal] = useState(0);

    const monthDiff = (dateFrom, dateTo) => {
        return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
    }


    const fetchPaymentSheetParams = async () => {

        let price = item.post.price
        let perPrice = item.post.pricePer
        let start = item.startDate
        let end = item.endDate

        let startDate = new Date(start);
        let endDate = new Date(end);

        let diff_time = endDate.getTime() - startDate.getTime();
        let diff_days = diff_time / (1000 * 3600 * 24);

        let total = 0;

        switch (perPrice) {
            case "semaine":
                total = price * (diff_days / 7)
                break
            case "month":
                total = price * monthDiff(startDate, endDate)
                break
            case "hour":
                total = price * diff_days
                break
            case "day":
                total = price * diff_days
                break
        }

        setTotal(total.toFixed(2))

        const response = await fetch(`http://192.168.1.24:3000/api/payment/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({amount:total.toFixed(2)})
        });
        const { paymentIntent, ephemeralKey, customer} = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            amount:5000,
            allowsDelayedPaymentMethods: true,
        });
        if (!error) {
            setLoading(true);
        }
    };


    const updateState = async () => {
        const bookingRef = doc(db, "posts", item.post.id, "bookings", item.bookingId);
        await updateDoc(bookingRef, {state: "2"});

        const messageRef = collection(db, "messages/")
        await setDoc(doc(messageRef, auth.currentUser.uid), {
            [item.bookingId]:{
                state:"2"
            }
        }, {
            merge: true
        }).then(() => {
        });
    }


    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (!error) {
            // Le paiement a été validée
            await updateState()
            navigation.navigate('Booking')
        } else {

        }
    };

    useEffect(() => {
        const controller = new AbortController();
        controller.signal;
        initializePaymentSheet()
        return () => controller.abort();
    }, []);


    const formatDate = (dateToFormat) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };

        let date = new Date(dateToFormat)
        return date.toLocaleDateString("fr-FR", options)
    }

    return (
        <View style={styles.box}>
            <Text style={styles.title}>Génial !</Text>
            <Text style={styles.title}>Votre réservation a été acceptée !</Text>
            <Text style={styles.subtitle}>Vous pourrez profiter de votre bateau </Text>
            <Text style={styles.subtitle}>Du <Text style={styles.bold}> {formatDate(item.startDate)} </Text> </Text>
            <Text style={styles.subtitle}>Au <Text style={styles.bold}>{formatDate(item.endDate)}</Text> </Text>

            <Text style={styles.text}>Prix unitaire de <Text style={styles.bold}>{item.post.price} € par {item.post.pricePer} </Text></Text>
            <Text style={styles.text}>Pour un total de <Text style={styles.bold}>{ totalamount } €</Text></Text>
            <TouchableOpacity style={[styles.button, styles.normal]} onPress={() => { openPaymentSheet() } }>
                <Text style={styles.label}>Régler { totalamount } €</Text>
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

export default PaymentScreen;
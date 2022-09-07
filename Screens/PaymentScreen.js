import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useEffect, useState} from "react";
import {auth, db} from "../firebase";
import {collection, doc, updateDoc, setDoc} from "firebase/firestore";
import {useStripe} from '@stripe/stripe-react-native';
import Toast from "react-native-toast-message";

const PaymentScreen = ({route, navigation}) => {
    const {item} = route.params;

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [totalamount, setTotal] = useState(0);

    const monthDiff = (dateFrom, dateTo) => {
        return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
    }


    const fetchPaymentSheetParams = async () => {

        let price = item.post.price
        let perPrice = item.post.pricePer
        let start = item.startDate
        let end = item.endDate

        let startDate = new Date(start.seconds*1000);
        let endDate = new Date(end.seconds*1000);

        let diff_time = endDate.getTime() - startDate.getTime();
        let diff_days = diff_time / (1000 * 3600 * 24);

        let total = 0;

        switch (perPrice) {
            case "semaine":
                total = price * (diff_days / 7)
                break
            case "mois":
                total = price * monthDiff(startDate, endDate)
                break
            case "jour":
                total = price * diff_days
                break
        }

        setTotal(total.toFixed(2))

        const response = await fetch(`https://apilarguezlesamarres.vercel.app/api/payment/payment-sheet`, {
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
            allowsDelayedPaymentMethods: true,
        });
    };


    const updateState = async () => {

        const bookingRef = doc(db, "posts", item.post.id, "bookings", item.bookingId);
        await updateDoc(bookingRef, {state: "2"});

        const messageRef = collection(db, "messages/")
        await setDoc(doc(messageRef, auth.currentUser.uid), {
            [item.tenantId]:{
                [item.bookingId]:{
                    state:"2"
                }
            }
        }, {
            merge: true
        }).then(() => {
        });
    }


    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (!error) {
            await updateState()
            Toast.show({
                type: 'success',
                text1: 'Paiement réussi',
                text2: 'Offre réglée avec succès'
            });
            navigation.navigate('Feed')
        } else if(error.code === "Canceled"){
            Toast.show({
                type: 'error',
                text1: "Transaction annulée",
                text2: "Nous n'avons pas pu procéder au paiement"
            });
            navigation.navigate('Booking')
        }
    };

    useEffect(() => {

        initializePaymentSheet()

    }, []);


    const formatDate = (dateToFormat) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };

        let date = new Date(dateToFormat.seconds*1000)
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
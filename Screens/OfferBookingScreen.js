import * as React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {auth, db} from "../firebase";
import GestureRecognizer from "react-native-swipe-gestures";
import {collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc} from "firebase/firestore";
import {uid} from "uid";


const bookedItemHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={{ fontWeight: '800', fontSize: 23, color: '#000', textAlign:"center" }}>Les réservations sur vos véhicules</Text>
        </View>
    );
}

const BookedItem = (props) => {

    let state = "";
    let style = "";
    switch (props.bookingClicked.state) {
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

    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            props.openModalProps()
            props.defineBookingId(props.bookingClicked)
        }}>
            <View style={{flexDirection:"column", display:"flex"}}>
                <Text style={styles.item.title}>{props.postData.title}</Text>
                <Text style={[styles.state, style]}>{state}</Text>
                <Text style={styles.item.askedBy}>Demande envoyée par {props.bookingClicked.tenantName}</Text>
            </View>
        </TouchableOpacity>
    )
}


const OfferBookingScreen = ({route, navigation}) => {

    const {offerId} = route.params
    const [modalState, setModalState] = useState(false);
    const [postData, setPostData] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [clickedBooking, setClickedBooking] = useState([]);

    const getBooking = async () => {

        const docRef = doc(db, "posts", offerId);
        const docSnap = await getDoc(docRef);
        setPostData(docSnap.data())

        const subColRef = collection(db, "posts", offerId, "bookings");
        const q = query(subColRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let bookings = []
            querySnapshot.forEach((doc) => {
                bookings.push(doc.data())
            });
            setBookingData(bookings)
        });
    }


    useEffect( () => {
        getBooking()
        return () => {
            setBookingData([])
        }
    }, [])

    const sendMessage = async (state) => {
        const messageRef = collection(db, "messages/")
        await setDoc(doc(messageRef, clickedBooking.tenantId), {
        [auth.currentUser.uid]:{
            [clickedBooking.id]:{
                state:state,
            }
        }
        }, {
            merge: true
        }).then(() => {
        });
    }


    const updateStateBooking = async (id, state) => {
        const bookingToAcceptRef = doc(db, "posts", offerId, "bookings", id);
        await updateDoc(bookingToAcceptRef, {state: state});
    }


    const acceptBooking = async (id) => {
        await updateStateBooking(id, "1")
        await sendMessage("1")
        setModalState(false)
    }


    const declineBooking = async (id) => {
        await updateStateBooking(id, "-1")
        await sendMessage("-1")
        setModalState(false)
    }



    const openModal = () => {
        setModalState(true)
    }

    const formatDate = (dateToFormat) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };

        let date = new Date(dateToFormat)
        return date.toLocaleDateString("fr-FR", options)
    }

    return (
        <>
            <GestureRecognizer onSwipeDown={ () => setModalState(false) } >
                <Modal
                    animationType="slide"
                    visible={modalState}
                    transparent={true}
                    onRequestClose={() => {
                        setModalState(!modalState);
                    }}>
                    <View style={styles.modalBooking}>

                        {parseInt(clickedBooking.state) === 0 &&
                            <>
                                <Text style={[styles.label, styles.explainingLabel]}>
                                    <Text style={styles.bold}>{clickedBooking.tenantName}</Text> aimerait
                                </Text>

                                <Text style={[styles.label, styles.explainingLabel]}>
                                    réserver votre bateau
                                </Text>
                                <Text style={[styles.label, styles.explainingLabel, {marginTop:10}]}>
                                    <Text style={styles.bold}>"{postData.boatName}"</Text>
                                </Text>
                                <Text style={[styles.label, styles.explainingLabel, {marginTop:10}]}>
                                    du <Text style={styles.bold}>{formatDate(clickedBooking.startDate)}</Text>
                                </Text>
                                <Text style={[styles.label, styles.explainingLabel]}>
                                    au <Text style={styles.bold}>{formatDate(clickedBooking.endDate)}</Text>
                                </Text>
                                <Text style={[styles.label, styles.explainingLabel, {marginVertical:20}]}>Vous pouvez</Text>

                                <TouchableOpacity style={[styles.button, styles.accept]} onPress={() => acceptBooking(clickedBooking.id)}>
                                    <Text style={styles.button_label}>Accepter</Text>
                                </TouchableOpacity>
                                <Text style={[styles.label, styles.explainingLabel]}>ou</Text>
                                <TouchableOpacity style={[styles.button, styles.decline]} onPress={() => declineBooking((clickedBooking.id))}>
                                    <Text style={styles.button_label}>Refuser</Text>
                                </TouchableOpacity>

                                <Text style={[styles.label, styles.explainingLabel]}>sa demande.</Text>
                                <Text style={[styles.label, styles.explainingLabel, {marginTop:30}]}>Ensuite nous informerons </Text>
                                <Text style={[styles.label, styles.explainingLabel]}><Text style={[styles.label, styles.bold]}>{clickedBooking.tenantName}</Text> </Text>
                                <Text style={[styles.label, styles.explainingLabel]}> de votre réponse :)</Text>
                            </>
                        }

                        {parseInt(clickedBooking.state) !== 0 &&
                            <>
                                <Text style={[styles.label, styles.explainingLabel]}>
                                    <Text style={styles.bold}>Vous avez déjà transmis votre réponse pour cette réservation.</Text>
                                </Text>
                                <Text style={[styles.label, styles.explainingLabel]}>
                                    <Text>Cette réservation prendra fin le </Text>
                                </Text>
                                <Text style={[styles.label, styles.explainingLabel]}>
                                    <Text style={styles.bold}>{formatDate(clickedBooking.endDate)}</Text>
                                </Text>
                            </>
                        }

                    </View>
                </Modal>
            </GestureRecognizer>
            <FlatList
                style={styles.recentlyItemContainer}
                ListHeaderComponent={bookedItemHeader}
                data={bookingData}
                renderItem={({ item }) => <BookedItem key={item.offerId} bookingClicked={item} postData={postData} defineBookingId={(item) => {
                    setClickedBooking(item)
                }} openModalProps={openModal} item={item}/>}
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
            fontWeight:"bold",
            marginBottom:5
        },
        askedBy:{
            fontSize:18,
            fontWeight:"bold",
            marginTop:5
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

export default OfferBookingScreen;
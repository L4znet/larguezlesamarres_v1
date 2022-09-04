import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity, ScrollView,
    ActivityIndicator,
    Modal
} from "react-native";
import {AntDesign, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {auth, db} from "../firebase";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {uid} from "uid";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    collection,
    deleteDoc,
    doc,
    setDoc,
    updateDoc,
    deleteField,
    getDoc,
    getDocs,
    query,
    onSnapshot
} from "firebase/firestore";
import Toast from "react-native-toast-message";


const ShowPostScreen = ({ route, navigation }) => {
    const defaultThumbnail = "https://firebasestorage.googleapis.com/v0/b/larguezlesamarres-a1817.appspot.com/o/thumnails%2Fdefault.png?alt=media&token=8fae89e3-c7d0-47e1-b555-188c55080ef2"
    const {id} = route.params;
    const [offer, setOffer] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const ownerTenantState = useSelector((state) => state.settings.ownerTenantState)
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [favoriteState, setFavoriteState] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [alreadyBookedState, setAlreadyBooked] = useState(false);


    const askForBooking = async () => {

        if (auth.currentUser.uid !== offer.authorId) {

            let bookingId = uid(25)

            axios.post("http://192.168.1.24:3000/api/booking/ask", {
                id: bookingId,
                offerId: offer.key,
                offerTitle: offer.title,
                boatName: offer.boatName,
                tenantName: auth.currentUser.displayName,
                startDate: startDate,
                endDate: endDate,
                state: "0",
                tenantId: auth.currentUser.uid,
                ownerId: offer.authorId,
            }).then(r => {
                setLoading(false)
            })

            const messageRef = collection(db, "messages/")
            await setDoc(doc(messageRef, auth.currentUser.uid), {
                [auth.currentUser.uid]:{
                    post:{
                        id:offer.key,
                        title:offer.title,
                        price:offer.price,
                        pricePer:offer.pricePer,
                        boatName:offer.boatName
                    },
                    state:"0",
                    startDate:startDate,
                    endDate:endDate,
                    bookingId:bookingId,
                    tenantId:auth.currentUser.uid,
                    tenantName: auth.currentUser.displayName,
                    id:uid(3)
                }
            }, {
                merge: true
            }).then(() => {
            });

            setModalVisible(false)
        }
    }


    useEffect(() => {

        checkBooking(id)

        const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
            setOffer(doc.data())

            if(doc.data().favorites !== undefined){

                setFavorites(doc.data().favorites)

                if(doc.data().favorites.includes(auth.currentUser.uid)){
                    setFavoriteState(true)
                } else {
                    setFavoriteState(false)
                }
            } else {
                setFavoriteState(false)
            }
        });

        return () => {
            unsubscribe()
        }
    }, [])


    switch (offer.pricePer) {
        case 'week':
            offer.pricePer = "semaine"
            break;
        case 'month':
            offer.pricePer = "mois"
            break;
        case 'day':
            offer.pricePer = "jour"
            break;
    }


    const plurialLabel = (value, label) => {
        if(parseInt(value) < 1) {
            return window[label] = label
        } else {
            return window[label] = label + "s"
        }
    }

    const withOrWithout = (bool) => {
        if(bool) {
            return "Avec"
        } else {
            return "Sans"
        }
    }

    const preventSelectOldDate = (date) => {

        let todayDate = new Date();
        let dateToCheck = new Date(date);

        if(dateToCheck < todayDate){
            Toast.show({
                type:  'error',
                text1: 'PAS BON',
                text2: 'This is some something 👋'
            });
            return false
        } else if(dateToCheck >= todayDate) {
            return true
        }
    }

    const selectDate = (type, date) => {
        if(type === "start"){
            if(preventSelectOldDate(date)){
                setStartDate(date)
                hideStartDatePicker()
            }
        } else if(type === "end"){
            if(preventSelectOldDate(date)){
                if(new Date(date) <= new Date(startDate)){
                    console.log("Pas bon")
                } else {
                    setEndDate(date)
                    hideEndDatePicker()
                }
            }
        }
    }

    const checkBooking = async (offerId) => {
        const q = query(collection(db, "posts", offerId, "bookings"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            if(doc.data().state === 1){ setAlreadyBooked(true) } else { setAlreadyBooked(false) }

        });

    }


    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const formatDate = (dateToFormat) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };

        let date = new Date(dateToFormat)
        return date.toLocaleDateString("fr-FR", options)
    }

    const addToFavorite = async () => {

        const favoritesRef = collection(db, "favorites/")
        await setDoc(doc(favoritesRef, auth.currentUser.uid), {
            [offer.key]: {
                key:uid(25),
                offerId: offer.key,
                thumbnail: offer.thumbnail,
                title: offer.title,
                price: offer.price,
                pricePer: offer.pricePer,
            }
        }, {
            merge: true
        }).then(() => {
        });


        await updateDoc(doc(db, "posts", offer.key), {favorites: [auth.currentUser.uid]});
    }
    const removeFromFavorite = async () => {
        const favoritesRef = doc(db, 'favorites', auth.currentUser.uid);

        await updateDoc(favoritesRef, {
            [offer.key]: deleteField()
        });


        let favoriteToUpdate = favorites.map(function(x){return x.replace(auth.currentUser.uid, '');});
        const postRef = doc(db, "posts", offer.key);
        await updateDoc(postRef, {favorites: favoriteToUpdate});
    }


    const renderBookButton = () => {

        if(auth.currentUser.uid !== offer.authorId){
            if(ownerTenantState === true) {
                if(alreadyBookedState){
                    return (
                        <TouchableOpacity style={styles.single.contact} onPress={() => { setModalVisible(true) }}>
                            {loading &&
                                <ActivityIndicator size="large" color="#FFF" />
                            }
                            <Text style={styles.single.contactLabel}>Demander la disponibilité</Text>
                        </TouchableOpacity>
                    )
                } else {
                    return (
                        <View style={styles.disabled}>
                            <Text style={styles.disabled.disabledLabel}>Vous avez déjà réservé cette offre.</Text>
                        </View>
                    )
                }
            } else {
                return (
                    <View style={styles.disabled}>
                        <Text style={styles.disabled.disabledLabel}>Vous ne pouvez pas réserver en tant que propriétaire</Text>
                    </View>
                )
            }
        } else {
            return (
                <View style={styles.disabled}>
                    <Text style={styles.disabled.disabledLabel}>Vous ne pouvez pas réserver votre offre</Text>
                </View>
            )
        }



    }


    return (

        <ScrollView>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }} >
                <View style={modal.modalBooking}>
                    <Text style={modal.modalBooking.title}>C'est presque fini !</Text>
                    <Text style={modal.modalBooking.subtitle}>Vérifions la disponibilité, sélectionnez les dates de début et de fin de réservation. </Text>
                    <TouchableOpacity style={[modal.button, modal.enabled]} onPress={() => setStartDatePickerVisibility(true)}>
                        {startDate === null &&
                            <Text style={modal.button_label}>Début de votre réservation</Text>
                        }
                        {startDate !== null &&
                            <Text style={modal.button_label}> {formatDate(startDate)}</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={[modal.button, modal.enabled]} onPress={() => setEndDatePickerVisibility(true)}>
                        {endDate === null &&
                            <Text style={modal.button_label}>Fin de votre réservation</Text>
                        }
                        {endDate !== null &&
                            <Text style={modal.button_label}>{formatDate(endDate)}</Text>
                        }
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isStartDatePickerVisible}
                        mode="date"
                        onConfirm={(date) => selectDate("start", date)}
                        onCancel={hideStartDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isEndDatePickerVisible}
                        mode="date"
                        onConfirm={(date) => selectDate("end", date)}
                        onCancel={hideEndDatePicker}
                    />
                    <Text style={modal.modalBooking.subtitle}>C'est tout bon ? Parfait ! </Text>
                    <Text style={modal.modalBooking.subtitle}>Validez votre réservation, nous nous occupons du reste :)</Text>

                    {startDate !== null && endDate !== null &&
                        <TouchableOpacity style={[modal.button, modal.enabled]} onPress={() => askForBooking()}>
                            <Text style={modal.button_label}>C'est bon !</Text>
                        </TouchableOpacity>
                    }
                    {startDate === null && endDate === null &&
                        <View style={[modal.button, modal.disabled]}>
                            <Text style={modal.button_label_disabled}>Choisissez vos dates</Text>
                        </View>
                    }
                    {startDate === null && endDate !== null &&
                        <View style={[modal.button, modal.disabled]}>
                            <Text style={modal.button_label_disabled}>Choisissez la dates de début</Text>
                        </View>
                    }
                    {startDate !== null && endDate === null &&
                        <View style={[modal.button, modal.disabled]}>
                            <Text style={modal.button_label_disabled}>Choisissez la dates de fin</Text>
                        </View>
                    }
                </View>
            </Modal>

            <View style={styles.single}>
                <View style={styles.header}></View>
                <ImageBackground style={styles.thumbnail} source={{ uri: offer.thumbnail }} resizeMode="cover">
                    <View style={styles.thumbnail.thumbnailOverlay}>
                        <TouchableOpacity style={styles.thumbnail.button} onPress={() => {navigation.navigate("Feed")}}>
                            <Text style={styles.thumbnail.buttonLabel}><Ionicons name="chevron-back" size={35} color="white" /></Text>
                        </TouchableOpacity>

                        {offer.authorId === auth.currentUser.uid &&
                            <>
                                {favoriteState === true &&
                                    <TouchableOpacity style={[styles.thumbnail.favoriteButton, styles.thumbnail.unlike]} onPress={() => { removeFromFavorite() }}>
                                        <Text style={styles.thumbnail.buttonLabel}><AntDesign name="heart" size={25} color="#5ad194" /></Text>
                                    </TouchableOpacity>
                                }
                                {favoriteState === false &&
                                    <TouchableOpacity style={[styles.thumbnail.favoriteButton, styles.thumbnail.like]} onPress={() => { addToFavorite() }}>
                                        <Text style={styles.thumbnail.buttonLabel}><AntDesign name="heart" size={25} color="white" /></Text>
                                    </TouchableOpacity>
                                }
                            </>
                        }

                    </View>
                </ImageBackground>
                <Text style={styles.single.boatName}>{offer.boatName}</Text>
                <Text style={styles.single.title}>{offer.title}</Text>
                <Text style={styles.single.localization}>{offer.localization}</Text>
                <Text style={styles.single.price}>{offer.price}€ par {offer.pricePer}</Text>
                <Text style={styles.single.descriptionLabel}>Description</Text>
                <Text style={styles.single.description}>{offer.detail}</Text>
                <View style={styles.single.config}>
                    <Text style={styles.single.capacity}>Idéal pour {offer.capacity} {plurialLabel(offer.capacity, "personne")}</Text>
                    <View style={styles.single.row}>
                        <View style={styles.single.column}>
                            <Text style={styles.single.sleeping}>{offer.sleeping} {plurialLabel(offer.sleeping, "couchage")}</Text>
                            <Text style={styles.single.cabins}>{offer.cabins} {plurialLabel(offer.cabins, "cabine")}</Text>
                        </View>
                        <View style={styles.single.column}>
                            <Text style={styles.single.captain}>{withOrWithout(offer.captain)} capitaine</Text>
                            <Text style={styles.single.teams}>{withOrWithout(offer.teams)} équipage</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.single.equipmentsLabel}>Équipements</Text>
                <Text style={styles.single.equipments}>
                    {offer.equipments}
                </Text>

                {renderBookButton()}

            </View>
        </ScrollView>
    );
}


const modal = StyleSheet.create({
    button:{
        width:330,
        height:70,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginTop:30
    },
    enabled:{
        backgroundColor:"#5ad194",
    },
    disabled:{
        backgroundColor:"#b3b3b3",
    },
    button_label:{
        color:"#FFF",
        fontSize:25
    },
    button_label_disabled:{
        color:"#e6e6e6",
        fontSize:25
    },
    modalBooking:{
        width:"100%",
        height:750,
        backgroundColor:"#48B781",
        paddingVertical:50,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
        display:"flex",
        alignItems:"center",
        title:{
            fontSize:40,
            fontWeight:"bold",
            textAlign:"center",
            marginTop:30,
            color:"#FFF",
        },
        subtitle:{
            fontSize:25,
            fontWeight:"bold",
            textAlign:"center",
            marginTop:30,
            color:"#FFF",
        }
    },
})


const styles = StyleSheet.create({
    header:{
        width:"100%",
        height:80,
        backgroundColor:"#48B781",
    },
    thumbnail:{
        width:"100%",
        height:250,
        thumbnailOverlay:{
            backgroundColor:"rgba(0,0,0,0.3)",
            width:"100%",
            height:"100%",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between"
        },
        button:{
            width:60,
            height:60,
            backgroundColor:"#46d08d",
            borderRadius:50,
            margin:15,
            display: "flex",
            justifyContent:"center",
            alignItems:"center"
        },
        buttonLabel:{
            color:"#FFF"
        },
        favoriteButton:{
            width:60,
            height:60,
            borderRadius:50,
            margin:15,
            display: "flex",
            justifyContent:"center",
            alignItems:"center",
        },
        like:{
            backgroundColor:"#46d08d",
        },
        unlike:{
            backgroundColor:"#ffffff",
        }

    },
    disabled:{
        width:320,
        height:80,
        backgroundColor:"#dedede",
        marginTop:30,
        marginBottom:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        disabledLabel:{
            color:"#949494",
            fontSize:20
        }
    },
    single:{
        display:"flex",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        boatName:{
            textTransform:"uppercase",
            fontSize:17,
            marginTop:20,
            marginLeft:50,
            width:"100%",
        },
        title: {
            fontSize:27,
            marginLeft:50,
            fontWeight:"bold",
            marginTop:10,
            width:"100%",
        },
        price: {
            fontSize:20,
            marginLeft:50,
            fontWeight:"bold",
            marginTop:10,
            width:"100%",
        },
        localization:{
            fontSize:18,
            marginLeft:50,
            fontWeight:"bold",
            marginTop:0,
            width:"100%",
        },
        descriptionLabel:{
            fontSize:27,
            marginLeft:50,
            fontWeight:"bold",
            marginTop:25,
            width:"100%",
        },
        description:{
            fontSize:17,
            paddingLeft:30,
            paddingRight:20,
            marginTop:10,
            width:"100%",
        },
        config:{
            width:"100%",
            backgroundColor:"#46d08d",
            height:180,
            paddingVertical:10,
            marginVertical:20,
        },
        capacity:{
            fontSize:27,
            marginLeft:30,
            fontWeight:"bold",
            marginTop:10,
            color:"#FFF"
        },
        row:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            marginTop:20
        },
        column:{
            marginLeft:30,
        },
        sleeping:{
            fontSize:20,
            marginTop:10,
            color:"#FFF",
        },
        cabins:{
            fontSize:20,
            marginTop:10,
            color:"#FFF"
        },
        captain:{
            fontSize:20,
            marginRight:30,
            fontWeight:"bold",
            marginTop:10,
            color:"#FFF"
        },
        teams:{
            fontSize:20,
            marginRight:30,
            fontWeight:"bold",
            marginTop:10,
            color:"#FFF"
        },
        equipmentsLabel:{
            fontSize:27,
            marginLeft:50,
            fontWeight:"bold",
            marginTop:10,
            width:"100%",
        },
        equipments:{
            display:"flex",
            flexDirection:"column",
            height:"auto",
            paddingVertical: 30,
            marginHorizontal:20,
        },
        contact:{
            width:320,
            height:80,
            backgroundColor:"#3bb57b",
            marginTop:30,
            marginBottom:50,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:20,
            flexDirection:"row"
        },
        contactLabel:{
            color:"#FFF",
            fontSize:20,
            marginLeft:10
        }
    }
})
export default ShowPostScreen;
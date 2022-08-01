import {
    Text,
    View,
    Button,
    TouchableHighlight,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity, ScrollView
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from "react-native-picker-select";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import {auth, db} from "../firebase";
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import useFetch from "react-fetch-hook";
import Toast from 'react-native-toast-message';
import {toggleFavoriteAdded} from "../store/statesLoadSlice";


const ShowPostScreen = ({ route, navigation }) => {
    const defaultThumbnail = "https://firebasestorage.googleapis.com/v0/b/larguezlesamarres-a1817.appspot.com/o/thumnails%2Fdefault.png?alt=media&token=8fae89e3-c7d0-47e1-b555-188c55080ef2"
    const {id} = route.params;
    const [offer, setOffer] = useState("");
    const ownerTenantState = useSelector((state) => state.settings.ownerTenantState)
    const dispatch = useDispatch()

    const askForBooking = () => {
        if(auth.currentUser.uid !== offer.authorId){
            axios.post("http://192.168.1.24:3000/api/booking/ask", {
                offerId:offer.key,
                tenantId:auth.currentUser.uid,
                ownerId:offer.authorId,
                state:0
            }).then(r => {
            })
        }
    }


    const messageToast = (type, title, message) => {
        Toast.show({
            type: type,
            text1: title,
            text2: message,
            onHide:() => {
                getOffer()
            }
        });

    }

    const getOffer = () => {
        axios.get("http://192.168.1.24:3000/api/posts/" + id).then(response => {
            setOffer(response.data)
        })
    }


    navigation.addListener('focus', async () => {
        getOffer()
    });


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
        case 'hour':
            offer.pricePer = "heure"
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

    const likePost = () => {
        axios.post('http://192.168.1.24:3000/api/favorite/like', {
            userId:auth.currentUser.uid,
            offerId:offer.key
        })
        dispatch(toggleFavoriteAdded())
        messageToast("success", "Génial", "Cette offre a bien été ajoutée à vos favoris")
    }

    return (
        <ScrollView>
            <View style={styles.single}>
                <View style={styles.header}></View>
                <ImageBackground style={styles.thumbnail} source={{ uri: offer.thumbnail }} resizeMode="cover">
                    <View style={styles.thumbnail.thumbnailOverlay}>
                        <TouchableOpacity style={[styles.thumbnail.button, styles.thumbnail.back]} onPress={() => {navigation.navigate("Feed")}}>
                            <Text style={styles.thumbnail.buttonLabel}><Ionicons name="chevron-back" size={35} color="white" /></Text>
                        </TouchableOpacity>
                        {offer.liked === true &&
                            <View style={[styles.thumbnail.button, styles.thumbnail.liked]}>
                                <Text style={styles.thumbnail.buttonLabel}>
                                    <Entypo name="bookmark" size={45} color="#FFF" />
                                </Text>
                            </View>
                        }

                        {offer.liked === false &&
                            <TouchableOpacity style={[styles.thumbnail.button, styles.thumbnail.like]} onPress={() => likePost()}>
                                <Text style={styles.thumbnail.buttonLabel}>
                                    <Entypo name="bookmark" size={45} color="#FFF" />
                                </Text>
                            </TouchableOpacity>
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

                {ownerTenantState === true && auth.currentUser.uid !== offer.authorId &&
                    <TouchableOpacity style={styles.single.contact} onPress={() => {
                        askForBooking()
                    }}>
                        <Text style={styles.single.contactLabel}>Demander la disponibilité</Text>
                    </TouchableOpacity>
                }
                {ownerTenantState === false &&
                    <View style={styles.disabled}>
                        <Text style={styles.disabled.disabledLabel}>Demander la disponibilité</Text>
                    </View>
                }
                {ownerTenantState === true && auth.currentUser.uid === offer.authorId &&
                    <View style={styles.disabled}>
                        <Text style={styles.disabled.disabledLabel}>Demander la disponibilité</Text>
                    </View>
                }

            </View>
        </ScrollView>
    );
}


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
            borderRadius:50,
            margin:15,
            display: "flex",
            justifyContent:"center",
            alignItems:"center"
        },
        back:{
            backgroundColor:"#46d08d",
        },
        like:{
            backgroundColor:"#46d08d",
        },

        buttonLabel:{
            color:"#FFF"
        },

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
            borderRadius:20
        },
        contactLabel:{
            color:"#FFF",
            fontSize:20,
        }
    }
})
export default ShowPostScreen;
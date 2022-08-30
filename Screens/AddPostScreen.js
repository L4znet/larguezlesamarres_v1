import {
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Modal
} from "react-native";
import {useRef, useState} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from 'react-native-picker-select';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {auth, storage} from "../firebase";

import AutoCompleteInput from "react-native-tomtom-autocomplete";
import MapView from "react-native-maps";
import * as ImagePicker from "expo-image-picker";


const AddPostScreen = ({ navigation }) => {
    const defaultThumbnail = "https://firebasestorage.googleapis.com/v0/b/larguezlesamarres-a1817.appspot.com/o/thumnails%2Fdefault.png?alt=media&token=8fae89e3-c7d0-47e1-b555-188c55080ef2"
    const [title, setTitle] = useState("");
    const [boatName, setBoatName] = useState("");
    const [localization, setLocalization] = useState("En attente du lieu de location...");
    const [capacity, setCapacity] = useState("");
    const [sleeping, setSleeping] = useState("");
    const [cabins, setCabins] = useState("");
    const [captain, setCaptain] = useState(false);
    const [teams, setTeams] = useState(false);
    const mapRef = useRef();
    const [detail, setDetail] = useState("");
    const [equipments, setEquipments] = useState("");
    const [thumbnail, setThumbnail] = useState(defaultThumbnail);
    const [pricePer, setPricePer] = useState("");
    const [price, setPrice] = useState("");
    const [modalState, setModalState] = useState(false);
    const [region, setRegion] = useState(null);
    const [wishs, setWishs] = useState([]);
    const [type, setType] = useState(null);
    const [response, setResponse] = useState(null);


    const uploadThumnail = async () => {

       let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if(result.cancelled !== undefined){
            const response = await fetch(result.uri);
            const blob = await response.blob();
            const fileRef = ref(storage, "thumnails/" + title.toLowerCase());

            await uploadBytes(fileRef, blob).then(async () => {
                const downloadURl = await getDownloadURL(fileRef)
                setThumbnail(downloadURl)
            });
        }

    }

    const savePost = async () => {

        try {
            axios.post("http://192.168.1.24:3000/api/posts", {
                title: title,
                boatName: boatName,
                localization: localization,
                capacity: capacity,
                sleeping: sleeping,
                cabins: cabins,
                captain: captain,
                teams: teams,
                detail: detail,
                equipments: equipments,
                thumbnail:thumbnail,
                price:price,
                pricePer:pricePer,
                type:type,
                wishs:wishs,
                authorId:auth.currentUser.uid
            }).then(() => {
            })

            navigation.replace('Tabs', { screen: 'Feed' });
        } catch (error) {
            console.log("An error has occurred : " + error)
        }

    }

    const getRegion = (item) => {

        if(item.address.streetName !== undefined){
            setLocalization(item.address.freeformAddress)
        } else if(item.address.municipality !== undefined) {
            setLocalization(item.address.municipality)
        } else if(item.address.country !== undefined){
            setLocalization(item.address.country)
        } else {
            console.log("Error")
        }

        const ASPECT_RATIO = 500 / 700;

        const lat = parseFloat(item.position.lat);
        const lng = parseFloat(item.position.lon);

        let southEast;
        let northWest;

        if(item.boundingBox !== undefined){
            southEast = parseFloat(item.boundingBox.btmRightPoint.lat);
            northWest = parseFloat(item.boundingBox.topLeftPoint.lat);
        } else {
            southEast = parseFloat(item.viewport.btmRightPoint.lat);
            northWest = parseFloat(item.viewport.topLeftPoint.lat);
        }

        const latDelta = northWest - southEast;
        const lngDelta = latDelta * ASPECT_RATIO;

        setRegion({latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: lngDelta})

    }


    const addWish = (element) => {

        if(wishs.includes(element) === false){
            wishs.push(element)
            setWishs(wishs)
        } else {
            wishs.splice(wishs.indexOf(element), 1);
            setWishs(wishs)
        }
    }


    return (
        <View>
            <KeyboardAwareScrollView>
                <TouchableHighlight onPress={() => { uploadThumnail() }}>
                    <ImageBackground style={styles.thumbnail} source={{ uri: thumbnail }} resizeMode="cover">
                        <View style={styles.thumbnail.thumbnailOverlay}>
                            <Text style={styles.thumbnail.text}>Personnaliser l'image de fond</Text>
                        </View>
                    </ImageBackground>
                </TouchableHighlight>

                <TextInput style={[styles.form.fullInput, styles.form.input]} onChangeText={(title) => setTitle(title)} placeholderTextColor="#9e9e9e" placeholder="Titre de l'annonce" />
                <TextInput style={[styles.form.fullInput, styles.form.input]} onChangeText={(boatName) => setBoatName(boatName)} placeholderTextColor="#9e9e9e" placeholder="Nom du bateau" />
                <View style={styles.form.localization} placeholderTextColor="#9e9e9e"><Text style={styles.form.textLocalization}>{localization}</Text></View>
                <TouchableOpacity onPress={() => setModalState(true)} style={styles.button}>
                    <Text style={styles.button.buttonText}>Sélectionnez le lieu de location</Text>
                </TouchableOpacity>


                <View style={styles.boatConfiguration.row}>
                    <TextInput keyboardType="number-pad" style={[styles.form.halfInput, styles.form.input]} onChangeText={(price) => setPrice(price)} placeholderTextColor="#9e9e9e" placeholder="Prix du véhicule" />
                    <View style={halfSelector.halfSelectorContainer}>
                        <RNPickerSelect style={halfSelector}
                            onValueChange={(pricePer) => setPricePer(pricePer)}
                            placeholder={{label: 'Par', value: ""}}
                            items={[
                                {label: 'Mois', value: 'month'},
                                {label: 'Semaine', value: 'week'},
                                {label: 'Jour', value: 'day'},
                                {label: 'Heure', value: 'hour'},
                            ]}
                        />
                    </View>
                </View>
                <RNPickerSelect style={fullSelector}
                    onValueChange={(type) => setType(type)}
                    placeholder={{label: 'Types de véhicule', value: ""}}
                    items={[
                        {label: 'Catamarans', value: 'catamarans'},
                        {label: 'Yacht', value: 'yacht'},
                        {label: 'Semi-rigide', value: 'semirigide'},
                        {label: 'Bateau de plaisance', value: 'plaisance'},
                        {label: 'Voilier', value: 'voilier'},
                        {label: 'Jet-ski', value: 'jetski'},
                    ]}
                />
                <View style={styles.boatConfiguration}>
                    <Text style={styles.boxlabel}>Une "envie" à ajouter à votre offre ? (Facultatif)</Text>
                    <Text style={styles.boxsublabel}>Les envies sont des types d'utilisations spécifique, que vous pouvez proposer en plus
                    de la location de votre véhicule.</Text>
                    <View style={styles.boatConfiguration.row}>
                        <BouncyCheckbox
                            size={50}
                            fillColor="#48B781"
                            unfillColor="#FFFFFF"
                            text="Proposer des balades en mer"
                            iconStyle={{ borderColor: "#48B781" }}
                            textStyle={{  textDecorationLine: "none", fontSize:20, color:"#000" }}
                            onPress={() => { addWish("Proposer des balades en mer")}}
                            style={styles.boatConfiguration.checkbox}
                        />
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <BouncyCheckbox
                            size={50}
                            fillColor="#48B781"
                            unfillColor="#FFFFFF"
                            text="Faire découvrir mon lieu de vie"
                            iconStyle={{ borderColor: "#48B781" }}
                            textStyle={{  textDecorationLine: "none", fontSize:20, color:"#000" }}
                            onPress={() => { addWish("Faire découvrir mon lieu de vie")}}
                            style={styles.boatConfiguration.checkbox}
                        />
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <BouncyCheckbox
                            size={50}
                            fillColor="#48B781"
                            unfillColor="#FFFFFF"
                            text="Proposer des vacances, avec équipages"
                            iconStyle={{ borderColor: "#48B781" }}
                            textStyle={{  textDecorationLine: "none", fontSize:20, color:"#000" }}
                            onPress={() => { addWish("Proposer des vacances, avec équipages")}}
                            style={styles.boatConfiguration.checkbox}
                        />
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <BouncyCheckbox
                            size={50}
                            fillColor="#48B781"
                            unfillColor="#FFFFFF"
                            text="Partager mon savoir"
                            iconStyle={{ borderColor: "#48B781" }}
                            textStyle={{  textDecorationLine: "none", fontSize:20, color:"#000" }}
                            onPress={() => { addWish("Partager mon savoir")}}
                            style={styles.boatConfiguration.checkbox}
                        />
                    </View>
                </View>

                <View style={styles.boatConfiguration}>
                    <Text style={styles.boxlabel}>Configuration de votre véhicule</Text>

                    <View style={styles.boatConfiguration.row}>
                        <TextInput keyboardType="number-pad" style={[styles.form.halfInput, styles.form.input]} onChangeText={(capacity) => setCapacity(capacity)} placeholderTextColor="#9e9e9e" placeholder="Capacités à bord" />
                        <Text style={styles.boatConfiguration.label}>personnes</Text>
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <TextInput keyboardType="number-pad" style={[styles.form.halfInput, styles.form.input]} onChangeText={(sleeping) => setSleeping(sleeping)} placeholderTextColor="#9e9e9e" placeholder="Couchages" />
                        <Text style={styles.boatConfiguration.label}>couchages</Text>
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <TextInput keyboardType="number-pad" style={[styles.form.halfInput, styles.form.input]} onChangeText={(cabins) => setCabins(cabins)} placeholderTextColor="#9e9e9e" placeholder="Cabines" />
                        <Text style={styles.boatConfiguration.label}>cabines</Text>
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <BouncyCheckbox
                            size={50}
                            fillColor="#48B781"
                            unfillColor="#FFFFFF"
                            text="Capitaine disponible"
                            iconStyle={{ borderColor: "#48B781" }}
                            textStyle={{  textDecorationLine: "none", fontSize:20, color:"#000" }}
                            onPress={(isCaptainAvailable) => { setCaptain(isCaptainAvailable)}}
                            style={styles.boatConfiguration.checkbox}
                        />
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <BouncyCheckbox
                            size={50}
                            fillColor="#48B781"
                            unfillColor="#FFFFFF"
                            text="Équipage disponible"
                            iconStyle={{ borderColor: "#48B781" }}
                            textStyle={{  textDecorationLine: "none", fontSize:20, color:"#000" }}
                            onPress={(isTeamsAvailable) => { setTeams(isTeamsAvailable)}}
                            style={styles.boatConfiguration.checkbox}
                        />
                    </View>

                </View>

                <Modal
                    animationType="slide"
                    visible={modalState}
                    transparent={true}
                    onRequestClose={() => { setModalState(!modalState); }}
                >
                    <View style={styles.modalBooking}>
                        <AutoCompleteInput
                            inputProps={{
                                placeholder: "Un pays, une ville, une adresse...",
                                placeholderTextColor: '#aeaeae',
                                fontSize:25,
                                display:"flex",
                                paddingLeft:10,
                                justifyContent:"center",
                                alignItems:"center",
                                height:80
                            }}
                            onPress={(item) => {
                                getRegion(item)
                            }}
                            inputContainerStyle={{
                                width:"100%",
                                height:80,
                                color:"#000",
                                fontSize:30,
                            }}
                            listItemsContainerStyle={{
                                padding: 0,
                                marginHorizontal: 10,
                                height:"100%"
                            }}
                            tomtomOptions={{ key: "PIFKrwjNy0lZNmUGGaD6J8dWXWTxzrSi" }}
                        />
                        <MapView
                            pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false}
                            ref={mapRef}
                            style={{width: 700, height: 700}}
                            initialRegion={region}
                            region={region}
                            onRegionChange={(coordinate) => setRegion(coordinate)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setModalState(false)} style={styles.button}>
                        <Text style={styles.button.buttonText}>Fermer la carte</Text>
                    </TouchableOpacity>
                </Modal>


                <Text style={styles.boxlabel}>Description</Text>
                <TextInput
                    style={[styles.form.textarea, styles.form.input]}
                    multiline={true}
                    onChangeText={(detail) => setDetail(detail)}
                    placeholderTextColor="#9e9e9e"
                    placeholder="Texte de votre annonce"
                />

                <View style={styles.accessories}>
                    <Text style={styles.boxlabel}>Équipements (facultatif)</Text>
                    <TextInput
                        style={[styles.form.textarea, styles.form.input]}
                        multiline={true}
                        onChangeText={(equipment) => setEquipments(equipments)}
                        placeholderTextColor="#9e9e9e"
                        placeholder="Équipement(s) inclu avec votre véhicule"
                    />
                </View>

                <TouchableOpacity onPress={() => savePost()} style={styles.save}>
                    <Text style={styles.save.saveText}>Poster</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    button:{
        width:"90%",
        height:60,
        backgroundColor:"#48B781",
        marginLeft:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        buttonText:{
            color:"#FFF",
            fontSize:20
        }
    },
    modalBooking:{
        width:"100%",
        height:700,
        backgroundColor:"#efefef",
        paddingVertical:100,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
        display:"flex",
        alignItems:"center"
    },

    thumbnail:{
        width:"100%",
        height:150,
        thumbnailOverlay:{
            backgroundColor:"rgba(0,0,0,0.5)",
            width:"100%",
            height:"100%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        },
        text:{
            color:"#FFF",
            fontSize:25,
            opacity:1
        }
    },
    form:{
        title:{
            fontSize:35,
            fontWeight:"bold",
            marginTop:20,
            textAlign:"center",
        },
        registerText:{
            fontSize:30,
            fontWeight:"bold",
            marginTop:20,
            marginLeft:20,
        },
        input:{
            backgroundColor:"#FFF",
            marginLeft:20,
            marginTop:30,
            paddingLeft:20,
            borderRadius:15,
            fontSize:16
        },
        localization:{
            backgroundColor:"#ffffff",
            marginLeft:20,
            marginTop:30,
            paddingLeft:20,
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
            fontSize:16,
            height:70,
            display:"flex",
            justifyContent:"center",
            width:"90%"
        },
        textLocalization:{
            color:"#000",
            fontSize:18,
        },
        fullInput:{
            width:"90%",
            height:70,
        },
        halfInput:{
            width:"45%",
            height:70,
        },
        textarea:{
            width:"90%",
            height:300,
            paddingTop:20
        },
    },
    boxlabel:{
        fontSize:23,
        fontWeight:"bold",
        marginTop:10,
        marginLeft:20,
    },
    boxsublabel:{
        fontSize:18,
        marginTop:10,
        marginLeft:20,
    },
    boatConfiguration:{
        width:"100%",
        marginTop:20,
        marginBottom:50,
        row:{
            display:"flex",
            flexDirection:"row",
        },
        label:{
            fontSize:20,
            lineHeight:70,
            marginTop:25,
            paddingHorizontal: 20
        },
        checkbox:{
            marginLeft:20,
            marginTop:20
        }
    },
    accessories:{
        marginVertical:50
    },
    save:{
        width:"90%",
        height:60,
        backgroundColor:"#48B781",
        marginLeft:20,
        marginBottom: 50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        saveText:{
            color:"#FFF",
            fontSize:20
        }
    }
})


const selector = StyleSheet.create({
    inputIOS: {
        width:"90%",
        height:70,
        backgroundColor:"#FFF",
        borderRadius: 10,
        marginTop:30,
        marginLeft:20,
        paddingLeft:10,
        fontSize:20,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor:"#FFF"
    },
});
const halfSelector = StyleSheet.create({
    inputIOS: {
        width:"80%",
        height:70,
        backgroundColor:"#FFF",
        borderRadius: 10,
        marginTop:30,
        marginLeft:20,
        paddingLeft:10,
        fontSize:20,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor:"#FFF"
    },
    halfSelectorContainer:{
        minWidth:"48%"
    }
});
const fullSelector = StyleSheet.create({
    inputIOS: {
        width:"90%",
        height:70,
        backgroundColor:"#FFF",
        borderRadius: 10,
        marginTop:30,
        marginLeft:20,
        paddingLeft:10,
        fontSize:20,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor:"#FFF"
    },
});
const multiline = StyleSheet.create({
    inputIOS: {
        width:"90%",
        height:90,
        backgroundColor:"#FFF",
        borderRadius: 10,
        marginTop:30,
        marginLeft:20,
        paddingLeft:10,
        fontSize:20
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor:"#FFF"
    },
});


export default AddPostScreen;
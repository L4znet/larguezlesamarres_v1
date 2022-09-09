import {Text, View, TouchableHighlight, StyleSheet, ImageBackground, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from 'react-native-picker-select';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase";
import Toast from "react-native-toast-message";

const EditPostScreen = ({ route, navigation }) => {

    const {item} = route.params;

    const defaultThumbnail = "https://firebasestorage.googleapis.com/v0/b/larguezlesamarres-a1817.appspot.com/o/thumnails%2Fdefault.png?alt=media&token=8fae89e3-c7d0-47e1-b555-188c55080ef2"
    const [title, setTitle] = useState(item.title);
    const [boatName, setBoatName] = useState(item.boatName);
    const [localization, setLocalization] = useState(item.localization);
    const [capacity, setCapacity] = useState(item.capacity);
    const [sleeping, setSleeping] = useState(item.sleeping);
    const [cabins, setCabins] = useState(item.cabins);
    const [captain, setCaptain] = useState(item.captain);
    const [teams, setTeams] = useState(item.teams);
    const [detail, setDetail] = useState(item.detail);

    const [equipments, setEquipments] = useState(item.equipments);

    const [thumbnail, setThumbnail] = useState(item.thumbnail);
    const [pricePer, setPricePer] = useState(item.pricePer);
    const [price, setPrice] = useState(item.price);



    const uploadThumnail = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        const response = await fetch(result.uri);
        const blob = await response.blob();
        const fileRef = ref(storage, "thumnails/" + title.toLowerCase());

        await uploadBytes(fileRef, blob).then(async () => {
            const downloadURl = await getDownloadURL(fileRef)
            setThumbnail(downloadURl)
        });
    }

    const updatePost = async () => {


        if (title !== "" && boatName !== "" && localization !== "" && capacity !== "" && sleeping !== "" && cabins !== "" && detail !== "" && thumbnail !== "" && pricePer !== "" && price !== "" && type !== "") {
            try {
                axios.put("https://apilarguezlesamarres.vercel.app/api/posts", {
                    offerId: item.key,
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
                    thumbnail: thumbnail,
                    price: price,
                    pricePer: pricePer,
                }).then(() => {
                })

                Toast.show({
                    type: 'success',
                    text1: 'Génial !',
                    text2: 'Votre offre a bien été modifié'
                });

                navigation.replace('Tabs', {screen: 'Feed'});

            } catch (error) {
                console.log("An error has occurred : " + error)
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Champs vide',
                text2: 'Vous devez remplir tous les champs'
            });
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

                <TextInput style={[styles.form.fullInput, styles.form.input]} value={title} onChangeText={(title) => setTitle(title)} placeholderTextColor="#9e9e9e" placeholder="Titre de l'annonce" />
                <TextInput style={[styles.form.fullInput, styles.form.input]} value={boatName} onChangeText={(boatName) => setBoatName(boatName)} placeholderTextColor="#9e9e9e" placeholder="Nom du bateau" />
                <TextInput style={[styles.form.fullInput, styles.form.input]} value={localization} onChangeText={(localization) => setLocalization(localization)} placeholderTextColor="#9e9e9e" placeholder="Votre localisation" />
                <View style={styles.boatConfiguration.row}>
                    <TextInput keyboardType="number-pad" value={price} style={[styles.form.halfInput, styles.form.input]} onChangeText={(price) => setPrice(price)} placeholderTextColor="#9e9e9e" placeholder="Prix du véhicule" />
                    <RNPickerSelect style={selector}
                                    onValueChange={(pricePer) => setPricePer(pricePer)}
                                    placeholderTextColor="#9e9e9e"
                                    placeholder={{label: 'Par', value: ""}}
                                    items={[
                                        {label: 'Mois', value: 'month'},
                                        {label: 'Semaine', value: 'week'},
                                        {label: 'Jour', value: 'day'},
                                    ]}
                    />
                </View>

                <View style={styles.boatConfiguration}>
                    <Text style={styles.subtitle}>Configuration de votre véhicule</Text>

                    <View style={styles.boatConfiguration.row}>
                        <TextInput keyboardType="number-pad" value={capacity} style={[styles.form.halfInput, styles.form.input]} onChangeText={(capacity) => setCapacity(capacity)} placeholderTextColor="#9e9e9e" placeholder="Capacités à bord" />
                        <Text style={styles.boatConfiguration.label}>personnes</Text>
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <TextInput keyboardType="number-pad" value={sleeping} style={[styles.form.halfInput, styles.form.input]} onChangeText={(sleeping) => setSleeping(sleeping)} placeholderTextColor="#9e9e9e" placeholder="Couchages" />
                        <Text style={styles.boatConfiguration.label}>couchages</Text>
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <TextInput keyboardType="number-pad" value={cabins} style={[styles.form.halfInput, styles.form.input]} onChangeText={(cabins) => setCabins(cabins)} placeholderTextColor="#9e9e9e" placeholder="Cabines" />
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

                <Text style={styles.subtitle}>Description</Text>
                <TextInput
                    value={detail}
                    style={[styles.form.textarea, styles.form.input]}
                    multiline={true}
                    onChangeText={(detail) => setDetail(detail)}
                    placeholderTextColor="#9e9e9e"
                    placeholder="Texte de votre annonce"
                />

                <View style={styles.accessories}>
                    <Text style={styles.subtitle}>Équipements (facultatif)</Text>
                    <TextInput
                        value={equipments}
                        style={[styles.form.textarea, styles.form.input]}
                        multiline={true}
                        onChangeText={(equipment) => setEquipments(equipment)}
                        placeholderTextColor="#9e9e9e"
                        placeholder="Équipement(s) inclu avec votre véhicule"
                    />
                </View>

                <TouchableOpacity onPress={() => updatePost()} style={styles.save}>
                    <Text style={styles.save.saveText}>Modifier</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
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
        button:{
            width:"90%",
            height:60,
            backgroundColor:"#48B781",
            marginLeft:20,
            marginTop:30,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:15,
        },
        buttonText:{
            color:"#FFF",
            fontSize:23,
        },
        buttonPasswordForgot:{
            width:"90%",
            height:60,
            backgroundColor:"#000000",
            marginLeft:20,
            marginTop:30,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:15,
        },
        buttonPasswordForgotText:{
            color:"#FFF",
            fontSize:23,
        },
        buttonRegister:{
            width:"90%",
            height:60,
            backgroundColor:"#000000",
            marginLeft:20,
            marginTop:30,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:15,
        },
        buttonRegisterText:{
            color:"#FFF",
            fontSize:23,
        },
    },
    subtitle:{
        fontSize:23,
        fontWeight:"bold",
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
        minWidth:"35%",
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

export default EditPostScreen;

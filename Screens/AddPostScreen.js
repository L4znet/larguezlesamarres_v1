import {Text, View, TouchableHighlight, StyleSheet, ImageBackground, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from 'react-native-picker-select';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const AddPostScreen = ({ navigation }) => {
    const defaultThumbnail = "https://firebasestorage.googleapis.com/v0/b/larguezlesamarres-a1817.appspot.com/o/thumnails%2Fdefault.png?alt=media&token=8fae89e3-c7d0-47e1-b555-188c55080ef2"
    const [title, setTitle] = useState("");
    return (
        <View>
            <KeyboardAwareScrollView>
                <TouchableHighlight onPress={() => {}}>
                    <ImageBackground style={styles.thumbnail} source={{ uri: defaultThumbnail }} resizeMode="cover">
                        <View style={styles.thumbnail.thumbnailOverlay}>
                            <Text style={styles.thumbnail.text}>Personnaliser l'image de fond</Text>
                        </View>
                    </ImageBackground>
                </TouchableHighlight>

                <TextInput style={[styles.form.fullInput, styles.form.input]} onChangeText={(title) => setTitle(title)} placeholder="Titre de l'annonce" />
                <TextInput style={[styles.form.fullInput, styles.form.input]} onChangeText={(title) => setTitle(title)} placeholder="Nom du bateau" />
                <TextInput style={[styles.form.fullInput, styles.form.input]} onChangeText={(title) => setTitle(title)} placeholder="Votre localisation" />

                <View style={styles.boatConfiguration}>
                    <Text style={styles.subtitle}>Configuration de votre véhicule</Text>

                    <View style={styles.boatConfiguration.row}>
                        <TextInput keyboardType="number-pad" style={[styles.form.halfInput, styles.form.input]} onChangeText={(title) => setTitle(title)} placeholder="Capacités à bord" />
                        <Text style={styles.boatConfiguration.label}>personnes</Text>
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <TextInput keyboardType="number-pad" style={[styles.form.halfInput, styles.form.input]} onChangeText={(title) => setTitle(title)} placeholder="Couchages" />
                        <Text style={styles.boatConfiguration.label}>couchages</Text>
                    </View>
                    <View style={styles.boatConfiguration.row}>
                        <TextInput keyboardType="number-pad" style={[styles.form.halfInput, styles.form.input]} onChangeText={(title) => setTitle(title)} placeholder="Cabines" />
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
                            onPress={(isChecked) => {}}
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
                            onPress={(isChecked) => {}}
                            style={styles.boatConfiguration.checkbox}
                        />
                    </View>
                </View>

                <Text style={styles.subtitle}>Description</Text>
                <TextInput
                    style={[styles.form.textarea, styles.form.input]}
                    multiline={true}
                    placeholder="Texte de votre annonce"
                />

                <View style={styles.accessories}>
                    <Text style={styles.subtitle}>Équipements (facultatif)</Text>
                    <TextInput
                        style={[styles.form.textarea, styles.form.input]}
                        multiline={true}
                        placeholder="Équipement(s) inclu avec votre véhicule"
                    />
                </View>

                <TouchableOpacity onPress={() => {}} style={styles.save}>
                    <Text style={styles.save.saveText}> Poster</Text>
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
        minWidth:"50%",
        height:70,
        backgroundColor:"#FFF",
        borderRadius: 10,
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

export default AddPostScreen;
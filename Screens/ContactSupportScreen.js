import {Text, View, TouchableOpacity, StyleSheet, TextInput, TouchableHighlight, ImageBackground} from "react-native";
import {useState} from "react";
import {auth, doc, setDoc, db} from '../firebase.js'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";

const ContactSupportScreen = ({ navigation }) => {

    const [request, setRequest] = useState("");
    const contactSupport = async () => {

        if (request !== "") {
            axios.post("https://apilarguezlesamarres.vercel.app/api/support", {
                userId: auth.currentUser.uid,
                fromEmail: auth.currentUser.email,
                displayname: auth.currentUser.displayName,
                message: request,
            }).then(() => {
            })

            navigation.navigate("Profile")
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.form.title}>Contacter le support</Text>
                    <TextInput style={styles.form.input} multiline={true} onChangeText={(request) => setRequest(request)} placeholderTextColor="#9e9e9e" placeholder="Décrivez-nous votre problème" />

                    <Text style={styles.smallText}>Vous recevrez une réponse dans les plus bref délais, par e-mail, celle associée à votre compte. </Text>
                    <TouchableOpacity
                        style={styles.form.button}
                        onPress={() => contactSupport() }>
                        <Text style={styles.form.buttonText}>Envoyer mon message</Text>
                    </TouchableOpacity>
                </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    smallText:{
        fontSize:20,
        paddingHorizontal:20,
        width:"100%",
        textAlign:"center",
    },
    form:{
        title:{
            fontSize:35,
            fontWeight:"bold",
            marginTop:50,
            textAlign:"center",
        },
        input:{
            width:"90%",
            height:150,
            backgroundColor:"#FFF",
            marginLeft:20,
            marginVertical:30,
            paddingLeft:20,
            paddingTop:20,
            borderRadius:15,
            fontSize:16,
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
    }
});


export default ContactSupportScreen;
import {Text, View, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import {createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile} from "firebase/auth";
import {useState} from "react";
import {auth, doc, setDoc, db} from '../firebase.js'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");

    const forgotPassword = async () => {

        if (email !== "") {
            sendPasswordResetEmail(auth, email, null)
                .then(() => {})
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });

            navigation.navigate("Login")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.form.title}>Mot de passe oublié</Text>
                <TextInput style={styles.form.input} onChangeText={(email) => setEmail(email)} placeholderTextColor="#9e9e9e" placeholder="E-mail" />

                <Text style={styles.smallText}>Nous vous enverrons un lien pour réinitialiser votre mot de passe </Text>
                    <TouchableOpacity
                        style={styles.form.button}
                        onPress={() => forgotPassword() }>
                        <Text style={styles.form.buttonText}>Envoyer le lien !</Text>
                    </TouchableOpacity>
                <Text style={styles.form.title}>Finalement...</Text>
                <Text style={styles.form.title}>C'est bon je m'en souviens !</Text>
                <TouchableOpacity
                        style={styles.form.button}
                        onPress={() => navigation.navigate("Login") }>
                        <Text style={styles.form.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    smallText:{
        fontSize:25,
        paddingHorizontal:20,
        width:"100%",
        textAlign:"center",
        marginTop:30
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
            width:"90%",
            height:60,
            backgroundColor:"#FFF",
            marginLeft:20,
            marginTop:30,
            paddingLeft:20,
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
    }
});


export default ForgotScreen;
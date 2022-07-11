import {Text, View, Button, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react";
import {auth} from '../firebase.js'


const RegisterScreen = ({ navigation }) => {


    const [email, setEmail] = useState("charly.escalona1@hotmail.fr");
    const [username, setUsername] = useState("Charly");
    const [password, setPassword] = useState("Uzkq24051000");
    const [confirmPassword, setConfirmPassword] = useState("Uzkq24051000");



    const register = () => {
        if(email !== "" && password !== "" && username !== "" && confirmPassword !== ""){
            if(confirmPassword === password){
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        user.updateProfile({
                            displayName: username
                        }).then(function() {

                        }, function(error) {
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.form.title}>Inscrivez-vous</Text>
                <TextInput style={styles.form.input} onChangeText={(username) => setUsername(username)} placeholder="Nom d'utilisateur" />
                <TextInput style={styles.form.input} onChangeText={(email) => setEmail(email)} placeholder="E-mail" />
                <TextInput style={styles.form.input} onChangeText={(password) => setPassword(password)} placeholder="Mot de passe" />
                <TextInput style={styles.form.input} onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} placeholder="Confirmation du mot de passe" />
                <TouchableOpacity
                    style={styles.form.button}
                    onPress={() =>
                        register()
                    }
                >
                    <Text style={styles.form.buttonText}>Inscription</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form:{
        title:{
            fontSize:35,
            fontWeight:"bold",
            marginTop:20,
            marginLeft:20,
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
            fontSize:16
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


export default RegisterScreen;
import {Text, View, Keyboard, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView} from "react-native";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useState} from "react";
import {auth, storage, doc, setDoc, db} from '../firebase.js'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState("charly.escalona1@hotmail.fr");
    const [username, setUsername] = useState("Charly");
    const [password, setPassword] = useState("Uzkq24051000");
    const [confirmPassword, setConfirmPassword] = useState("Uzkq24051000");
    const [roleState, setRoleState] = useState(false);
    const toggleChoice = () => {
        setRoleState(!roleState)
    }

    const register = async () => {

        if (email !== "" && password !== "" && username !== "" && confirmPassword !== "") {
            if (confirmPassword === password) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {

                        const user = userCredential.user;

                        await updateProfile((user), {
                            displayName: username,
                            photoURL:"https://firebasestorage.googleapis.com/v0/b/larguezlesamarres-a1817.appspot.com/o/default.png?alt=media&token=377c368e-ce5d-488b-a9bf-28be8cbcc379"
                        })

                        await setDoc(doc(db, "users", user.uid), {
                            role: roleState,
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });

                navigation.navigate("Login")
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.form.title}>Inscrivez-vous</Text>

                <KeyboardAwareScrollView>
                    <Text style={styles.smallText}>Vous êtes...</Text>
                    <View style={styles.choices}>
                        <TouchableOpacity onPress={() => toggleChoice() }>
                            <Text style={[styles.choices.choiceItem(roleState), styles.choices.choiceItemTrue(roleState)]}>Un locataire</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleChoice() }>
                            <Text style={[styles.choices.choiceItem(roleState), styles.choices.choiceItemFalse(roleState)]}>Un propriétaire</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput style={styles.form.input} onChangeText={(username) => setUsername(username)} placeholder="Nom d'utilisateur" />
                    <TextInput style={styles.form.input} onChangeText={(email) => setEmail(email)} placeholder="E-mail" />
                    <TextInput style={styles.form.input} onChangeText={(password) => setPassword(password)} placeholder="Mot de passe" />
                    <TextInput style={styles.form.input} onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} placeholder="Confirmation du mot de passe" />
                    <TouchableOpacity
                        style={styles.form.button}
                        onPress={() => register() }>
                        <Text style={styles.form.buttonText}>Inscription</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    choices:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:20,
        choiceItem:(state)=> ({
            height:80,
            display:"flex",
            paddingHorizontal: 20,
            textAlign:"center",
            lineHeight:80,
            fontWeight:"bold",
            fontSize:17,
        }),
        choiceItemTrue:(state)=> ({
            backgroundColor: state === true ? "#ffffff" : "#48B781",
            color: state === false ? "#ffffff" : "#000",
        }),
        choiceItemFalse:(state)=> ({
            backgroundColor: state === false ? "#ffffff" : "#48B781",
            color: state === true ? "#ffffff" : "#000",
        }),
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
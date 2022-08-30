import {Text, View, TouchableOpacity, StyleSheet, TextInput, ScrollView} from "react-native";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useState} from "react";
import {auth, doc, setDoc, db} from '../firebase.js'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState("charly.escalona1@hotmail.fr");
    const [username, setUsername] = useState("Charly");
    const [password, setPassword] = useState("Uzkq24051000");
    const [confirmPassword, setConfirmPassword] = useState("Uzkq24051000");
    const [handState, setHandState] = useState(false);
    const toggleChoice = (value) => {
        setHandState(value)
    }

    const register = async () => {

        if (email !== "" && password !== "" && username !== "" && confirmPassword !== "") {
            if (confirmPassword === password) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {

                        const user = userCredential.user;

                        await updateProfile((user), {
                            displayName: username,
                            photoURL:"https://firebasestorage.googleapis.com/v0/b/larguezlesamarres-a1817.appspot.com/o/photoprofil%2Fdefault.png?alt=media&token=9b50844b-3104-4e0e-9a55-7ce2d82b25c3"
                        })

                        await setDoc(doc(db, "users", user.uid), {
                            hand: handState,
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

                <KeyboardAwareScrollView>
                    <ScrollView>
                        <Text style={styles.form.title}>Inscription</Text>
                        <Text style={styles.text}>Pour vous proposer une expérience de navigation optimale</Text>
                        <Text style={styles.smallText}>Nous aimerions savoir, vous êtes gaucher(ère) ou droiter(ère) ?</Text>
                        <View style={styles.choices}>
                            <TouchableOpacity onPress={() => toggleChoice(true) }>
                                <Text style={[styles.choices.choiceItem(handState), styles.choices.choiceItemFalse(handState)]}>Gaucher(ère)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleChoice(false) }>
                                <Text style={[styles.choices.choiceItem(handState), styles.choices.choiceItemTrue(handState)]}>Droitier(ère)</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.form.input} onChangeText={(username) => setUsername(username)} placeholderTextColor="#9e9e9e" placeholder="Nom d'utilisateur" />
                        <TextInput style={styles.form.input} onChangeText={(email) => setEmail(email)} placeholderTextColor="#9e9e9e" placeholder="E-mail" />
                        <TextInput style={styles.form.input} onChangeText={(password) => setPassword(password)} placeholderTextColor="#9e9e9e" placeholder="Mot de passe" />
                        <TextInput style={styles.form.input} onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} placeholderTextColor="#9e9e9e" placeholder="Confirmation du mot de passe" />
                        <TouchableOpacity
                            style={styles.form.button}
                            onPress={() => register() }>
                            <Text style={styles.form.buttonText}>Inscription</Text>
                        </TouchableOpacity>
                    </ScrollView>
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
        marginTop:10,
        choiceItem:(state)=> ({
            height:50,
            display:"flex",
            paddingHorizontal: 20,
            textAlign:"center",
            lineHeight:50,
            fontWeight:"bold",
            fontSize:17,
            width:200,
        }),
        choiceItemTrue:(state)=> ({
            backgroundColor: state === true ? "#FFF" : "#48B781",
            color: state === true ? "#000" : "#ffffff",
        }),
        choiceItemFalse:(state)=> ({
            backgroundColor: state === true ? "#48B781" : "#FFF",
            color: state === true ? "#FFF" : "#000",
        }),
    },
    text:{
        fontSize:23,
        width:"100%",
        textAlign:"center",
        marginVertical:10
    },
    smallText:{
        fontSize:18,
        paddingHorizontal:5,
        width:"100%",
        textAlign:"center",
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


export default RegisterScreen;
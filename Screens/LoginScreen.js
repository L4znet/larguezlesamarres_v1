import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';


const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.form.title}>Connectez-vous</Text>
                <TextInput style={styles.form.input} placeholder="E-mail" />
                <TextInput style={styles.form.input} placeholder="Mot de passe" />
                <TouchableOpacity style={styles.form.button}>
                    <Text style={styles.form.buttonText}>Connexion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.form.buttonPasswordForgot}  onPress={() => { navigation.push('Register'); }}>
                    <Text style={styles.form.buttonPasswordForgotText}>Mot de passe oublié ?</Text>
                </TouchableOpacity>
                <Text style={styles.form.registerText}>Pas de compte ?</Text>
                <TouchableOpacity style={styles.form.buttonRegister} onPress={() => { navigation.push('Register'); }}>
                    <Text style={styles.form.buttonRegisterText}>Inscrivez-vous</Text>
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


export default LoginScreen;
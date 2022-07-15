import {Text, View, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import {signOut} from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import {auth} from '../firebase'
import {useEffect, useState} from "react";
import navigation from "../Navigation";


const logout = () => {
    signOut(auth).then(() => {})
}

const deleteAccount = () => {
    auth.currentUser.delete().then(function() {})

    signOut(auth).then(() => {})
}


const ProfileScreen = ({navigation}) => {
    const [currentUser, setCurrentUser] = useState(JSON.stringify(auth.currentUser));

    navigation.addListener('focus', async () => {
        auth.currentUser.reload().then(() => {
            setCurrentUser(JSON.stringify(auth.currentUser))
        });
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.container}>
                    <Image
                        style={styles.profilPicture}
                        source={{ uri: JSON.parse(currentUser).photoURL }}
                    />
                    <Text style={styles.username}>{JSON.parse(currentUser).displayName}</Text>
                    <View  style={styles.loginCredentials}>
                        <Text style={styles.loginCredentials.title}>Adresse e-mail de connexion</Text>
                        <Text style={styles.loginCredentials.email}>{JSON.parse(currentUser).email}</Text>
                    </View>

                    <TouchableOpacity onPress={() => { navigation.navigate('EditProfil') }} style={styles.editProfil}><Text style={styles.editProfil.editProfilText}>Modifier mon profil</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { logout() }} style={styles.logout}><Text style={styles.logout.logoutText}>Déconnexion</Text></TouchableOpacity>
                </View>
                <View style={styles.dangerZone}>
                    <Text style={styles.deleteAccount.title}>DANGER ZONE</Text>
                    <TouchableOpacity onPress={() => { deleteAccount() }} style={styles.deleteAccount}><Text style={styles.deleteAccount.deleteAccountText}>Supprimer mon compte</Text></TouchableOpacity>
                    <Text style={styles.deleteAccount.warningMessage}>Cette action est irréversible</Text>
                </View>
            </View>
        </ScrollView>


    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%"
    },
    profilPicture:{
        width:150,
        height:150,
        marginTop:50
    },
    username:{
        fontSize:30,
        marginVertical:20,
        fontWeight:"bold"
    },
    loginCredentials:{
        width:"100%",
        height:100,
        backgroundColor:"#dfdfdf",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-end",
        alignItems:"center",
        title:{
            fontSize:20,
            fontWeight: "bold",
            marginBottom:10
        },
        email:{
            fontSize:20,
            marginBottom:20
        },
        passwordText:{
            fontSize:20,
            height:30,
            marginBottom:20
        },
        passwwordFake:{
            marginLeft:2,
        }
    },
    editProfil:{
        width:"80%",
        height:60,
        backgroundColor:"#48B781",
        marginTop:30,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        editProfilText:{
            color:"#FFF",
            fontSize:18
        }
    },
    logout:{
        width:"80%",
        height:60,
        backgroundColor:"#c74a4a",
        marginTop:30,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        logoutText:{
            color:"#FFF",
            fontSize:18
        }
    },
    dangerZone:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:250,
        marginVertical:30,
    },
    deleteAccount:{
        width:"80%",
        height:60,
        backgroundColor:"#c74a4a",
        marginTop:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        deleteAccountText:{
            color:"#FFF",
            fontSize:18
        },
        title:{
            color:"#c74a4a",
            fontSize:30,
            fontWeight:"bold",
            marginVertical:40
        },
        warningMessage:{
            color:"#c74a4a",
            fontSize:20,
            fontWeight:"bold",
            marginTop:10
        }
    },
})

export default ProfileScreen;
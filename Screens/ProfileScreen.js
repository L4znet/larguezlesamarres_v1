import {Text, View, Button, TouchableOpacity, StyleSheet, Image} from "react-native";
import { Entypo } from '@expo/vector-icons'


const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Image
                    style={styles.profilPicture}
                    source={require('../assets/default.png')}
                />
                <Text style={styles.username}>John Doe</Text>
                <View  style={styles.loginCredentials}>
                    <Text style={styles.loginCredentials.title}> Vos informations de connexion</Text>
                    <Text style={styles.loginCredentials.email}>doejohn@helloworld.com</Text>
                </View>

                <TouchableOpacity style={styles.editProfil}><Text style={styles.editProfil.editProfilText}>Modifier mon profil</Text></TouchableOpacity>
                <TouchableOpacity style={styles.logout}><Text style={styles.logout.logoutText}>Déconnexion</Text></TouchableOpacity>
            </View>
            <View style={styles.dangerZone}>
                <Text style={styles.deleteAccount.warningMessage}>Cette action est irréversible</Text>
                <TouchableOpacity style={styles.deleteAccount}><Text style={styles.deleteAccount.deleteAccountText}>Supprimer mon compte</Text></TouchableOpacity>
            </View>
        </View>
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
        height:150
    },
    username:{
        fontSize:30,
        marginBottom:30
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
        marginBottom:30
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
        warningMessage:{
            color:"#c74a4a",
            fontSize:25,
            fontWeight:"bold"
        }
    },
})

export default ProfileScreen;